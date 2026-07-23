import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MEMORY_FILE = path.join(process.cwd(), 'vyana_learned_memory.json');

export async function GET() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf-8');
      const allEntries = JSON.parse(data);
      // Filter to only show pending queries that haven't been taught a custom answer yet
      const pendingQueries = allEntries.filter((item: any) => 
        !item.learnedResponse || item.intentMatched === 'unidentified_query'
      );
      return NextResponse.json({ unhandledQueries: pendingQueries });
    }
    return NextResponse.json({ unhandledQueries: [] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch unhandled queries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query, intentName, responseText, lang = 'hinglish' } = await req.json();

    if (!query || !responseText) {
      return NextResponse.json({ error: 'Query and responseText are required' }, { status: 400 });
    }

    let memory = [];
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf-8');
      memory = JSON.parse(data);
    }

    const cleanQuery = query.toLowerCase().trim();
    // Update or insert learned answer
    const existingIndex = memory.findIndex((m: any) => m.query === cleanQuery);
    if (existingIndex >= 0) {
      memory[existingIndex].learnedResponse = responseText;
      memory[existingIndex].intentMatched = 'custom_learned';
      memory[existingIndex].updatedAt = new Date().toISOString();
    } else {
      memory.push({
        query: cleanQuery,
        learnedAt: new Date().toISOString(),
        intentMatched: 'custom_learned',
        learnedResponse: responseText
      });
    }

    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: `Vyana successfully learned answer for: "${query}"` });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to teach Vyana' }, { status: 500 });
  }
}

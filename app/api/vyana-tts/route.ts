import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Cleanup old generated audio files from public folder
    const publicDir = path.join(process.cwd(), 'public');
    try {
      const files = fs.readdirSync(publicDir);
      files.forEach((file) => {
        if (file.startsWith('vyana_') && file.endsWith('.mp3')) {
          try { fs.unlinkSync(path.join(publicDir, file)); } catch (e) { }
        }
      });
    } catch (e) { }

    const filename = `vyana_${Date.now()}.mp3`;
    const outputPath = path.join(publicDir, filename);
    const scriptPath = path.join(process.cwd(), 'scripts', 'vyana_tts_local.py');

    return new Promise<NextResponse>((resolve) => {
      const pyProcess = exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error("Local Python TTS error:", error);
          return resolve(NextResponse.json({ error: 'Failed to run local TTS' }, { status: 500 }));
        }

        try {
          const result = JSON.parse(stdout);
          if (result.status === 'success') {
            return resolve(NextResponse.json({ audioUrl: `/${filename}` }));
          } else {
            return resolve(NextResponse.json({ error: result.error || 'TTS Generation failed' }, { status: 500 }));
          }
        } catch (e) {
          console.error("Failed to parse Python TTS stdout:", stdout);
          return resolve(NextResponse.json({ error: 'Invalid output from TTS' }, { status: 500 }));
        }
      });

      // Send JSON payload to Python process stdin
      pyProcess.stdin?.write(JSON.stringify({ text, output_path: outputPath }));
      pyProcess.stdin?.end();
    });

  } catch (err) {
    console.error('Local TTS API Error:', err);
    return NextResponse.json({ error: 'Failed to process local speech synthesis' }, { status: 500 });
  }
}

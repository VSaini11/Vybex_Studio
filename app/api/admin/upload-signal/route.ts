import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create signals directory if it doesn't exist
    const relativePath = `/signals`;
    const uploadDir = join(process.cwd(), 'public', 'signals');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'png';
    const fileName = `${generateId()}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);
    const publicPath = `${relativePath}/${fileName}`;

    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: publicPath 
    });
  } catch (error) {
    console.error('Error uploading signal image:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
  }
}

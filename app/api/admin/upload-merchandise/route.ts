import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ success: false, error: 'No category specified' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create category directory if it doesn't exist
    const relativePath = `/merchandise/${category}`;
    const uploadDir = join(process.cwd(), 'public', 'merchandise', category);
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${generateId()}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);
    const publicPath = `${relativePath}/${fileName}`;

    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: publicPath 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}

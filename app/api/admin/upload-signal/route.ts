import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to Base64 Data URL
    // This allows the image to be stored in the database without needing a writable filesystem
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    return NextResponse.json({ 
      success: true, 
      url: dataUrl 
    });
  } catch (error) {
    console.error('Error uploading signal image:', error);
    return NextResponse.json({ success: false, error: 'Failed to process image' }, { status: 500 });
  }
}

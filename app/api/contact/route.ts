import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/gmail';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.GMAIL_SENDER_EMAIL || 'vybex.signal@gmail.com';

    // Professional HTML template for the contact notification
    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d08; color: #d4e8d4; padding: 40px; border-radius: 16px; border: 1px solid #1a2e1a;">
        <h2 style="color: #4ade80; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #1a2e1a; padding-bottom: 10px;">New Contact Message 📩</h2>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 0; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">From</p>
          <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">${name} (${email})</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <div style="margin: 8px 0 0 0; color: #d4e8d4; font-size: 15px; line-height: 1.6; background: #0a110a; padding: 20px; border-radius: 12px; white-space: pre-wrap;">
            ${message}
          </div>
        </div>

        <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px;">
          Sent from Vybex Studio Landing Page
        </p>
      </div>
    `;

    await sendEmail({
      to: recipientEmail,
      subject: `📩 New Contact Form Submission from ${name}`,
      html,
    });

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

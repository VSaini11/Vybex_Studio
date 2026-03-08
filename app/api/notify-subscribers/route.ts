import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendEmail } from '@/lib/gmail';

/**
 * POST /api/notify-subscribers
 * Send a notification email to all active subscribers.
 * Body: { subject: string, html: string, secret: string }
 * 
 * Protected by a simple secret key — set NOTIFY_SECRET in .env.local
 */
export async function POST(req: NextRequest) {
  try {
    const { subject, content, ctaText, ctaUrl, secret } = await req.json();

    // Simple auth check
    if (secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscribers = await Subscriber.find({ active: true }).select('email');

    // Professional HTML template
    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d08; color: #d4e8d4; padding: 40px; border-radius: 16px;">
        <h2 style="color: #4ade80; font-size: 24px; margin-bottom: 20px;">Vybex Studio Update 🚀</h2>
        <div style="color: #9ca3af; font-size: 16px; line-height: 1.7; margin-bottom: 30px; white-space: pre-wrap;">${content}</div>
        ${ctaUrl ? `
          <div style="text-align: center; margin: 40px 0;">
            <a href="${ctaUrl}" style="background: #4ade80; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
              ${ctaText || 'Learn More'}
            </a>
          </div>
        ` : ''}
        <p style="color: #6b7280; font-size: 13px; margin-top: 30px; border-top: 1px solid #1a1a1a; padding-top: 20px;">
          — The Vybex Studio Team<br />
          <a href="https://vybexstudio.vercel.app" style="color: #4ade80; text-decoration: none;">vybexstudio.vercel.app</a>
        </p>
      </div>
    `;

    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      try {
        await sendEmail({ to: sub.email, subject, html });
        sent++;
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err);
        failed++;
      }
    }

    return NextResponse.json({
      message: `Notification sent to ${sent} subscribers. ${failed} failed.`,
      sent,
      failed,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Notify error:', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

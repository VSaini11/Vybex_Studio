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
    const { subject, html, secret } = await req.json();

    // Simple auth check
    if (secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Subject and html content are required.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscribers = await Subscriber.find({ active: true }).select('email');

    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      try {
        await sendEmail({ to: sub.email, subject, html });
        sent++;
      } catch {
        console.error(`Failed to send to ${sub.email}`);
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

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendWelcomeEmail } from '@/lib/gmail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: 'You are already subscribed! 🎉' },
          { status: 200 }
        );
      }
      // Reactivate
      existing.active = true;
      await existing.save();
    } else {
      // Create new subscriber
      await Subscriber.create({ email: email.toLowerCase() });
    }

    // Send welcome email (non-blocking — don't fail if email fails)
    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Still return success — subscriber is saved
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your inbox. 🎉' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

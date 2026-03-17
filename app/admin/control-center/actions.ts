'use server';

import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendEmail } from '@/lib/gmail';

// Fetch a single random active subscriber
export async function getRandomSubscriber() {
  try {
    await dbConnect();
    
    // Get count of active subscribers
    const count = await Subscriber.countDocuments({ active: true });
    
    if (count === 0) {
      return { success: false, error: 'No active subscribers found' };
    }
    
    // Pick a random index
    const random = Math.floor(Math.random() * count);
    
    // Fetch the subscriber at that index
    // Note: We cannot use .lean() here because we need a Mongoose Document to call .save()
    const subscriber = await Subscriber.findOne({ active: true }).skip(random);
    
    if (!subscriber) {
      return { success: false, error: 'Failed to retrieve subscriber' };
    }

    // Generate a unique VIP VIP code
    // Example format: VYBEX-VIP-ABCD-1234
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateSegment = (length: number) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    const vipCodeStr = `VYBEX-VIP-${generateSegment(4)}-${generateSegment(4)}`;
    
    // Save it to the user's document
    subscriber.vipCodes.push({
      code: vipCodeStr,
      generatedAt: new Date(),
      isRedeemed: false
    });
    await subscriber.save();
    
    // Send email to winner
    const emailHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d08; color: #d4e8d4; padding: 40px; border-radius: 16px;">
        <h2 style="color: #4ade80; font-size: 24px; margin-bottom: 20px;">🎉 You Won the Vybex VIP Pass!</h2>
        <div style="color: #9ca3af; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
          <p>Congratulations! You have been randomly selected from our subscriber list to receive the exclusive Vybex VIP Pass.</p>
          <p>This pass grants you unlimited free access to all future premium Vybex products, including Vybex AI and Vybex DNA.</p>
        </div>
        
        <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
          <p style="text-transform: uppercase; font-size: 11px; font-weight: bold; color: #60a5fa; letter-spacing: 2px; margin-bottom: 10px;">Your Secret VIP Code</p>
          <div style="font-family: monospace; font-size: 24px; font-weight: bold; color: #93c5fd; letter-spacing: 4px;">${vipCodeStr}</div>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 30px;">
          <strong>How to redeem:</strong> Once user accounts launch, simply paste this code into the 'Redeem Pass' section of any Vybex application dashboard to permanently upgrade your status. Do not share this code.
        </p>
        
        <p style="color: #6b7280; font-size: 13px; border-top: 1px solid #1a1a1a; padding-top: 20px;">
          — The Vybex Studio Team
        </p>
      </div>
    `;

    try {
      await sendEmail({
        to: subscriber.email,
        subject: "🎉 You Won the Vybex VIP Pass!",
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Failed to send winner email:', emailError);
      // We don't fail the whole action, but we might want to log this
    }

    return {
      success: true,
      subscriber: {
        email: subscriber.email,
        id: subscriber._id.toString(),
        vipCode: vipCodeStr
      }
    };
  } catch (error) {
    console.error('Error fetching random subscriber:', error);
    return { success: false, error: 'Internal server error while fetching subscriber' };
  }
}

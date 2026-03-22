'use server';

import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendEmail } from '@/lib/gmail';
import GiveawayStatus from '@/models/GiveawayStatus';
import Feedback from '@/models/Feedback';
import { revalidatePath } from 'next/cache';

export async function getGiveawayStatus() {
  await dbConnect();
  try {
    let status = await GiveawayStatus.findOne();
    if (!status) {
      status = await GiveawayStatus.create({ isActive: true });
    }
    return { 
      success: true, 
      isActive: status.isActive,
      nextDrawDate: status.nextDrawDate,
      prizeDescription: status.prizeDescription
    };
  } catch (error) {
    console.error('Failed to get giveaway status:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function updateGiveawayStatus(isActive: boolean, nextDrawDate?: Date, prizeDescription?: string) {
  await dbConnect();
  try {
    let status = await GiveawayStatus.findOne();
    const updateData: any = { isActive };
    if (nextDrawDate) updateData.nextDrawDate = nextDrawDate;
    if (prizeDescription) updateData.prizeDescription = prizeDescription;
    updateData.updatedAt = new Date();

    if (!status) {
      await GiveawayStatus.create(updateData);
    } else {
      Object.assign(status, updateData);
      await status.save();
    }

    revalidatePath('/');
    revalidatePath('/admin/control-center');

    return { success: true };
  } catch (error) {
    console.error('Failed to update giveaway status:', error);
    return { success: false, error: 'Database error' };
  }
}

// Fetch a single random active subscriber
export async function getRandomSubscriber() {
  try {
    await dbConnect();
    
    // Get count of active subscribers who haven't won yet
    const count = await Subscriber.countDocuments({ active: true, vipCodes: { $size: 0 } });
    
    if (count === 0) {
      return { success: false, error: 'No active subscribers found' };
    }
    
    // Pick a random index
    const random = Math.floor(Math.random() * count);
    
    // Fetch the subscriber at that index
    // Note: We cannot use .lean() here because we need a Mongoose Document to call .save()
    const subscriber = await Subscriber.findOne({ active: true, vipCodes: { $size: 0 } }).skip(random);
    
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
      <div style="background-color: #020617; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 20px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <div style="padding: 40px 40px 20px 40px; text-align: center;">
            <div style="display: inline-block; padding: 8px 16px; background-color: #064e3b; border: 1px solid #059669; border-radius: 9999px; margin-bottom: 24px;">
              <span style="color: #34d399; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Mission Accomplished</span>
            </div>
            <h1 style="font-size: 32px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: -0.02em;">VIP Status <span style="color: #10b981;">Unlocked</span></h1>
            <p style="color: #94a3b8; margin-top: 12px; font-size: 16px; line-height: 1.6;">Your subscriber account has been upgraded to Elite status. Your developer credentials are ready for deployment.</p>
          </div>

          <!-- VIP Code Block -->
          <div style="padding: 0 40px 40px 40px;">
            <div style="background-color: #000000; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
              <div style="font-family: monospace; font-size: 11px; color: #64748b; margin-bottom: 12px; display: flex; justify-content: space-between;">
                <span>// ACCESS_TOKEN</span>
                <span>v3.22.26</span>
              </div>
              <div style="font-family: monospace; font-size: 24px; font-weight: 700; color: #10b981; letter-spacing: 2px; text-align: center; padding: 12px 0;">
                ${vipCodeStr}
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div style="padding: 0 40px 40px 40px; border-top: 1px solid #1e293b; padding-top: 40px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; color: #f1f5f9;">Activation Instructions</h2>
            <div style="color: #94a3b8; font-size: 15px; line-height: 2;">
              <div style="margin-bottom: 12px;">
                <span style="color: #10b981; font-weight: 800; margin-right: 8px;">01</span> Navigate to <a href="https://vybexai.vercel.app/" style="color: #10b981; text-decoration: none; font-weight: 600;">vybexai.vercel.app</a>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #10b981; font-weight: 800; margin-right: 8px;">02</span> Authenticate your account (Sign up / Login)
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #10b981; font-weight: 800; margin-right: 8px;">03</span> Access the <strong>Redeem Section</strong> in your Dashboard
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #10b981; font-weight: 800; margin-right: 8px;">04</span> Inject the VIP code above to activate your benefits
              </div>
              <div style="margin-bottom: 0;">
                <span style="color: #10b981; font-weight: 800; margin-right: 8px;">05</span> Share your experience at <a href="https://vybexstudio.vercel.app/giveaway/review" style="color: #10b981; text-decoration: none; font-weight: 600;">vybexstudio.vercel.app/giveaway/review</a>
              </div>
            </div>
          </div>

          <!-- Merchandise -->
          <div style="margin: 0 40px 40px 40px; background-color: #1e293b; border-radius: 16px; padding: 24px; border: 1px solid #334155;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="vertical-align: middle;">
                  <span style="color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">Exclusive Drop</span>
                  <h3 style="font-size: 18px; font-weight: 700; margin: 4px 0; color: #ffffff;">Vybex Studio Mug</h3>
                  <p style="color: #94a3b8; font-size: 13px; margin: 4px 0; line-height: 1.5;">A physical collectible has been reserved for you. It's ready to ship.</p>
                  <p style="color: #10b981; font-size: 12px; font-weight: 700; margin-top: 12px; border-top: 1px dashed #334155; padding-top: 12px;">>>> Action: Reply to this email with your shipping address to claim this drop.</p>
                </td>
                <td style="width: 80px; vertical-align: middle; padding-left: 20px;">
                  <img src="https://vybexstudio.vercel.app/merchandise/cups/3bhr29jqdu771a1p2lvsrx.png" alt="Vybex Mug" style="width: 80px; height: 80px; object-fit: cover; border-radius: 12px; border: 2px solid #334155; display: block;" />
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="padding: 0 40px 40px 40px; text-align: center; border-top: 1px solid #1e293b; padding-top: 32px;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; 2026 Vybex Studio Core. All systems operational.</p>
            <p style="color: #475569; font-size: 11px; margin-top: 8px;">Sent via Vybex OS // Secure Transmission</p>
          </div>

        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: subscriber.email,
        subject: "[Ready for Deployment] Your Vybex VIP Pass Code",
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Failed to send winner email:', emailError);
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

export async function getSubscriberData() {
  try {
    await dbConnect();
    
    // Get total count
    const totalCount = await Subscriber.countDocuments({ active: true });
    
    // Get latest 4 subscribers' emails for initials
    const latestSubscribers = await Subscriber.find({ active: true })
      .sort({ subscribedAt: -1 })
      .limit(4)
      .select('email')
      .lean();
    
    const initials = latestSubscribers.map(sub => 
      sub.email.charAt(0).toUpperCase()
    );

    return {
      success: true,
      totalCount,
      initials
    };
  } catch (error) {
    console.error('Error fetching subscriber data:', error);
    return { success: false, totalCount: 0, initials: [] };
  }
}

export async function submitFeedback(data: { name: string; email: string; message: string; rating: number; isWinner?: boolean; prizeWon?: string }) {
  try {
    await dbConnect();
    await Feedback.create(data);
    revalidatePath('/'); // Revalidate home page to show new review in social proof
    return { success: true };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return { success: false, error: 'Failed to submit feedback.' };
  }
}

export async function getFeedbackData() {
  try {
    await dbConnect();
    
    // Get total count
    const totalCount = await Feedback.countDocuments();
    
    // Get average rating
    const stats = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const averageRating = stats.length > 0 ? stats[0].avgRating : 0;

    // Get latest 4 feedbacks' names for initials
    const latestFeedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select('name')
      .lean();
    
    const initials = latestFeedbacks.map(f => 
      f.name.charAt(0).toUpperCase()
    );

    return {
      success: true,
      totalCount,
      averageRating,
      initials
    };
  } catch (error) {
    console.error('Error fetching feedback data:', error);
    return { success: false, totalCount: 0, averageRating: 0, initials: [] };
  }
}

export async function getWinnerReviews() {
  try {
    await dbConnect();
    const reviews = await Feedback.find({ isWinner: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    
    return {
      success: true,
      reviews: JSON.parse(JSON.stringify(reviews))
    };
  } catch (error) {
    console.error('Error fetching winner reviews:', error);
    return { success: false, reviews: [] };
  }
}

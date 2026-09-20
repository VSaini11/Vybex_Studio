'use server';

import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { sendEmail } from '@/lib/gmail';
import GiveawayStatus from '@/models/GiveawayStatus';
import Feedback from '@/models/Feedback';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function getGiveawayStatus() {
  await dbConnect();
  try {
    let status = await GiveawayStatus.findOne();
    if (!status) {
      status = await GiveawayStatus.create({ isActive: true, activeIntroSection: 'giveaway', prizeType: 'voucher' });
    }
    return { 
      success: true, 
      isActive: status.isActive,
      nextDrawDate: status.nextDrawDate,
      prizeDescription: status.prizeDescription,
      prizeType: (status.prizeType || 'voucher') as 'voucher' | 'vip_pass',
      activeIntroSection: (status.activeIntroSection || 'giveaway') as 'vyana' | 'giveaway'
    };
  } catch (error) {
    console.error('Failed to get giveaway status:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function updateGiveawayStatus(
  isActive: boolean, 
  nextDrawDate?: Date, 
  prizeDescription?: string, 
  prizeType?: 'voucher' | 'vip_pass',
  activeIntroSection?: 'vyana' | 'giveaway'
) {
  await dbConnect();
  try {
    let status = await GiveawayStatus.findOne();
    const updateData: any = { isActive };
    if (nextDrawDate) updateData.nextDrawDate = nextDrawDate;
    if (prizeDescription) updateData.prizeDescription = prizeDescription;
    if (prizeType) updateData.prizeType = prizeType;
    if (activeIntroSection) updateData.activeIntroSection = activeIntroSection;
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

export async function setIntroSection(section: 'vyana' | 'giveaway') {
  await dbConnect();
  try {
    const updated = await GiveawayStatus.findOneAndUpdate(
      {},
      { $set: { activeIntroSection: section, updatedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidatePath('/', 'page');
    revalidatePath('/', 'layout');
    revalidatePath('/admin/control-center', 'page');

    return { success: true, activeIntroSection: updated.activeIntroSection || section };
  } catch (error) {
    console.error('Failed to set intro section:', error);
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

    // Check current giveaway settings to tailor the email & prize
    const giveawayStatus = await GiveawayStatus.findOne();
    const currentPrize = giveawayStatus?.prizeDescription || 'Amazon Gift Voucher Worth 1000 Rs';
    const isVipPassPrize = giveawayStatus?.prizeType 
      ? giveawayStatus.prizeType === 'vip_pass'
      : (currentPrize.toLowerCase().includes('vip pass') && !currentPrize.toLowerCase().includes('voucher') && !currentPrize.toLowerCase().includes('amazon'));

    let vipCodeStr: string | null = null;

    if (isVipPassPrize) {
      // Generate a unique VIP code for external tool verification
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const generateSegment = (length: number) => {
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };
      vipCodeStr = `VYBEX-VIP-${generateSegment(4)}-${generateSegment(4)}`;
      
      // Save it to the user's document
      subscriber.vipCodes.push({
        code: vipCodeStr,
        generatedAt: new Date(),
        isRedeemed: false
      });
      await subscriber.save();
    } else {
      // For Gift Vouchers / Custom Prizes: mark that they won this draw so they aren't rolled again
      subscriber.vipCodes.push({
        code: `WINNER-${Date.now().toString().slice(-6)}`,
        generatedAt: new Date(),
        isRedeemed: true
      });
      await subscriber.save();
    }

    // Load high-resolution brand logos for authentic co-branding
    let emailAttachments: any[] = [];
    let amazonLogoSrc = '';
    let vybexLogoSrc = '';

    try {
      const amazonPath = path.join(process.cwd(), 'public', 'amazon-clean-crop.png');
      const vybexPath = path.join(process.cwd(), 'public', 'vybex-clean-crop.png');

      if (fs.existsSync(amazonPath) && fs.existsSync(vybexPath)) {
        const amazonBuf = fs.readFileSync(amazonPath);
        const vybexBuf = fs.readFileSync(vybexPath);

        emailAttachments = [
          {
            filename: 'amazon-logo.png',
            contentType: 'image/png',
            content: amazonBuf,
            cid: 'amazon_logo'
          },
          {
            filename: 'vybex-logo.png',
            contentType: 'image/png',
            content: vybexBuf,
            cid: 'vybex_logo'
          }
        ];

        amazonLogoSrc = 'cid:amazon_logo';
        vybexLogoSrc = 'cid:vybex_logo';
      }
    } catch (err) {
      console.warn('Could not read brand logos from disk for email attachment:', err);
    }

    // Pure logos: Perfectly balanced 1:1 visual scale, zero whitespace padding
    const amazonImgHtml = amazonLogoSrc 
      ? `<img src="${amazonLogoSrc}" alt="Amazon" width="38" height="38" style="display: block; width: 38px; height: 38px; object-fit: contain; margin: 0 auto;" />`
      : `<span style="color: #ff9900; font-size: 20px; font-weight: 900; font-family: 'Arial', sans-serif;">amazon</span>`;

    const vybexImgHtml = vybexLogoSrc
      ? `<img src="${vybexLogoSrc}" alt="Vybex Studio" width="38" height="38" style="display: block; width: 38px; height: 38px; object-fit: contain; margin: 0 auto;" />`
      : `<span style="color: #4ade80; font-size: 20px; font-weight: 900; letter-spacing: 1px;">VYBEX</span>`;

    // Dynamic Email Template matching the giveaway
    const voucherEmailHtml = `
      <div style="background-color: #030503; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
        <div style="max-width: 580px; margin: 0 auto; background: #0a0f0a; border-radius: 24px; overflow: hidden; border: 1px solid rgba(34, 197, 94, 0.25); box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.95);">
          
          <!-- Top Neon Accent Gradient Line -->
          <div style="height: 4px; background: linear-gradient(90deg, #ff9900 0%, #22c55e 50%, #eab308 100%);"></div>

          <!-- Pure Co-branding: Amazon Logo x Vybex Studio Logo (Perfect 1:1 scale & equal spacing) -->
          <div style="padding: 38px 32px 0 32px; text-align: center;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px auto;">
              <tr>
                <td style="vertical-align: middle; text-align: center; width: 46px; height: 46px; padding: 0;">
                  ${amazonImgHtml}
                </td>
                <td style="vertical-align: middle; text-align: center; padding: 0 16px; color: #6b7280; font-size: 16px; font-weight: 400; line-height: 1;">
                  ✕
                </td>
                <td style="vertical-align: middle; text-align: center; width: 46px; height: 46px; padding: 0;">
                  ${vybexImgHtml}
                </td>
              </tr>
            </table>

            <!-- Status Pill -->
            <div style="display: inline-block; padding: 6px 18px; background-color: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 9999px; margin-bottom: 18px;">
              <span style="color: #4ade80; font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;">✨ Official Winner Announcement</span>
            </div>

            <!-- Congratulations Headline -->
            <h1 style="font-size: 34px; font-weight: 900; margin: 0 0 14px 0; color: #ffffff; letter-spacing: -0.03em; line-height: 1.15;">
              Congratulations! 🎉
            </h1>

            <!-- Emotional Connection Message -->
            <div style="margin: 0 auto 16px auto; padding: 14px 20px; background: rgba(34, 197, 94, 0.08); border: 1px dashed rgba(34, 197, 94, 0.35); border-radius: 14px; max-width: 480px;">
              <p style="color: #4ade80; font-size: 16px; font-weight: 700; margin: 0; line-height: 1.4;">
                💚 We love that you are in our Vybex Studio family!
              </p>
            </div>
            
            <p style="color: #9ca3af; margin: 0 auto; font-size: 14px; line-height: 1.65; max-width: 460px;">
              You were randomly selected in our verified subscriber draw as the lucky winner of the <strong style="color: #ffffff;">Vybex Forward Community Giveaway</strong>.
            </p>
          </div>

          <!-- Prize Card -->
          <div style="padding: 24px 32px;">
            <div style="background: linear-gradient(135deg, rgba(255, 153, 0, 0.12) 0%, rgba(34, 197, 94, 0.12) 100%); border-radius: 20px; padding: 26px 20px; border: 1px solid rgba(255, 153, 0, 0.38); text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div style="display: inline-block; padding: 4px 14px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.14); border-radius: 20px; margin-bottom: 12px;">
                <span style="font-family: monospace; font-size: 10px; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700;">🎁 Verified Prize</span>
              </div>
              <h2 style="font-size: 26px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -0.01em;">
                ${currentPrize}
              </h2>
            </div>
          </div>

          <!-- Claim Steps Box -->
          <div style="padding: 0 32px 32px 32px;">
            <div style="background: rgba(255, 255, 255, 0.025); border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 22px 24px;">
              <h3 style="font-size: 13px; font-weight: 800; margin: 0 0 10px 0; color: #4ade80; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; margin-right: 8px;"></span>
                How to Claim Your Voucher
              </h3>
              <p style="color: #e2e8f0; font-size: 14px; line-height: 1.75; margin: 0;">
                Please confirm your email address in reply for sending the gift card, otherwise we will share the gift card on this subscribed email of yours.
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div style="height: 1px; background: rgba(255, 255, 255, 0.06); margin: 0 32px;"></div>

          <!-- Footer -->
          <div style="padding: 24px 32px 32px 32px; text-align: center;">
            <p style="color: #9ca3af; font-size: 13px; margin: 0 0 4px 0; font-weight: 500;">
              Thank you for building the future with us. 💚
            </p>
            <p style="color: #4b5563; font-size: 11px; margin: 0; font-family: monospace;">
              &copy; 2026 Vybex Studio Core • Series #2026-VIP // Verified Fair Draw
            </p>
          </div>

        </div>
      </div>
    `;

    const vipPassEmailHtml = `
      <div style="background-color: #020617; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 20px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          <div style="padding: 40px 40px 20px 40px; text-align: center;">
            <div style="display: inline-block; padding: 8px 16px; background-color: #064e3b; border: 1px solid #059669; border-radius: 9999px; margin-bottom: 24px;">
              <span style="color: #34d399; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Mission Accomplished</span>
            </div>
            <h1 style="font-size: 32px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: -0.02em;">VIP Status <span style="color: #10b981;">Unlocked</span></h1>
            <p style="color: #94a3b8; margin-top: 12px; font-size: 16px; line-height: 1.6;">Your subscriber account has been upgraded to Elite status. Your developer credentials are ready for deployment.</p>
          </div>
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
          <div style="padding: 0 40px 40px 40px; border-top: 1px solid #1e293b; padding-top: 40px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; color: #f1f5f9;">Activation Instructions</h2>
            <div style="color: #94a3b8; font-size: 15px; line-height: 2;">
              <div style="margin-bottom: 12px;"><span style="color: #10b981; font-weight: 800; margin-right: 8px;">01</span> Navigate to <a href="https://vybexai.vercel.app/" style="color: #10b981; text-decoration: none; font-weight: 600;">vybexai.vercel.app</a></div>
              <div style="margin-bottom: 12px;"><span style="color: #10b981; font-weight: 800; margin-right: 8px;">02</span> Authenticate your account (Sign up / Login)</div>
              <div style="margin-bottom: 12px;"><span style="color: #10b981; font-weight: 800; margin-right: 8px;">03</span> Access the <strong>Redeem Section</strong> in your Dashboard</div>
              <div style="margin-bottom: 12px;"><span style="color: #10b981; font-weight: 800; margin-right: 8px;">04</span> Inject the VIP code above to activate your benefits</div>
            </div>
          </div>
          <div style="padding: 0 40px 40px 40px; text-align: center; border-top: 1px solid #1e293b; padding-top: 32px;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; 2026 Vybex Studio Core. All systems operational.</p>
          </div>
        </div>
      </div>
    `;

    const emailHtml = isVipPassPrize ? vipPassEmailHtml : voucherEmailHtml;

    try {
      await sendEmail({
        to: subscriber.email,
        subject: isVipPassPrize 
          ? "[Ready for Deployment] Your Vybex VIP Pass Code"
          : `🎉 Congratulations! You won the ${currentPrize} - Vybex Forward`,
        html: emailHtml,
        attachments: isVipPassPrize ? [] : emailAttachments
      });
    } catch (emailError) {
      console.error('Failed to send winner email:', emailError);
    }

    return {
      success: true,
      subscriber: {
        email: subscriber.email,
        id: subscriber._id.toString(),
        vipCode: vipCodeStr,
        prize: currentPrize,
        prizeType
      }
    };
  } catch (error) {
    console.error('Error drawing random subscriber:', error);
    return { success: false, error: 'Database error or no subscribers available.' };
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

// Test function to send a preview of the winner email
export async function sendTestWinnerEmail(testEmail: string) {
  try {
    await dbConnect();
    const giveawayStatus = await GiveawayStatus.findOne();
    const currentPrize = giveawayStatus?.prizeDescription || 'Amazon Gift Voucher Worth 1000 Rs';

    // Load high-resolution brand logos for authentic co-branding
    let emailAttachments: any[] = [];
    let amazonLogoSrc = '';
    let vybexLogoSrc = '';

    try {
      const amazonPath = path.join(process.cwd(), 'public', 'amazon-clean-crop.png');
      const vybexPath = path.join(process.cwd(), 'public', 'vybex-clean-crop.png');

      if (fs.existsSync(amazonPath) && fs.existsSync(vybexPath)) {
        const amazonBuf = fs.readFileSync(amazonPath);
        const vybexBuf = fs.readFileSync(vybexPath);

        emailAttachments = [
          {
            filename: 'amazon-logo.png',
            contentType: 'image/png',
            content: amazonBuf,
            cid: 'amazon_logo'
          },
          {
            filename: 'vybex-logo.png',
            contentType: 'image/png',
            content: vybexBuf,
            cid: 'vybex_logo'
          }
        ];

        amazonLogoSrc = 'cid:amazon_logo';
        vybexLogoSrc = 'cid:vybex_logo';
      }
    } catch (err) {
      console.warn('Could not read brand logos from disk for preview attachment:', err);
    }

    // Pure logos: Perfectly balanced 1:1 visual scale, zero whitespace padding
    const amazonImgHtml = amazonLogoSrc 
      ? `<img src="${amazonLogoSrc}" alt="Amazon" width="38" height="38" style="display: block; width: 38px; height: 38px; object-fit: contain; margin: 0 auto;" />`
      : `<span style="color: #ff9900; font-size: 20px; font-weight: 900; font-family: 'Arial', sans-serif;">amazon</span>`;

    const vybexImgHtml = vybexLogoSrc
      ? `<img src="${vybexLogoSrc}" alt="Vybex Studio" width="38" height="38" style="display: block; width: 38px; height: 38px; object-fit: contain; margin: 0 auto;" />`
      : `<span style="color: #4ade80; font-size: 20px; font-weight: 900; letter-spacing: 1px;">VYBEX</span>`;

    const voucherEmailHtml = `
      <div style="background-color: #030503; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
        <div style="max-width: 580px; margin: 0 auto; background: #0a0f0a; border-radius: 24px; overflow: hidden; border: 1px solid rgba(34, 197, 94, 0.25); box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.95);">
          
          <!-- Top Neon Accent Gradient Line -->
          <div style="height: 4px; background: linear-gradient(90deg, #ff9900 0%, #22c55e 50%, #eab308 100%);"></div>

          <!-- Pure Co-branding: Amazon Logo x Vybex Studio Logo (Perfect 1:1 scale & equal spacing) -->
          <div style="padding: 38px 32px 0 32px; text-align: center;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px auto;">
              <tr>
                <td style="vertical-align: middle; text-align: center; width: 46px; height: 46px; padding: 0;">
                  ${amazonImgHtml}
                </td>
                <td style="vertical-align: middle; text-align: center; padding: 0 16px; color: #6b7280; font-size: 16px; font-weight: 400; line-height: 1;">
                  ✕
                </td>
                <td style="vertical-align: middle; text-align: center; width: 46px; height: 46px; padding: 0;">
                  ${vybexImgHtml}
                </td>
              </tr>
            </table>

            <!-- Status Pill -->
            <div style="display: inline-block; padding: 6px 18px; background-color: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 9999px; margin-bottom: 18px;">
              <span style="color: #4ade80; font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;">✨ Official Winner Announcement</span>
            </div>

            <!-- Congratulations Headline -->
            <h1 style="font-size: 34px; font-weight: 900; margin: 0 0 14px 0; color: #ffffff; letter-spacing: -0.03em; line-height: 1.15;">
              Congratulations! 🎉
            </h1>

            <!-- Emotional Connection Message -->
            <div style="margin: 0 auto 16px auto; padding: 14px 20px; background: rgba(34, 197, 94, 0.08); border: 1px dashed rgba(34, 197, 94, 0.35); border-radius: 14px; max-width: 480px;">
              <p style="color: #4ade80; font-size: 16px; font-weight: 700; margin: 0; line-height: 1.4;">
                💚 We love that you are in our Vybex Studio family!
              </p>
            </div>
            
            <p style="color: #9ca3af; margin: 0 auto; font-size: 14px; line-height: 1.65; max-width: 460px;">
              You were randomly selected in our verified subscriber draw as the lucky winner of the <strong style="color: #ffffff;">Vybex Forward Community Giveaway</strong>.
            </p>
          </div>

          <!-- Prize Card -->
          <div style="padding: 24px 32px;">
            <div style="background: linear-gradient(135deg, rgba(255, 153, 0, 0.12) 0%, rgba(34, 197, 94, 0.12) 100%); border-radius: 20px; padding: 26px 20px; border: 1px solid rgba(255, 153, 0, 0.38); text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div style="display: inline-block; padding: 4px 14px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.14); border-radius: 20px; margin-bottom: 12px;">
                <span style="font-family: monospace; font-size: 10px; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700;">🎁 Verified Prize</span>
              </div>
              <h2 style="font-size: 26px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -0.01em;">
                ${currentPrize}
              </h2>
            </div>
          </div>

          <!-- Claim Steps Box -->
          <div style="padding: 0 32px 32px 32px;">
            <div style="background: rgba(255, 255, 255, 0.025); border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 22px 24px;">
              <h3 style="font-size: 13px; font-weight: 800; margin: 0 0 10px 0; color: #4ade80; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; margin-right: 8px;"></span>
                How to Claim Your Voucher
              </h3>
              <p style="color: #e2e8f0; font-size: 14px; line-height: 1.75; margin: 0;">
                Please confirm your email address in reply for sending the gift card, otherwise we will share the gift card on this subscribed email of yours.
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div style="height: 1px; background: rgba(255, 255, 255, 0.06); margin: 0 32px;"></div>

          <!-- Footer -->
          <div style="padding: 24px 32px 32px 32px; text-align: center;">
            <p style="color: #9ca3af; font-size: 13px; margin: 0 0 4px 0; font-weight: 500;">
              Thank you for building the future with us. 💚
            </p>
            <p style="color: #4b5563; font-size: 11px; margin: 0; font-family: monospace;">
              &copy; 2026 Vybex Studio Core • Series #2026-VIP // Verified Fair Draw
            </p>
          </div>

        </div>
      </div>
    `;

    await sendEmail({
      to: testEmail,
      subject: `[TEST PREVIEW] 🎉 Congratulations! You won the ${currentPrize} - Vybex Forward`,
      html: voucherEmailHtml,
      attachments: emailAttachments
    });

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send test winner email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
}

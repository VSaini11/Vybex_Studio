import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
  console.warn('Gmail API credentials are not fully configured in environment variables.');
}

const oauth2Client = new OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: GMAIL_REFRESH_TOKEN,
});

/**
 * Send an email using Gmail API
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const senderEmail = process.env.GMAIL_SENDER_EMAIL || 'vybex.signal@gmail.com';

  // Encode subject line for non-ASCII characters (RFC 2047)
  const encodedSubject = Buffer.from(subject, 'utf-8').toString('base64');
  const finalSubject = `=?UTF-8?B?${encodedSubject}?=`;

  // Build the raw email in RFC 2822 format
  const rawMessage = [
    `From: Vybex Studio <${senderEmail}>`,
    `To: ${to}`,
    `Subject: ${finalSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ].join('\r\n');

  // Base64url encode
  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
  } catch (error: any) {
    if (error.message === 'invalid_grant') {
      console.error('Gmail API Error: invalid_grant. This usually means your GMAIL_REFRESH_TOKEN is invalid or has expired.');
      console.error('Please regenerate your refresh token at https://developers.google.com/oauthplayground');
    }
    throw error;
  }
}

/**
 * Send a welcome email to a new subscriber
 */
export async function sendWelcomeEmail(email: string) {
  await sendEmail({
    to: email,
    subject: '🎉 Welcome to Vybex Studio!',
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d08; color: #d4e8d4; padding: 40px; border-radius: 16px;">
        <h1 style="color: #4ade80; font-size: 28px; margin-bottom: 16px;">Welcome to Vybex Studio! 🚀</h1>
        <p style="color: #9ca3af; font-size: 15px; line-height: 1.7;">
          Thank you for subscribing! You'll now be the first to know about:
        </p>
        <ul style="color: #9ca3af; font-size: 14px; line-height: 2; padding-left: 20px;">
          <li>New features and product launches</li>
          <li>Exclusive updates from Vybex AI & Vybex Studio</li>
          <li>Behind-the-scenes insights and tips</li>
        </ul>
        <p style="color: #6b7280; font-size: 13px; margin-top: 30px; border-top: 1px solid #1a1a1a; padding-top: 20px;">
          — The Vybex Studio Team<br />
          <a href="https://vybexstudio.in" style="color: #4ade80; text-decoration: none;">vybexstudio.in</a>
        </p>
      </div>
    `,
  });
}
/**
 * Send a notification email for a new signal to all subscribers
 */
export async function sendNewSignalNotification({
  to,
  signalTitle,
  signalSlug,
  signalExcerpt,
}: {
  to: string;
  signalTitle: string;
  signalSlug: string;
  signalExcerpt: string;
}) {
  const signalUrl = `https://vybexstudio.in/signals/${signalSlug}`;

  await sendEmail({
    to,
    subject: `📡 NEW SIGNAL: ${signalTitle}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080d08; color: #d4e8d4; padding: 40px; border-radius: 24px; border: 1px solid #1a1a1a;">
        <div style="margin-bottom: 30px; text-align: center;">
          <span style="background: #22c55e; color: #000; padding: 4px 12px; border-radius: 100px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">New Transmission</span>
        </div>
        
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin-bottom: 20px; text-align: center; line-height: 1.3;">${signalTitle}</h1>
        
        <p style="color: #9ca3af; font-size: 15px; line-height: 1.7; margin-bottom: 30px;">
          ${signalExcerpt}
        </p>
        
        <div style="text-align: center; margin-bottom: 40px;">
          <a href="${signalUrl}" style="background: #22c55e; color: #000; padding: 14px 28px; border-radius: 12px; font-weight: 900; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Synchronize Signal</a>
        </div>
        
        <div style="border-top: 1px solid #1a1a1a; padding-top: 30px; text-align: center;">
          <p style="color: #4b5563; font-size: 12px; margin-bottom: 8px;">You're receiving this because you're subscribed to Vybex Signals.</p>
          <p style="color: #6b7280; font-size: 11px;">
            &copy; 2026 Vybex Studio. All rights reserved.<br />
            <a href="https://vybexstudio.in" style="color: #4ade80; text-decoration: none;">vybexstudio.in</a>
          </p>
        </div>
      </div>
    `,
  });
}

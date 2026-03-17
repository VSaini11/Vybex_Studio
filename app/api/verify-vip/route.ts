import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import AuthorizedTool from '@/models/AuthorizedTool';

export async function POST(request: NextRequest) {
  try {
    // 1. Validate the API Key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json(
        { valid: false, reason: 'Missing x-api-key header' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Check if the API key belongs to an active authorized tool
    const tool = await AuthorizedTool.findOne({ apiKey, isActive: true });
    if (!tool) {
      return NextResponse.json(
        { valid: false, reason: 'Invalid or inactive API key' },
        { status: 401 }
      );
    }

    // 2. Parse the request body
    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.code) {
      return NextResponse.json(
        { valid: false, reason: 'Missing email or code in request body' },
        { status: 400 }
      );
    }

    const { email, code } = body;

    // 3. Find the user and verify the code
    const subscriber = await Subscriber.findOne({
      email: email.toLowerCase(),
      active: true
    });

    if (!subscriber) {
      return NextResponse.json(
        { valid: false, reason: 'Subscriber not found or inactive' },
        { status: 404 }
      );
    }

    // Find the specific VIP code in the user's array
    const vipCodeObj = subscriber.vipCodes.find(vc => vc.code === code);

    if (!vipCodeObj) {
      return NextResponse.json(
        { valid: false, reason: 'Invalid VIP code for this email' },
        { status: 400 }
      );
    }

    // Check if it's already redeemed
    if (vipCodeObj.isRedeemed) {
      return NextResponse.json(
        { valid: false, reason: 'This VIP code has already been redeemed' },
        { status: 400 }
      );
    }

    // 4. Mark the code as redeemed
    vipCodeObj.isRedeemed = true;
    vipCodeObj.redeemedAt = new Date();
    await subscriber.save();

    // 5. Success response
    return NextResponse.json({
      valid: true,
      message: 'VIP verification successful',
      toolName: tool.name // Optional context return
    });

  } catch (error) {
    console.error('Error verifying VIP code:', error);
    return NextResponse.json(
      { valid: false, reason: 'Internal server error' },
      { status: 500 }
    );
  }
}

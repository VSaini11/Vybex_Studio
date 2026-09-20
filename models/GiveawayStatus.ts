import mongoose, { Schema, Document } from 'mongoose';

export interface IGiveawayStatus extends Document {
  isActive: boolean;
  nextDrawDate: Date;
  prizeDescription: string;
  prizeType?: 'voucher' | 'vip_pass';
  activeIntroSection?: 'vyana' | 'giveaway';
  updatedAt: Date;
}

const GiveawayStatusSchema: Schema = new Schema({
  isActive: { type: Boolean, default: true },
  nextDrawDate: { type: Date, default: new Date('2026-03-22T18:00:00+05:30') },
  prizeDescription: { type: String, default: 'Amazon Gift Voucher Worth 1000 Rs' },
  prizeType: { type: String, enum: ['voucher', 'vip_pass'], default: 'voucher' },
  activeIntroSection: { type: String, enum: ['vyana', 'giveaway'], default: 'giveaway' },
  updatedAt: { type: Date, default: Date.now }
});

// Clear cached model in development to ensure new schema fields (like activeIntroSection) are recognized
if (process.env.NODE_ENV !== 'production' && mongoose.models.GiveawayStatus) {
  delete mongoose.models.GiveawayStatus;
}

export default (mongoose.models.GiveawayStatus as mongoose.Model<IGiveawayStatus>) || 
  mongoose.model<IGiveawayStatus>('GiveawayStatus', GiveawayStatusSchema);


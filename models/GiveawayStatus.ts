import mongoose, { Schema, Document } from 'mongoose';

export interface IGiveawayStatus extends Document {
  isActive: boolean;
  nextDrawDate: Date;
  prizeDescription: string;
  updatedAt: Date;
}

const GiveawayStatusSchema: Schema = new Schema({
  isActive: { type: Boolean, default: true },
  nextDrawDate: { type: Date, default: new Date('2026-03-22T18:00:00') },
  prizeDescription: { type: String, default: 'Vybex VIP Pass' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.GiveawayStatus || mongoose.model<IGiveawayStatus>('GiveawayStatus', GiveawayStatusSchema);

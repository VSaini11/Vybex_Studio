import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVipCode {
  code: string;
  generatedAt: Date;
  isRedeemed: boolean;
  redeemedAt?: Date;
}

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  active: boolean;
  vipCodes: IVipCode[];
}

const VipCodeSchema = new Schema<IVipCode>({
  code: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
  isRedeemed: { type: Boolean, default: false },
  redeemedAt: { type: Date },
});

const SubscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  vipCodes: [VipCodeSchema],
});

const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMerchandise extends Document {
  name: string;
  category: string;
  image: string;
  description: string;
  isComingSoon: boolean;
  downloadUrl?: string;
  price?: number;
  redirectUrl?: string;
  gender?: 'male' | 'female' | 'unisex';
  createdAt: Date;
}

const MerchandiseSchema = new Schema<IMerchandise>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['wallpapers', 'logos', 'cups', 'bottles', 't-shirts', 'phone-covers'],
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  isComingSoon: {
    type: Boolean,
    default: false,
  },
  downloadUrl: {
    type: String,
    required: false,
    default: '',
  },
  price: {
    type: Number,
    required: false,
  },
  redirectUrl: {
    type: String,
    required: false,
    default: '',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    default: 'unisex',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Merchandise: Model<IMerchandise> =
  mongoose.models.Merchandise || mongoose.model<IMerchandise>('Merchandise', MerchandiseSchema);

export default Merchandise;

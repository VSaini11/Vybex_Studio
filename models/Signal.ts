import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISignal extends Document {
  title: string;
  slug: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
  category: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SignalSchema = new Schema<ISignal>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  readTime: {
    type: String,
    required: false,
    default: '5 min read',
  },
  author: {
    type: String,
    required: false,
    default: 'Vybex Team',
  },
  category: {
    type: String,
    required: false,
    default: 'PLATFORM SIGNAL',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Signal: Model<ISignal> =
  mongoose.models.Signal || mongoose.model<ISignal>('Signal', SignalSchema);

export default Signal;

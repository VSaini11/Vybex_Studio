import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;

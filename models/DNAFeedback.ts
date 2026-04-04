import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDNAFeedback extends Document {
  name: string;
  email: string;
  profession: string;
  experience: string; // The text review
  rating: number; // 1 to 5
  improvedIdea: boolean;
  createdAt: Date;
}

const DNAFeedbackSchema = new Schema<IDNAFeedback>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profession: { type: String, required: true },
  experience: { type: String, required: false, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  improvedIdea: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now }
});

const DNAFeedback: Model<IDNAFeedback> =
  mongoose.models.DNAFeedback || mongoose.model<IDNAFeedback>('DNAFeedback', DNAFeedbackSchema);

export default DNAFeedback;

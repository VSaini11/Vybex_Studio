import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDNAStat extends Document {
  totalAnalyzed: number;
}

const DNAStatSchema = new Schema<IDNAStat>({
  totalAnalyzed: { type: Number, default: 0 }
});

const DNAStat: Model<IDNAStat> =
  mongoose.models.DNAStat || mongoose.model<IDNAStat>('DNAStat', DNAStatSchema);

export default DNAStat;

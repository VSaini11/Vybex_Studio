import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuthorizedTool extends Document {
  name: string;
  url: string;
  apiKey: string;
  isActive: boolean;
  createdAt: Date;
}

const AuthorizedToolSchema = new Schema<IAuthorizedTool>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AuthorizedTool: Model<IAuthorizedTool> =
  mongoose.models.AuthorizedTool || mongoose.model<IAuthorizedTool>('AuthorizedTool', AuthorizedToolSchema);

export default AuthorizedTool;

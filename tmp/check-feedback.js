const mongoose = require('mongoose');

const MONGODB_URI="mongodb+srv://vaibhavsaini709:Qo3xaK0VBCmZGbl0@cluster0.hmvwdyv.mongodb.net/VybexStudio?retryWrites=true&w=majority";

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isWinner: { type: Boolean, default: false },
  prizeWon: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

async function checkFeedback() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const count = await Feedback.countDocuments({ isWinner: true });
    console.log('Total winner reviews:', count);
    const allCount = await Feedback.countDocuments();
    console.log('Total reviews:', allCount);
    
    if (count > 0) {
        const winners = await Feedback.find({ isWinner: true }).limit(5);
        console.log('Sample winners:', winners.map(w => w.name));
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFeedback();

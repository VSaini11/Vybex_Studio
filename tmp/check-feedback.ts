import dbConnect from './lib/mongodb';
import Feedback from './models/Feedback';

async function checkFeedback() {
  try {
    await dbConnect();
    const count = await Feedback.countDocuments({ isWinner: true });
    console.log('Total winner reviews:', count);
    const allCount = await Feedback.countDocuments();
    console.log('Total reviews:', allCount);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFeedback();

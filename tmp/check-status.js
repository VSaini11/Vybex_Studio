const mongoose = require('mongoose');

const MONGODB_URI="mongodb+srv://vaibhavsaini709:Qo3xaK0VBCmZGbl0@cluster0.hmvwdyv.mongodb.net/VybexStudio?retryWrites=true&w=majority";

const GiveawayStatusSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  nextDrawDate: { type: Date },
  prizeDescription: { type: String, default: 'Vybex VIP Pass' },
  updatedAt: { type: Date, default: Date.now }
});

const GiveawayStatus = mongoose.models.GiveawayStatus || mongoose.model('GiveawayStatus', GiveawayStatusSchema);

async function checkStatus() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const status = await GiveawayStatus.findOne();
    console.log('Giveaway Status:', status);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkStatus();

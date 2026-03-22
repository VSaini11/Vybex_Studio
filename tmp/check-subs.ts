import dbConnect from '../lib/mongodb';
import Subscriber from '../models/Subscriber';

async function checkSubscribers() {
  await dbConnect();
  const subs = await Subscriber.find({});
  console.log('Total Subscribers:', subs.length);
  subs.forEach(s => {
    console.log(`Email: ${s.email}, Active: ${s.active}`);
  });
  process.exit(0);
}

checkSubscribers();

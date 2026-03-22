import dbConnect from '../lib/mongodb';
import Merchandise from '../models/Merchandise';
import AuthorizedTool from '../models/AuthorizedTool';
import GiveawayStatus from '../models/GiveawayStatus';

async function checkData() {
  await dbConnect();
  
  const cups = await Merchandise.find({ category: 'cups' });
  console.log('--- Cups ---');
  cups.forEach(c => console.log(`Name: ${c.name}, Image: ${c.image}, Category: ${c.category}`));
  
  const tools = await AuthorizedTool.find({});
  console.log('\n--- Authorized Tools ---');
  tools.forEach(t => console.log(`Name: ${t.name}, URL: ${t.url}`));

  const status = await GiveawayStatus.findOne();
  console.log('\n--- Giveaway Status ---');
  if (status) {
    console.log(`Is Active: ${status.isActive}`);
    console.log(`Next Draw: ${status.nextDrawDate?.toISOString()} (UTC)`);
    console.log(`Prize: ${status.prizeDescription}`);
  } else {
    console.log('No Giveaway Status found in DB');
  }

  console.log('\n--- Environment Check ---');
  console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? 'SET' : 'MISSING'}`);
  console.log(`GMAIL_CLIENT_ID: ${process.env.GMAIL_CLIENT_ID ? 'SET' : 'MISSING'}`);
  console.log(`GMAIL_CLIENT_SECRET: ${process.env.GMAIL_CLIENT_SECRET ? 'SET' : 'MISSING'}`);
  console.log(`GMAIL_REFRESH_TOKEN: ${process.env.GMAIL_REFRESH_TOKEN ? 'SET' : 'MISSING'}`);
  
  process.exit(0);
}

checkData();

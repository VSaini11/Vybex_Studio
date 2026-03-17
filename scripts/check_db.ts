import dbConnect from '../lib/mongodb';
import Subscriber from '../models/Subscriber';
import AuthorizedTool from '../models/AuthorizedTool';

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('Connected to MongoDB');

    const email = 'vaibhavsaini709@gmail.com';
    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    
    if (subscriber) {
      console.log('Subscriber found:');
      console.log(`- Email: ${subscriber.email}`);
      console.log(`- Active: ${subscriber.active}`);
      console.log(`- VIP Codes:`, JSON.stringify(subscriber.vipCodes, null, 2));
    } else {
      console.log(`Subscriber ${email} not found.`);
    }

    const tools = await AuthorizedTool.find();
    console.log('\nAuthorized Tools:');
    tools.forEach(t => {
      console.log(`- Name: ${t.name}`);
      console.log(`  URL: ${t.url}`);
      console.log(`  API Key: ${t.apiKey}`);
      console.log(`  Active: ${t.isActive}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();

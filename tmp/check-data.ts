import dbConnect from '../lib/mongodb';
import Merchandise from '../models/Merchandise';
import AuthorizedTool from '../models/AuthorizedTool';

async function checkData() {
  await dbConnect();
  
  const cups = await Merchandise.find({ category: 'cups' });
  console.log('--- Cups ---');
  cups.forEach(c => console.log(`Name: ${c.name}, Image: ${c.image}, Category: ${c.category}`));
  
  const tools = await AuthorizedTool.find({});
  console.log('\n--- Authorized Tools ---');
  tools.forEach(t => console.log(`Name: ${t.name}, URL: ${t.url}`));
  
  process.exit(0);
}

checkData();

import dbConnect from '@/lib/mongodb';
import Merchandise from '@/models/Merchandise';

async function debug() {
  await dbConnect();
  const items = await Merchandise.find().lean();
  console.log('Total items:', items.length);
  items.forEach(item => {
    console.log('---');
    console.log('ID:', item._id);
    console.log('Name:', item.name);
    console.log('Category:', item.category);
    console.log('Price:', item.price);
    console.log('RedirectURL:', item.redirectUrl);
    console.log('Gender:', item.gender);
    console.log('Image:', item.image);
    console.log('IsComingSoon:', item.isComingSoon);
  });
  process.exit(0);
}

debug().catch(console.error);

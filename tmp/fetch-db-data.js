const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb+srv://vaibhavsaini709:Qo3xaK0VBCmZGbl0@cluster0.hmvwdyv.mongodb.net/VybexStudio?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('VybexStudio');
    
    const tools = database.collection('authorizedtools');
    const vybeAi = await tools.findOne({ name: /Vybex AI/i });
    console.log('--- Vybex AI Tool ---');
    console.log(JSON.stringify(vybeAi, null, 2));

    const merchandise = database.collection('merchandises');
    const cup = await merchandise.findOne({ category: 'cups' });
    console.log('\n--- Cup Merchandise ---');
    console.log(JSON.stringify(cup, null, 2));

  } finally {
    await client.close();
  }
}

run().catch(console.dir);

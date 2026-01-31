const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'SGP';
async function testConnection() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(DB_NAME);
    console.log(`\n📊 Database: ${DB_NAME}`);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections:');
    if (collections.length === 0) {
      console.log('   No collections yet (will be created automatically on first insert)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    
    // Check info collection
    const userCount = await db.collection('info').countDocuments();
    console.log(`\n👥 Users in 'info' collection: ${userCount}`);
    
    // Check queries collection
    const queryCount = await db.collection('queries').countDocuments();
    console.log(`📝 Queries in 'queries' collection: ${queryCount}`);
    
    console.log('\n✅ MongoDB is ready to use!');
    console.log('\n📌 Next steps:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Start frontend: cd ../Frontend && npm run dev');
    console.log('   3. Signup at: http://localhost:5173/signup');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   - Windows: Start MongoDB service');
    console.log('   - Mac/Linux: Run "mongod" in terminal');
  } finally {
    await client.close();
  }
}

testConnection();


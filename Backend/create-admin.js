const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function createAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('SGP');
    
    // Check if admin already exists
    const existingAdmin = await db.collection('info').findOne({ email: 'admin@sgp.com' });
    
    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Email: admin@sgp.com');
      console.log('Password: admin123');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = {
      name: 'Admin',
      email: 'admin@sgp.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    };
    
    await db.collection('info').insertOne(admin);
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@sgp.com');
    console.log('Password: admin123');
    console.log('\nYou can now login with these credentials.');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await client.close();
  }
}

createAdmin();

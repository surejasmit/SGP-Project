const fetch = require('node-fetch');

async function testSignupAPI() {
  console.log('Testing Signup API...\n');
  
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
    role: 'user'
  };
  
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    console.log('\n2. Testing signup endpoint...');
    const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    console.log('Status:', signupResponse.status);
    const signupData = await signupResponse.json();
    console.log('Response:', signupData);
    
    if (signupResponse.ok) {
      console.log('\n✅ Signup API is working!');
    } else {
      console.log('\n❌ Signup failed:', signupData.error);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure backend server is running: npm start');
  }
}

testSignupAPI();

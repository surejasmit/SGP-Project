// Simple test script to verify login API
const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login API...');
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'password123'
    });

    console.log('Login successful!');
    console.log('Response:', {
      message: response.data.message,
      token: response.data.token ? 'Present' : 'Missing',
      user: response.data.user
    });
  } catch (error) {
    console.error('Login failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testLogin();
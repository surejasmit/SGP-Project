// Test if frontend is responding
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET'
};

console.log('Testing frontend server...');

const req = http.request(options, (res) => {
  console.log(`Frontend Status: ${res.statusCode}`);
  console.log('Frontend is responding!');
});

req.on('error', (e) => {
  console.error(`Frontend not responding: ${e.message}`);
  console.log('The React development server might not be running properly.');
});

req.end();
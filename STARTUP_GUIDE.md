# Smart Classroom Management System - Startup Guide

## ✅ Prerequisites
1. MongoDB must be running
2. Node.js installed

## 🚀 Start Backend Server

### Option 1: Using npm
```bash
cd e:\SGP\Backend
npm start
```

### Option 2: Using node directly
```bash
cd e:\SGP\Backend
node server.js
```

## ✅ Verify Server is Running

You should see:
```
✅ Connected to MongoDB - Database: SGP
🚀 Server running on http://localhost:5000
```

## 🧪 Test the API

Open browser and go to:
- http://localhost:5000 - Should show API documentation
- http://localhost:5000/api/health - Should show health status

## 🎨 Start Frontend

In a NEW terminal:
```bash
cd e:\SGP\Frontend
npm run dev
```

## 📝 Test Signup

1. Go to: http://localhost:5173/signup
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: 123456 (minimum 6 characters)
   - Confirm Password: 123456
3. Click "Sign Up"
4. Check browser console (F12) for logs

## ❌ Troubleshooting

### If you see "Route not found":
1. Stop all node processes:
   ```bash
   taskkill /F /IM node.exe
   ```
2. Restart backend server

### If MongoDB connection fails:
1. Make sure MongoDB service is running
2. Check connection string in .env file

### If port 5000 is in use:
1. Find process using port:
   ```bash
   netstat -ano | findstr :5000
   ```
2. Kill the process:
   ```bash
   taskkill /F /PID <process_id>
   ```
3. Restart server

## 📊 View Data in MongoDB

```bash
mongosh
use SGP
db.info.find().pretty()
db.queries.find().pretty()
```

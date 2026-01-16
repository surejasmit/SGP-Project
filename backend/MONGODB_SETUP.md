# MongoDB Setup Guide

## Quick Start

### Option 1: Local MongoDB

1. **Install MongoDB** (if not installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use: `choco install mongodb` (if you have Chocolatey)

2. **Start MongoDB Service**:
   ```powershell
   # Start MongoDB service
   net start MongoDB
   ```

3. **Verify MongoDB is running**:
   ```powershell
   # Check if MongoDB is running on default port
   Test-NetConnection -ComputerName localhost -Port 27017
   ```

### Option 2: MongoDB Atlas (Cloud - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `backend/config/database.js`:
   ```javascript
   const MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/CPI';
   ```

## Current Configuration

- **Database Name**: `CPI`
- **Connection String**: `mongodb://localhost:27017/CPI`
- **Collections**:
  - `info` - All login users (admins & users)
  - `labs` - Lab information
  - `devices` - Device information

## Troubleshooting

If you see "MongoDB connection error":
1. Make sure MongoDB service is running
2. Check if port 27017 is available
3. Verify connection string is correct

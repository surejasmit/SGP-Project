# Smart Classroom & Lab Management System - Backend

## Tech Stack
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Database Name**: SGP
- **Collections**: `info` (users), `queries` (complaints)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Install MongoDB Driver
```bash
npm install mongodb
```

### 3. Configure Environment Variables
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 5. Start Server
```bash
node server.js
```

Server will run on: `http://localhost:5000`

---

## MongoDB Schema Design

### Collection: `info` (Users & Admins)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: String, // "user" or "admin"
  createdAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Smit Patel",
  "email": "smit@example.com",
  "password": "hashed_password",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Collection: `queries` (Complaints)
```javascript
{
  _id: ObjectId,
  userName: String,
  locationType: String, // "classroom" or "lab"
  locationId: String, // "301" or "lab-1"
  itemType: String, // "PC", "Fan", "Smart Board"
  itemNumber: Number,
  query: String,
  status: String, // "pending", "in-progress", "resolved"
  createdAt: Date,
  updatedAt: Date
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userName": "Smit Patel",
  "locationType": "lab",
  "locationId": "lab-1",
  "itemType": "PC",
  "itemNumber": 3,
  "query": "PC not turning on, power button not responding",
  "status": "pending",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

---

## API Routes

### Authentication Routes

#### 1. Signup
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": "507f1f77bcf86cd799439011",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Query Routes

#### 3. Submit Query
**POST** `/api/queries/submit`

**Request Body:**
```json
{
  "userName": "Smit Patel",
  "locationType": "lab",
  "locationId": "lab-1",
  "itemType": "PC",
  "itemNumber": 3,
  "query": "PC not turning on"
}
```

**Success Response:**
```json
{
  "message": "Query submitted successfully",
  "queryId": "507f1f77bcf86cd799439012",
  "query": { ... }
}
```

**Conflict Response (409):**
```json
{
  "error": "Item already affected",
  "message": "This lab item is already affected by user Smit Patel",
  "affectedBy": "Smit Patel"
}
```

#### 4. Get All Queries (Admin Dashboard)
**GET** `/api/queries/all`

**Response:**
```json
{
  "total": 15,
  "queries": [ ... ],
  "groupedQueries": [
    {
      "locationType": "lab",
      "locationId": "lab-1",
      "queries": [ ... ]
    }
  ]
}
```

#### 5. Get Queries by User
**GET** `/api/queries/user/:userName`

**Response:**
```json
{
  "queries": [ ... ]
}
```

#### 6. Update Query Status (Admin)
**PATCH** `/api/queries/:id/status`

**Request Body:**
```json
{
  "status": "resolved"
}
```

**Response:**
```json
{
  "message": "Query status updated successfully"
}
```

#### 7. Check Item Status
**GET** `/api/queries/check?locationType=lab&locationId=lab-1&itemType=PC&itemNumber=3`

**Response (Affected):**
```json
{
  "affected": true,
  "affectedBy": "Smit Patel",
  "status": "pending",
  "query": "PC not turning on"
}
```

**Response (Not Affected):**
```json
{
  "affected": false
}
```

---

### Stats Routes

#### 8. Get Dashboard Stats
**GET** `/api/stats/dashboard`

**Response:**
```json
{
  "totalQueries": 50,
  "pendingQueries": 15,
  "resolvedQueries": 30,
  "totalUsers": 100
}
```

#### 9. Health Check
**GET** `/api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Conflict Prevention Logic

### How It Works:
1. When a user submits a query for **Lab A - PC 3**
2. System checks if there's an **active query** (status: pending or in-progress) for the same item
3. If found, returns **409 Conflict** with message: "This lab item is already affected by user [name]"
4. If not found, creates new query with status "pending"

### Query Status Flow:
- **pending** → Item is reported but not being worked on
- **in-progress** → Admin is working on the issue
- **resolved** → Issue is fixed (item becomes available again)

---

## Role-Based Access Control

### User Role:
- Can signup/login
- Can submit queries
- Can view their own queries

### Admin Role:
- Can signup/login as admin
- Can view all queries
- Can update query status
- Can view dashboard stats

---

## Testing the API

### Using cURL:

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Smit","email":"smit@test.com","password":"123","role":"user"}'
```

**Submit Query:**
```bash
curl -X POST http://localhost:5000/api/queries/submit \
  -H "Content-Type: application/json" \
  -d '{"userName":"Smit","locationType":"lab","locationId":"lab-1","itemType":"PC","itemNumber":3,"query":"Not working"}'
```

**Get All Queries:**
```bash
curl http://localhost:5000/api/queries/all
```

---

## Production Considerations

1. **Password Hashing**: Use `bcrypt` to hash passwords
2. **JWT Authentication**: Implement JWT tokens for secure sessions
3. **Input Validation**: Use `express-validator` or `joi`
4. **Rate Limiting**: Add `express-rate-limit`
5. **MongoDB Atlas**: Use cloud MongoDB for production
6. **Environment Variables**: Never commit `.env` file
7. **Error Logging**: Use `winston` or `morgan`
8. **CORS**: Configure proper CORS origins

---

## MongoDB Indexes (Recommended)

```javascript
// Unique email index
db.info.createIndex({ email: 1 }, { unique: true })

// Query lookup optimization
db.queries.createIndex({ locationType: 1, locationId: 1, itemType: 1, itemNumber: 1 })

// Status filtering
db.queries.createIndex({ status: 1 })

// User queries lookup
db.queries.createIndex({ userName: 1 })
```

---

## License
MIT

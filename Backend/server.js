const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB Connection
let db;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db('SGP');
    console.log('✅ Connected to MongoDB Atlas - Database: SGP');
    console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error.message);
    process.exit(1);
  }
}

// ==================== MIDDLEWARE ====================

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin Authorization Middleware
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ==================== AUTH ROUTES ====================

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await db.collection('info').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const user = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date()
    };

    const result = await db.collection('info').insertOne(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertedId, email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.insertedId,
        name,
        email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await db.collection('info').findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ==================== QUERY ROUTES ====================

// Submit Query (Protected Route)
app.post('/api/queries/submit', authenticateToken, async (req, res) => {
  try {
    const { locationType, locationId, itemType, itemNumber, query } = req.body;
    const userId = req.user.id;
    const userName = req.user.email.split('@')[0];

    // Validation
    if (!locationType || !locationId || !itemType || !itemNumber || !query) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if item is already affected
    const existingQuery = await db.collection('queries').findOne({
      locationType,
      locationId,
      itemType,
      itemNumber,
      status: { $in: ['pending', 'in-progress'] }
    });

    if (existingQuery) {
      return res.status(409).json({
        error: 'Item already affected',
        message: `This ${locationType} item is already affected by user ${existingQuery.userName}`,
        affectedBy: existingQuery.userName
      });
    }

    // Create query document
    const queryDoc = {
      userId,
      userName,
      locationType, // 'classroom' or 'lab'
      locationId, // e.g., '301' or 'lab-1'
      itemType, // 'PC', 'Fan', 'Smart Board'
      itemNumber,
      query,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('queries').insertOne(queryDoc);

    res.status(201).json({
      message: 'Query submitted successfully',
      queryId: result.insertedId,
      query: queryDoc
    });
  } catch (error) {
    console.error('Submit query error:', error);
    res.status(500).json({ error: 'Server error during query submission' });
  }
});

// Get All Queries (Admin Only)
app.get('/api/queries/all', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { filterType, startDate, endDate, status } = req.query;
    let dateFilter = {};

    // Build date filter based on filterType
    if (filterType && filterType !== 'all') {
      const now = new Date();
      let start, end;

      switch (filterType) {
        case 'today':
          start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          break;
        case 'week':
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          weekStart.setHours(0, 0, 0, 0);
          start = weekStart;
          end = new Date(weekStart);
          end.setDate(weekStart.getDate() + 7);
          break;
        case 'month':
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          break;
        case 'year':
          start = new Date(now.getFullYear(), 0, 1);
          end = new Date(now.getFullYear() + 1, 0, 1);
          break;
        case 'custom':
          if (startDate) start = new Date(startDate);
          if (endDate) {
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
          }
          break;
      }

      if (start && end) {
        dateFilter.createdAt = { $gte: start, $lt: end };
      } else if (start) {
        dateFilter.createdAt = { $gte: start };
      } else if (end) {
        dateFilter.createdAt = { $lt: end };
      }
    }

    // Add status filter if provided
    let queryFilter = { ...dateFilter };
    if (status && status !== 'all') {
      queryFilter.status = status;
    }

    const queries = await db.collection('queries')
      .find(queryFilter)
      .sort({ createdAt: -1 })
      .toArray();

    // Group by location
    const groupedQueries = queries.reduce((acc, query) => {
      const key = `${query.locationType}-${query.locationId}`;
      if (!acc[key]) {
        acc[key] = {
          locationType: query.locationType,
          locationId: query.locationId,
          queries: []
        };
      }
      acc[key].queries.push(query);
      return acc;
    }, {});

    res.json({
      total: queries.length,
      queries,
      groupedQueries: Object.values(groupedQueries),
      filters: { filterType, startDate, endDate, status }
    });
  } catch (error) {
    console.error('Get queries error:', error);
    res.status(500).json({ error: 'Server error fetching queries' });
  }
});

// Get User's Own Queries (Protected)
app.get('/api/queries/my-queries', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const queries = await db.collection('queries')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ queries });
  } catch (error) {
    console.error('Get user queries error:', error);
    res.status(500).json({ error: 'Server error fetching user queries' });
  }
});

// Update Query Status (Admin Only)
app.patch('/api/queries/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { 
      status, 
      updatedAt: new Date() 
    };

    if (adminResponse) {
      updateData.adminResponse = adminResponse;
    }

    const result = await db.collection('queries').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Query not found' });
    }

    res.json({ message: 'Query status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Server error updating query status' });
  }
});

// Check Item Status
app.get('/api/queries/check', async (req, res) => {
  try {
    const { locationType, locationId, itemType, itemNumber } = req.query;

    const query = await db.collection('queries').findOne({
      locationType,
      locationId,
      itemType,
      itemNumber,
      status: { $in: ['pending', 'in-progress'] }
    });

    if (query) {
      res.json({
        affected: true,
        affectedBy: query.userName,
        status: query.status,
        query: query.query
      });
    } else {
      res.json({ affected: false });
    }
  } catch (error) {
    console.error('Check item error:', error);
    res.status(500).json({ error: 'Server error checking item status' });
  }
});

// ==================== STATS ROUTES ====================

// Get Dashboard Stats (Admin Only)
app.get('/api/stats/dashboard', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { filterType, startDate, endDate } = req.query;
    let dateFilter = {};

    // Build date filter for stats
    if (filterType && filterType !== 'all') {
      const now = new Date();
      let start, end;

      switch (filterType) {
        case 'today':
          start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          break;
        case 'week':
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          weekStart.setHours(0, 0, 0, 0);
          start = weekStart;
          end = new Date(weekStart);
          end.setDate(weekStart.getDate() + 7);
          break;
        case 'month':
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          break;
        case 'year':
          start = new Date(now.getFullYear(), 0, 1);
          end = new Date(now.getFullYear() + 1, 0, 1);
          break;
        case 'custom':
          if (startDate) start = new Date(startDate);
          if (endDate) {
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
          }
          break;
      }

      if (start && end) {
        dateFilter.createdAt = { $gte: start, $lt: end };
      } else if (start) {
        dateFilter.createdAt = { $gte: start };
      } else if (end) {
        dateFilter.createdAt = { $lt: end };
      }
    }

    const totalQueries = await db.collection('queries').countDocuments(dateFilter);
    const pendingQueries = await db.collection('queries').countDocuments({ ...dateFilter, status: 'pending' });
    const resolvedQueries = await db.collection('queries').countDocuments({ ...dateFilter, status: 'resolved' });
    const inProgressQueries = await db.collection('queries').countDocuments({ ...dateFilter, status: 'in-progress' });
    const totalUsers = await db.collection('info').countDocuments({ role: 'user' });

    res.json({
      totalQueries,
      pendingQueries,
      resolvedQueries,
      inProgressQueries,
      totalUsers,
      filters: { filterType, startDate, endDate }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

// ==================== ROOT & HEALTH ROUTES ====================

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Smart Classroom & Lab Management System API',
    version: '1.0.0',
    database: 'SGP',
    status: 'running',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login'
      },
      queries: {
        submit: 'POST /api/queries/submit',
        myQueries: 'GET /api/queries/my-queries',
        all: 'GET /api/queries/all (admin) - supports ?filterType=today|week|month|year|custom&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&status=pending|in-progress|resolved',
        updateStatus: 'PATCH /api/queries/:id/status (admin)'
      },
      stats: {
        dashboard: 'GET /api/stats/dashboard (admin)'
      },
      health: 'GET /api/health'
    }
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    database: 'SGP',
    timestamp: new Date().toISOString()
  });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await mongoClient.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

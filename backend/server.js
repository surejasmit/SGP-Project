const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/database');
const { db, initializeData } = require('./database');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'digital-electronics-secret-key-2024';
const ADMIN_CODE = 'DES2024'; // Secret code for admin signup

app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Admin-only middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// ==================== AUTHENTICATION ROUTES ====================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
  const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const admin = await db.getAdmin(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

    const token = jwt.sign({ id: admin._id.toString(), username: admin.username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Signup
app.post('/api/admin/signup', async (req, res) => {
  try {
  const { username, password, adminCode } = req.body;
    if (!username || !password || !adminCode) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    if (adminCode !== ADMIN_CODE) {
      return res.status(403).json({ success: false, message: 'Invalid admin code' });
    }

    const exists = await db.getAdmin(username);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

  const hashedPassword = bcrypt.hashSync(password, 10);
    await db.createAdmin(username, hashedPassword);
  res.json({ success: true, message: 'Admin created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Verify
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  res.json({ success: true, admin: { id: req.user.id, username: req.user.username } });
});

// User Login
app.post('/api/user/login', async (req, res) => {
  try {
  const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const user = await db.getUser(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

    const token = jwt.sign({ id: user._id.toString(), email: user.email, name: user.name, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// User Signup
app.post('/api/user/signup', async (req, res) => {
  try {
  const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const exists = await db.getUser(email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

  const hashedPassword = bcrypt.hashSync(password, 10);
    await db.createUser(name, email, hashedPassword);
  res.json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// User Verify
app.get('/api/user/verify', authenticateToken, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ success: false, message: 'User access required' });
  }
  res.json({ success: true, user: { id: req.user.id, email: req.user.email, name: req.user.name } });
});

// Get All Users (Admin only)
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== LAB ROUTES ====================

// Get all labs
app.get('/api/labs', async (req, res) => {
  try {
    const labs = await db.getAllLabs();
    res.json({ success: true, labs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get lab by number
app.get('/api/labs/:labNumber', async (req, res) => {
  try {
    const { labNumber } = req.params;
    const lab = await db.getLab(parseInt(labNumber));
    
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }
    
    res.json({ success: true, lab });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create lab (Admin only)
app.post('/api/labs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { lab_number, name, description } = req.body;
    
    if (!lab_number || !name) {
      return res.status(400).json({ success: false, message: 'Lab number and name are required' });
    }

    const exists = await db.getLab(lab_number);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Lab number already exists' });
    }

    const lab = await db.createLab(lab_number, name, description || '');
    res.json({ success: true, lab });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update lab (Admin only)
app.put('/api/labs/:labNumber', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { labNumber } = req.params;
    const { name, description } = req.body;

    const lab = await db.getLab(parseInt(labNumber));
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    const updated = await db.updateLab(parseInt(labNumber), {
      name: name || lab.name,
      description: description !== undefined ? description : lab.description
    });
    
    res.json({ success: true, message: 'Lab updated', lab: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete lab (Admin only)
app.delete('/api/labs/:labNumber', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { labNumber } = req.params;

    const deleted = await db.deleteLab(parseInt(labNumber));
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    res.json({ success: true, message: 'Lab deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== DEVICE ROUTES ====================

// Get all devices for a lab
app.get('/api/labs/:labNumber/devices', async (req, res) => {
  try {
    const { labNumber } = req.params;
    
    const lab = await db.getLab(parseInt(labNumber));
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    const devices = await db.getDevicesByLab(lab._id);
    res.json({ success: true, devices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get device by ID
app.get('/api/devices/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await db.getDevice(deviceId);
    
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }
    
    res.json({ success: true, device });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Toggle device state (ON/OFF)
app.patch('/api/devices/:deviceId/toggle', async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    const device = await db.getDevice(deviceId);
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    const newState = device.is_on === 1 ? 0 : 1;
    const updated = await db.updateDevice(deviceId, { is_on: newState });
    
    res.json({ success: true, device: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update device state (Admin only)
app.patch('/api/devices/:deviceId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { is_on, name, type } = req.body;
    
    const device = await db.getDevice(deviceId);
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    const updates = {};
    if (is_on !== undefined) updates.is_on = is_on ? 1 : 0;
    if (name) updates.name = name;
    if (type && ['light', 'fan', 'computer'].includes(type)) updates.type = type;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const updated = await db.updateDevice(deviceId, updates);
    res.json({ success: true, device: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create device (Admin only)
app.post('/api/labs/:labNumber/devices', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { labNumber } = req.params;
    const { name, type, is_on } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ success: false, message: 'Name and type are required' });
    }

    if (!['light', 'fan', 'computer'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid device type' });
    }

    const lab = await db.getLab(parseInt(labNumber));
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    const device = await db.createDevice(lab._id, name, type, is_on !== undefined ? is_on : true);
    res.json({ success: true, device });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete device (Admin only)
app.delete('/api/devices/:deviceId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    const deleted = await db.deleteDevice(deviceId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    res.json({ success: true, message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all devices grouped by type for a lab
app.get('/api/labs/:labNumber/devices/grouped', async (req, res) => {
  try {
    const { labNumber } = req.params;
    
    const lab = await db.getLab(parseInt(labNumber));
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    const devices = await db.getDevicesByLab(lab._id);
    
    const grouped = {
      lights: devices.filter(d => d.type === 'light'),
      fans: devices.filter(d => d.type === 'fan'),
      computers: devices.filter(d => d.type === 'computer')
    };
    
    res.json({ success: true, devices: grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Initialize data after MongoDB connection
const mongoose = require('mongoose');
mongoose.connection.once('open', async () => {
  console.log('📊 Initializing default data...');
  await initializeData();
});

// Start server even if MongoDB connection fails
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Connecting to MongoDB...`);
  
  // Try to connect to MongoDB
  const connected = await connectDB();
  if (connected) {
    console.log('✅ Ready to accept requests');
  } else {
    console.log('⚠️  Server running but MongoDB not connected');
    console.log('⚠️  Please start MongoDB and restart the server');
  }
});

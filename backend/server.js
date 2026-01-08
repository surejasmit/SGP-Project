const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

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
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const admin = db.getAdmin(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
});

// Admin Signup
app.post('/api/admin/signup', (req, res) => {
  const { username, password, adminCode } = req.body;
  if (!username || !password || !adminCode) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  if (adminCode !== ADMIN_CODE) {
    return res.status(403).json({ success: false, message: 'Invalid admin code' });
  }

  const exists = db.getAdmin(username);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.createAdmin(username, hashedPassword);
  res.json({ success: true, message: 'Admin created' });
});

// Admin Verify
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  res.json({ success: true, admin: { id: req.user.id, username: req.user.username } });
});

// User Login
app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const user = db.getUser(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
});

// User Signup
app.post('/api/user/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const exists = db.getUser(email);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.createUser(name, email, hashedPassword);
  res.json({ success: true, message: 'User created' });
});

// User Verify
app.get('/api/user/verify', authenticateToken, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ success: false, message: 'User access required' });
  }
  res.json({ success: true, user: { id: req.user.id, email: req.user.email, name: req.user.name } });
});

// Get All Users (Admin only)
app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  const users = db.getAllUsers();
  res.json({ success: true, users });
});

// ==================== LAB ROUTES ====================

// Get all labs
app.get('/api/labs', (req, res) => {
  const labs = db.getAllLabs();
  res.json({ success: true, labs });
});

// Get lab by number
app.get('/api/labs/:labNumber', (req, res) => {
  const { labNumber } = req.params;
  const lab = db.getLab(parseInt(labNumber));
  
  if (!lab) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }
  
  res.json({ success: true, lab });
});

// Create lab (Admin only)
app.post('/api/labs', authenticateToken, requireAdmin, (req, res) => {
  const { lab_number, name, description } = req.body;
  
  if (!lab_number || !name) {
    return res.status(400).json({ success: false, message: 'Lab number and name are required' });
  }

  const exists = db.getLab(lab_number);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Lab number already exists' });
  }

  const lab = db.createLab(lab_number, name, description || '');
  res.json({ success: true, lab });
});

// Update lab (Admin only)
app.put('/api/labs/:labNumber', authenticateToken, requireAdmin, (req, res) => {
  const { labNumber } = req.params;
  const { name, description } = req.body;

  const lab = db.getLab(parseInt(labNumber));
  if (!lab) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }

  const updated = db.updateLab(parseInt(labNumber), {
    name: name || lab.name,
    description: description !== undefined ? description : lab.description
  });
  
  res.json({ success: true, message: 'Lab updated', lab: updated });
});

// Delete lab (Admin only)
app.delete('/api/labs/:labNumber', authenticateToken, requireAdmin, (req, res) => {
  const { labNumber } = req.params;

  const deleted = db.deleteLab(parseInt(labNumber));
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }

  res.json({ success: true, message: 'Lab deleted' });
});

// ==================== DEVICE ROUTES ====================

// Get all devices for a lab
app.get('/api/labs/:labNumber/devices', (req, res) => {
  const { labNumber } = req.params;
  
  const lab = db.getLab(parseInt(labNumber));
  if (!lab) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }

  const devices = db.getDevicesByLab(lab.id);
  res.json({ success: true, devices });
});

// Get device by ID
app.get('/api/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const device = db.getDevice(parseInt(deviceId));
  
  if (!device) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }
  
  res.json({ success: true, device });
});

// Toggle device state (ON/OFF)
app.patch('/api/devices/:deviceId/toggle', (req, res) => {
  const { deviceId } = req.params;
  
  const device = db.getDevice(parseInt(deviceId));
  if (!device) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }

  const newState = device.is_on === 1 ? 0 : 1;
  const updated = db.updateDevice(parseInt(deviceId), { is_on: newState });
  
  res.json({ success: true, device: updated });
});

// Update device state (Admin only)
app.patch('/api/devices/:deviceId', authenticateToken, requireAdmin, (req, res) => {
  const { deviceId } = req.params;
  const { is_on, name, type } = req.body;
  
  const device = db.getDevice(parseInt(deviceId));
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

  const updated = db.updateDevice(parseInt(deviceId), updates);
  res.json({ success: true, device: updated });
});

// Create device (Admin only)
app.post('/api/labs/:labNumber/devices', authenticateToken, requireAdmin, (req, res) => {
  const { labNumber } = req.params;
  const { name, type, is_on } = req.body;
  
  if (!name || !type) {
    return res.status(400).json({ success: false, message: 'Name and type are required' });
  }

  if (!['light', 'fan', 'computer'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Invalid device type' });
  }

  const lab = db.getLab(parseInt(labNumber));
  if (!lab) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }

  const device = db.createDevice(lab.id, name, type, is_on !== undefined ? is_on : true);
  res.json({ success: true, device });
});

// Delete device (Admin only)
app.delete('/api/devices/:deviceId', authenticateToken, requireAdmin, (req, res) => {
  const { deviceId } = req.params;
  
  const deleted = db.deleteDevice(parseInt(deviceId));
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }

  res.json({ success: true, message: 'Device deleted' });
});

// Get all devices grouped by type for a lab
app.get('/api/labs/:labNumber/devices/grouped', (req, res) => {
  const { labNumber } = req.params;
  
  const lab = db.getLab(parseInt(labNumber));
  if (!lab) {
    return res.status(404).json({ success: false, message: 'Lab not found' });
  }

  const devices = db.getDevicesByLab(lab.id);
  
  const grouped = {
    lights: devices.filter(d => d.type === 'light'),
    fans: devices.filter(d => d.type === 'fan'),
    computers: devices.filter(d => d.type === 'computer')
  };
  
  res.json({ success: true, devices: grouped });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database initialized with labs and devices`);
});

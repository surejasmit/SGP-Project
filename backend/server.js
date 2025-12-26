const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'digital-electronics-secret-key-2024';
const ADMIN_CODE = 'DES2024'; // Secret code for admin signup

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Default admin
const adminExists = db.prepare('SELECT * FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('Default admin: admin / admin123');
}

app.use(cors());
app.use(express.json());

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: 'Required fields missing' });

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
});

// Admin Signup
app.post('/api/admin/signup', (req, res) => {
  const { username, password, adminCode } = req.body;
  if (!username || !password || !adminCode) return res.status(400).json({ success: false, message: 'Required fields missing' });

  if (adminCode !== ADMIN_CODE) return res.status(403).json({ success: false, message: 'Invalid admin code' });

  const exists = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (exists) return res.status(400).json({ success: false, message: 'Username already exists' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(username, hashedPassword);
  res.json({ success: true, message: 'Admin created' });
});

// Admin Verify
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ success: false });

  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    res.json({ success: true, admin: { id: decoded.id, username: decoded.username } });
  } catch {
    res.status(401).json({ success: false });
  }
});

// User Login
app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Required fields missing' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token });
});

// User Signup
app.post('/api/user/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Required fields missing' });

  const exists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (exists) return res.status(400).json({ success: false, message: 'Email already exists' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);
  res.json({ success: true, message: 'User created' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

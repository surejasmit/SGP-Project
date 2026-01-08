const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database structure
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      admins: [],
      users: [],
      labs: [],
      devices: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDB() {
  initDB();
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Database operations
const db = {
  // Admins
  getAdmin: (username) => {
    const data = readDB();
    return data.admins.find(a => a.username === username);
  },
  
  createAdmin: (username, password) => {
    const data = readDB();
    const id = data.admins.length > 0 ? Math.max(...data.admins.map(a => a.id)) + 1 : 1;
    const admin = {
      id,
      username,
      password,
      created_at: new Date().toISOString()
    };
    data.admins.push(admin);
    writeDB(data);
    return admin;
  },
  
  // Users
  getUser: (email) => {
    const data = readDB();
    return data.users.find(u => u.email === email);
  },
  
  getUserById: (id) => {
    const data = readDB();
    return data.users.find(u => u.id === id);
  },
  
  createUser: (name, email, password) => {
    const data = readDB();
    const id = data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
    const user = {
      id,
      name,
      email,
      password,
      created_at: new Date().toISOString()
    };
    data.users.push(user);
    writeDB(data);
    return user;
  },
  
  getAllUsers: () => {
    const data = readDB();
    return data.users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      created_at: u.created_at
    }));
  },
  
  // Labs
  getLab: (labNumber) => {
    const data = readDB();
    return data.labs.find(l => l.lab_number === labNumber);
  },
  
  getAllLabs: () => {
    const data = readDB();
    return data.labs.sort((a, b) => a.lab_number - b.lab_number);
  },
  
  createLab: (labNumber, name, description) => {
    const data = readDB();
    const id = data.labs.length > 0 ? Math.max(...data.labs.map(l => l.id)) + 1 : 1;
    const lab = {
      id,
      lab_number: labNumber,
      name,
      description: description || '',
      created_at: new Date().toISOString()
    };
    data.labs.push(lab);
    writeDB(data);
    return lab;
  },
  
  updateLab: (labNumber, updates) => {
    const data = readDB();
    const lab = data.labs.find(l => l.lab_number === labNumber);
    if (lab) {
      Object.assign(lab, updates);
      writeDB(data);
      return lab;
    }
    return null;
  },
  
  deleteLab: (labNumber) => {
    const data = readDB();
    const index = data.labs.findIndex(l => l.lab_number === labNumber);
    if (index !== -1) {
      const lab = data.labs[index];
      // Delete associated devices
      data.devices = data.devices.filter(d => d.lab_id !== lab.id);
      data.labs.splice(index, 1);
      writeDB(data);
      return true;
    }
    return false;
  },
  
  // Devices
  getDevicesByLab: (labId) => {
    const data = readDB();
    return data.devices.filter(d => d.lab_id === labId);
  },
  
  getDevice: (deviceId) => {
    const data = readDB();
    return data.devices.find(d => d.id === deviceId);
  },
  
  createDevice: (labId, name, type, isOn = true) => {
    const data = readDB();
    const id = data.devices.length > 0 ? Math.max(...data.devices.map(d => d.id)) + 1 : 1;
    const device = {
      id,
      lab_id: labId,
      name,
      type,
      is_on: isOn ? 1 : 0,
      created_at: new Date().toISOString()
    };
    data.devices.push(device);
    writeDB(data);
    return device;
  },
  
  updateDevice: (deviceId, updates) => {
    const data = readDB();
    const device = data.devices.find(d => d.id === deviceId);
    if (device) {
      Object.assign(device, updates);
      writeDB(data);
      return device;
    }
    return null;
  },
  
  deleteDevice: (deviceId) => {
    const data = readDB();
    const index = data.devices.findIndex(d => d.id === deviceId);
    if (index !== -1) {
      data.devices.splice(index, 1);
      writeDB(data);
      return true;
    }
    return false;
  }
};

// Initialize database and create default data
initDB();
const data = readDB();

// Create default admin if doesn't exist
if (data.admins.length === 0) {
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.createAdmin('admin', hashedPassword);
  console.log('Default admin created: admin / admin123');
}

// Create labs 1-10 if they don't exist
for (let i = 1; i <= 10; i++) {
  if (!db.getLab(i)) {
    const lab = db.createLab(i, `Lab ${i}`, `Digital Electronics Laboratory ${i}`);
    
    // Create devices for each lab
    for (let j = 1; j <= 8; j++) {
      db.createDevice(lab.id, `Light ${j}`, 'light', true);
    }
    for (let j = 1; j <= 3; j++) {
      db.createDevice(lab.id, `Fan ${j}`, 'fan', true);
    }
    for (let j = 1; j <= 8; j++) {
      db.createDevice(lab.id, `PC ${j}`, 'computer', true);
    }
  }
}

module.exports = db;


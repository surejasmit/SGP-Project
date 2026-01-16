const Info = require('./models/Info');
const Lab = require('./models/Lab');
const Device = require('./models/Device');

// Database operations using MongoDB
const db = {
  // Admins - stored in Info collection with type='admin'
  getAdmin: async (username) => {
    return await Info.findOne({ type: 'admin', username });
  },
  
  createAdmin: async (username, password) => {
    const admin = new Info({
      type: 'admin',
      username,
      password,
      created_at: new Date()
    });
    return await admin.save();
  },
  
  // Users - stored in Info collection with type='user'
  getUser: async (email) => {
    return await Info.findOne({ type: 'user', email });
  },
  
  getUserById: async (id) => {
    return await Info.findById(id);
  },
  
  createUser: async (name, email, password) => {
    const user = new Info({
      type: 'user',
      name,
      email,
      password,
      created_at: new Date()
    });
    return await user.save();
  },
  
  getAllUsers: async () => {
    const users = await Info.find({ type: 'user' }).select('name email created_at').sort({ created_at: -1 });
    return users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      created_at: u.created_at
    }));
  },
  
  // Labs
  getLab: async (labNumber) => {
    return await Lab.findOne({ lab_number: labNumber });
  },
  
  getAllLabs: async () => {
    return await Lab.find().sort({ lab_number: 1 });
  },
  
  createLab: async (labNumber, name, description) => {
    const lab = new Lab({
      lab_number: labNumber,
      name,
      description: description || '',
      created_at: new Date()
    });
    return await lab.save();
  },
  
  updateLab: async (labNumber, updates) => {
    return await Lab.findOneAndUpdate(
      { lab_number: labNumber },
      { $set: updates },
      { new: true }
    );
  },
  
  deleteLab: async (labNumber) => {
    const lab = await Lab.findOne({ lab_number: labNumber });
    if (lab) {
      // Delete associated devices
      await Device.deleteMany({ lab_id: lab._id });
      await Lab.deleteOne({ _id: lab._id });
      return true;
    }
    return false;
  },
  
  // Devices
  getDevicesByLab: async (labId) => {
    return await Device.find({ lab_id: labId }).sort({ type: 1, name: 1 });
  },
  
  getDevice: async (deviceId) => {
    return await Device.findById(deviceId);
  },
  
  createDevice: async (labId, name, type, isOn = true) => {
    const device = new Device({
      lab_id: labId,
      name,
      type,
      is_on: isOn ? 1 : 0,
      created_at: new Date()
    });
    return await device.save();
  },
  
  updateDevice: async (deviceId, updates) => {
    return await Device.findByIdAndUpdate(
      deviceId,
      { $set: updates },
      { new: true }
    );
  },
  
  deleteDevice: async (deviceId) => {
    const result = await Device.deleteOne({ _id: deviceId });
    return result.deletedCount > 0;
  }
};

// Initialize default data
const initializeData = async () => {
  try {
    // Create default admin if doesn't exist
    const adminExists = await db.getAdmin('admin');
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      await db.createAdmin('admin', hashedPassword);
      console.log('Default admin created: admin / admin123');
    }

    // Create labs 1-10 if they don't exist
    for (let i = 1; i <= 10; i++) {
      const lab = await db.getLab(i);
      if (!lab) {
        const newLab = await db.createLab(i, `Lab ${i}`, `Digital Electronics Laboratory ${i}`);
        
        // Create devices for each lab
        for (let j = 1; j <= 8; j++) {
          await db.createDevice(newLab._id, `Light ${j}`, 'light', true);
        }
        for (let j = 1; j <= 3; j++) {
          await db.createDevice(newLab._id, `Fan ${j}`, 'fan', true);
        }
        for (let j = 1; j <= 8; j++) {
          await db.createDevice(newLab._id, `PC ${j}`, 'computer', true);
        }
      }
    }
    console.log('📊 Database initialized with labs and devices');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

module.exports = { db, initializeData };

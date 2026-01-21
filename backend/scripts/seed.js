const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Lab = require('../models/Lab');
const Issue = require('../models/Issue');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/CPI1');
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Lab.deleteMany();
    await Issue.deleteMany();

    console.log('Cleared existing data...');

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'student'
      }
    ]);

    console.log('Created users...');

    // Create predefined labs and classrooms
    const labs = await Lab.create([
      {
        labName: 'Computer Lab 301',
        type: 'Lab',
        equipment: {
          computers: 12,
          lights: 8,
          fans: 6,
          smartBoard: true
        },
        status: 'normal'
      },
      {
        labName: 'Computer Lab 302',
        type: 'Lab',
        equipment: {
          computers: 15,
          lights: 10,
          fans: 8,
          smartBoard: true
        },
        status: 'issue'
      },
      {
        labName: 'Electronics Lab 303',
        type: 'Lab',
        equipment: {
          computers: 10,
          lights: 12,
          fans: 10,
          smartBoard: false
        },
        status: 'normal'
      },
      {
        labName: 'Physics Lab 304',
        type: 'Lab',
        equipment: {
          computers: 14,
          lights: 16,
          fans: 12,
          smartBoard: true
        },
        status: 'normal'
      },
      {
        labName: 'Classroom 201',
        type: 'Classroom',
        equipment: {
          computers: 0,
          lights: 8,
          fans: 6,
          smartBoard: true
        },
        status: 'normal'
      },
      {
        labName: 'Classroom 202',
        type: 'Classroom',
        equipment: {
          computers: 0,
          lights: 10,
          fans: 8,
          smartBoard: true
        },
        status: 'issue'
      },
      {
        labName: 'Classroom 203',
        type: 'Classroom',
        equipment: {
          computers: 0,
          lights: 12,
          fans: 10,
          smartBoard: false
        },
        status: 'normal'
      },
      {
        labName: 'Classroom 301',
        type: 'Classroom',
        equipment: {
          computers: 0,
          lights: 14,
          fans: 12,
          smartBoard: true
        },
        status: 'normal'
      }
    ]);

    console.log('Created labs...');

    // Create issues
    const issues = await Issue.create([
      {
        labId: labs[1]._id, // Computer Lab 2
        reportedBy: users[1]._id, // John Doe
        equipmentType: 'computers',
        description: 'Multiple computers are not turning on. Power supply issue detected.',
        status: 'open',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        labId: labs[3]._id, // Classroom 102
        reportedBy: users[2]._id, // Jane Smith
        equipmentType: 'lights',
        description: 'Half of the lights are flickering and not working properly.',
        status: 'open',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        labId: labs[0]._id, // Computer Lab 1
        reportedBy: users[1]._id, // John Doe
        equipmentType: 'smartBoard',
        description: 'Smart board touchscreen is not responding to touch inputs.',
        status: 'resolved',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        resolvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        labId: labs[1]._id, // Computer Lab 2
        reportedBy: users[2]._id, // Jane Smith
        equipmentType: 'fans',
        description: 'Two ceiling fans are making loud grinding noises.',
        status: 'resolved',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        resolvedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
      },
      {
        labId: labs[3]._id, // Classroom 102
        reportedBy: users[1]._id, // John Doe
        equipmentType: 'smartBoard',
        description: 'Projector bulb needs replacement - image is very dim.',
        status: 'resolved',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        resolvedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
      }
    ]);

    console.log('Created issues...');

    // Update lab statuses based on issues
    for (const lab of labs) {
      const openIssues = await Issue.countDocuments({
        labId: lab._id,
        status: 'open'
      });

      if (openIssues > 0) {
        await Lab.findByIdAndUpdate(lab._id, { status: 'issue' });
      }
    }

    console.log('Updated lab statuses...');
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Labs & Classrooms: ${labs.length}`);
    console.log(`   Issues: ${issues.length}`);
    console.log('\n🏫 Facilities Added:');
    console.log('   Labs: Computer Lab 301-A/B, 302-A, Physics 401-A, Chemistry 401-B, Biology 501-A, Electronics 501-B');
    console.log('   Classrooms: 301, 302, 303, 304, 305');
    console.log('\n🔐 Demo Accounts:');
    console.log('   Admin: admin@example.com / password123');
    console.log('   Student: student@example.com / password123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});
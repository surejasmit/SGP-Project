# Lab & Classroom Issue Tracking System

A comprehensive MERN stack web application for managing and tracking issues in college labs and classrooms.

## 🚀 Features

### For Students
- **Register/Login**: Secure authentication with role-based access
- **Browse Labs**: View all available labs and classrooms
- **Report Issues**: Submit detailed issue reports for faulty equipment
- **Track Status**: Monitor the status of reported issues
- **Dashboard**: Personal dashboard with issue statistics

### For Admins
- **Full Dashboard**: Comprehensive admin panel with system statistics
- **Issue Management**: View, resolve, and track all reported issues
- **Lab Management**: Add, edit, and manage labs/classrooms
- **Issue History**: View complete history of resolved issues
- **System Overview**: Monitor system health and pending issues

### Core Features
- **Real-time Status**: Labs turn red when issues are reported
- **Equipment Tracking**: Monitor computers, lights, fans, and smart boards
- **Search & Filter**: Advanced filtering and search capabilities
- **Responsive Design**: Modern UI that works on all devices
- **Role-based Access**: Secure authentication with different permissions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Notification system

## 📁 Project Structure

```
cpi1/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── config/         # Database configuration
│   ├── server.js       # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   ├── services/   # API services
│   │   ├── App.js      # Main app component
│   │   ├── index.js    # App entry point
│   │   └── index.css   # Global styles
│   ├── public/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cpi1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/CPI1
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

2. **MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in the `.env` file

### Running the Application

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Sample Data

To populate the database with sample data, run the seed script:
```bash
cd backend
node scripts/seed.js
```

## 👤 Demo Accounts

### Admin Account
- Email: admin@example.com
- Password: password123

### Student Account
- Email: student@example.com
- Password: password123

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "admin"] },
  createdAt: Date
}
```

### Labs Collection
```javascript
{
  labName: String,
  type: { type: String, enum: ["Lab", "Classroom"] },
  equipment: {
    computers: Number,
    lights: Number,
    fans: Number,
    smartBoard: Boolean
  },
  status: { type: String, enum: ["normal", "issue"] },
  createdAt: Date
}
```

### Issues Collection
```javascript
{
  labId: ObjectId,
  reportedBy: ObjectId,
  equipmentType: String,
  description: String,
  status: { type: String, enum: ["open", "resolved"] },
  createdAt: Date,
  resolvedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Labs
- `GET /api/labs` - Get all labs
- `GET /api/labs/:id` - Get lab by ID
- `POST /api/labs` - Create new lab (Admin only)
- `PUT /api/labs/:id` - Update lab (Admin only)
- `DELETE /api/labs/:id` - Delete lab (Admin only)

### Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/resolved` - Get resolved issues
- `POST /api/issues` - Report new issue (Student only)
- `PATCH /api/issues/:id/resolve` - Resolve issue (Admin only)

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode Ready**: Easy to extend with theme support
- **Smooth Animations**: Subtle transitions and hover effects
- **Status Indicators**: Visual feedback with color-coded statuses
- **Toast Notifications**: User-friendly success/error messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Different permissions for students and admins
- **Input Validation**: Comprehensive validation on both client and server
- **CORS Protection**: Cross-origin resource sharing configuration

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Deploy to Heroku, Railway, or similar platform
3. Set environment variables in deployment platform
4. Update frontend API base URL

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Configure build settings if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact the development team.

---

Built with ❤️ using the MERN stack
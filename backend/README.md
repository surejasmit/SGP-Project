# Digital Electronics System - Backend API

A RESTful API backend for the Digital Electronics System built with Express.js and MongoDB.

## Features

- **Authentication**: Admin and User authentication with JWT tokens
- **Lab Management**: CRUD operations for laboratories
- **Device Management**: Manage devices (lights, fans, computers) within labs
- **Device Control**: Toggle device states (ON/OFF)
- **MongoDB Integration**: All data stored in MongoDB database "CPI"

## Prerequisites

- Node.js installed
- MongoDB installed and running (or MongoDB Atlas account)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running:
   - **Local MongoDB**: Start MongoDB service on your machine
   - **MongoDB Atlas**: Update `MONGODB_URI` in `.env` file

3. Configure MongoDB connection (optional):
   - Create `.env` file in backend folder
   - Add: `MONGODB_URI=mongodb://localhost:27017/CPI`
   - Or use MongoDB Atlas connection string

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## MongoDB Database Structure

- **Database Name**: `CPI`
- **Collections**:
  - `info` - Stores all admin and user login data
  - `labs` - Stores lab information
  - `devices` - Stores device information

### Info Collection Schema
- `type`: 'admin' or 'user'
- `username`: Admin username (for admins)
- `email`: User email (for users)
- `name`: User name (for users)
- `password`: Hashed password
- `created_at`: Creation timestamp

## Default Credentials

- **Admin**: `admin` / `admin123`
- **Admin Code** (for signup): `DES2024`

## API Endpoints

### Authentication

#### Admin Login
- **POST** `/api/admin/login`
- Body: `{ username, password }`
- Returns: `{ success, token }`

#### Admin Signup
- **POST** `/api/admin/signup`
- Body: `{ username, password, adminCode }`
- Returns: `{ success, message }`

#### Admin Verify
- **GET** `/api/admin/verify`
- Headers: `Authorization: Bearer <token>`
- Returns: `{ success, admin }`

#### User Login
- **POST** `/api/user/login`
- Body: `{ email, password }`
- Returns: `{ success, token }`

#### User Signup
- **POST** `/api/user/signup`
- Body: `{ name, email, password }`
- Returns: `{ success, message }`

#### User Verify
- **GET** `/api/user/verify`
- Headers: `Authorization: Bearer <token>`
- Returns: `{ success, user }`

### Labs

#### Get All Labs
- **GET** `/api/labs`
- Returns: `{ success, labs }`

#### Get Lab by Number
- **GET** `/api/labs/:labNumber`
- Returns: `{ success, lab }`

#### Create Lab (Admin only)
- **POST** `/api/labs`
- Headers: `Authorization: Bearer <admin_token>`
- Body: `{ lab_number, name, description? }`
- Returns: `{ success, lab }`

#### Update Lab (Admin only)
- **PUT** `/api/labs/:labNumber`
- Headers: `Authorization: Bearer <admin_token>`
- Body: `{ name?, description? }`
- Returns: `{ success, message }`

#### Delete Lab (Admin only)
- **DELETE** `/api/labs/:labNumber`
- Headers: `Authorization: Bearer <admin_token>`
- Returns: `{ success, message }`

### Devices

#### Get All Devices for a Lab
- **GET** `/api/labs/:labNumber/devices`
- Returns: `{ success, devices }`

#### Get Devices Grouped by Type
- **GET** `/api/labs/:labNumber/devices/grouped`
- Returns: `{ success, devices: { lights, fans, computers } }`

#### Get Device by ID
- **GET** `/api/devices/:deviceId`
- Returns: `{ success, device }`

#### Toggle Device State
- **PATCH** `/api/devices/:deviceId/toggle`
- Returns: `{ success, device }`

#### Update Device (Admin only)
- **PATCH** `/api/devices/:deviceId`
- Headers: `Authorization: Bearer <admin_token>`
- Body: `{ is_on?, name?, type? }`
- Returns: `{ success, device }`

#### Create Device (Admin only)
- **POST** `/api/labs/:labNumber/devices`
- Headers: `Authorization: Bearer <admin_token>`
- Body: `{ name, type, is_on? }`
- Returns: `{ success, device }`

#### Delete Device (Admin only)
- **DELETE** `/api/devices/:deviceId`
- Headers: `Authorization: Bearer <admin_token>`
- Returns: `{ success, message }`

## Database Schema

### Tables

- **admins**: Admin user accounts
- **users**: Regular user accounts
- **labs**: Laboratory information (10 labs initialized by default)
- **devices**: Devices within labs (lights, fans, computers)

### Initialization

On first run, the database automatically:
- Creates 10 labs (Lab 1 through Lab 10)
- Initializes each lab with:
  - 8 Lights
  - 3 Fans
  - 8 Computers
- Creates a default admin account

## Technology Stack

- **Express.js**: Web framework
- **SQLite (better-sqlite3)**: Database
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## Environment Variables

The following constants can be modified in `server.js`:
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens
- `ADMIN_CODE`: Secret code required for admin signup


# Digital Electronics System - Backend API

A RESTful API backend for the Digital Electronics System built with Express.js and SQLite.

## Features

- **Authentication**: Admin and User authentication with JWT tokens
- **Lab Management**: CRUD operations for laboratories
- **Device Management**: Manage devices (lights, fans, computers) within labs
- **Device Control**: Toggle device states (ON/OFF)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

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


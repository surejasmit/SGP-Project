# Digital Electronics System

A full-stack web application for college Digital Electronics department.

## Project Structure

```
second/
├── backend/          # Node.js + Express server
│   ├── server.js     # Main server file
│   ├── package.json
│   └── database.sqlite (auto-created)
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Copy Your Image

Copy your image to the frontend public folder:
```bash
copy "C:\Users\smits\Downloads\generated-image.png" "D:\second\frontend\public\generated-image.png"
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on: http://localhost:5000

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## Default Admin Credentials

- **Username:** admin
- **Password:** admin123

## Features

- ✅ Modern animated UI with smooth transitions
- ✅ Admin login with JWT authentication
- ✅ SQLite database for storing credentials
- ✅ Responsive design
- ✅ RESTful API endpoints

## API Endpoints

- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify JWT token


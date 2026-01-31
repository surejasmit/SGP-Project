# Smart Classroom & Lab Electronic Item Management System

A React + TypeScript application for managing and reporting electronic item issues in classrooms and labs.

## Tech Stack

- **React 19** with TypeScript
- **Vite + SWC** for fast builds
- **Tailwind CSS** for styling
- Client-side routing (no external router)
- LocalStorage for data persistence

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation with Login/Signup buttons
│   └── Router.tsx          # Simple client-side router
├── pages/
│   ├── LandingPage.tsx     # Home page with animation placeholder
│   ├── LoginPage.tsx       # Login form with centered card
│   ├── SignupPage.tsx      # Signup form with centered card
│   ├── ComplaintForm.tsx   # User complaint submission
│   └── AdminDashboard.tsx  # Admin dashboard with stats & table
├── hooks/
│   ├── useAuth.ts          # Authentication management
│   └── useComplaints.ts    # Complaints state management
├── types/
│   └── index.ts            # TypeScript interfaces
└── App.tsx                 # Main app with routing logic
```

## Features

### User Features
- Submit complaints for electronic items
- Select location type (Classroom/Lab)
- Choose item type (PC, Fan, Smart Board, Projector)
- Specify item number and issue description

### Admin Features
- View all complaints in a table
- Filter by status (Pending, In Progress, Resolved)
- Update complaint status
- View statistics dashboard

## Animation Integration

The application includes placeholder containers for your existing 21st.dev animation components:

1. **Landing Page**: Background animation layer with z-index 0
2. **Login Page**: Background animation behind the form card
3. **Signup Page**: Background animation behind the form card

Replace the placeholder comments with your actual animation components:
```tsx
{/* Your existing 21st.dev animation component goes here */}
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Authentication

Mock authentication is implemented:
- Use any email with "admin" to login as admin
- Other emails login as regular users
- Data persists in localStorage

## Data Flow

- **Authentication**: Managed by `useAuth` hook
- **Complaints**: Managed by `useComplaints` hook
- **Storage**: LocalStorage (replace with API calls in production)

## TypeScript Interfaces

All data structures are strongly typed:
- `User`: User account information
- `Complaint`: Complaint details with status tracking
- `LocationType`: 'classroom' | 'lab'
- `ItemType`: 'PC' | 'Fan' | 'Smart Board' | 'Projector'
- `ComplaintStatus`: 'pending' | 'in-progress' | 'resolved'

## Styling

- Tailwind CSS utility classes
- Responsive design (mobile-first)
- Proper z-index layering for animations
- Clean, modern UI with shadows and rounded corners

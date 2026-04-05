const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");

// ── Helpers ──
function centered(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: opts.after || 100 },
    children: [
      new TextRun({
        text, bold: opts.bold || false, size: opts.size || 24,
        font: "Times New Roman", italics: opts.italic || false,
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 28, font: "Times New Roman" }),
    ],
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({ text, bold: true, size: 24, font: "Times New Roman" }),
    ],
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({ text, bold: true, size: 22, font: "Times New Roman" }),
    ],
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 160, line: 340 },
    indent: opts.noIndent ? undefined : { firstLine: convertInchesToTwip(0.4) },
    children: [
      new TextRun({
        text, size: 22, font: "Times New Roman",
        bold: opts.bold || false, italics: opts.italic || false,
      }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60, line: 320 },
    indent: { left: convertInchesToTwip(0.5) },
    children: [
      new TextRun({ text: "• " + text, size: 22, font: "Times New Roman" }),
    ],
  });
}

function num(n, text) {
  return new Paragraph({
    spacing: { after: 60, line: 320 },
    indent: { left: convertInchesToTwip(0.3) },
    children: [
      new TextRun({ text: `${n}. ${text}`, size: 22, font: "Times New Roman" }),
    ],
  });
}

function gap() {
  return new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "", size: 16 })] });
}

function cell(text, opts = {}) {
  return new TableCell({
    children: [
      new Paragraph({
        alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({
            text, bold: opts.bold || false, size: 20, font: "Times New Roman",
          }),
        ],
      }),
    ],
  });
}

function table(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: headers.map(h => cell(h, { bold: true, center: true })) }),
      ...rows.map(row => new TableRow({ children: row.map(c => cell(c)) })),
    ],
  });
}

// ── Page margin ──
const margin = {
  top: convertInchesToTwip(1), bottom: convertInchesToTwip(1),
  left: convertInchesToTwip(1.25), right: convertInchesToTwip(1),
};

// ══════════════════════════════════════════════════════════
// DOCUMENT
// ══════════════════════════════════════════════════════════

const doc = new Document({
  styles: { default: { document: { run: { font: "Times New Roman", size: 22 } } } },
  sections: [
    {
      properties: { page: { margin } },
      children: [

        // ── TITLE ──
        centered("Smart Classroom & Lab Electronic Management System", { bold: true, size: 32, after: 200 }),
        gap(),

        // ── AUTHORS ──
        centered("Smit Sureja", { bold: true, size: 24 }),
        centered("Information Technology Dept, Charotar University of Science & Technology,", { size: 20 }),
        centered("Changa, India", { size: 20 }),
        centered("surejasmit@gmail.com", { size: 20, italic: true }),
        gap(),
        centered("Yash Kakadiya", { bold: true, size: 24 }),
        centered("Information Technology Dept, Charotar University of Science & Technology,", { size: 20 }),
        centered("Changa, India", { size: 20 }),
        centered("Yashkakadiya008@gmail.com", { size: 20, italic: true }),
        gap(),

        // ── ABSTRACT ──
        h2("Abstract:"),
        p("In most universities and colleges, when some equipment breaks in a classroom or computer lab, reporting the fault is still a manual process. Students end up telling a lab assistant verbally, writing in a complaint register, or sending emails that nobody tracks properly. This leads to slow repairs, duplicate complaints, and no visibility into what's actually broken across the campus."),
        p("This paper presents a web-based Smart Classroom & Lab Electronic Management System, built to tackle exactly this problem. Our platform lets any student or faculty member select the specific classroom or lab they're in, tap on the faulty equipment like a PC, fan, or smart board, describe what's wrong, and submit the report. The complaint instantly appears on an admin dashboard where the maintenance team can track every issue, filter by date or status, respond to the reporter, and mark things as resolved."),
        p("A key feature we implemented is conflict prevention. If someone has already reported that a particular PC is down, the system blocks duplicate submissions and shows who filed the original complaint. This keeps things clean, avoids wasted effort, and helps the admin team focus on unique problems."),
        p("The frontend is built with React and TypeScript for a snappy single-page app experience, styled with Tailwind CSS and animated using Framer Motion. The backend runs on Node.js with Express, exposes a RESTful API, and handles authentication through JWT tokens with bcrypt password hashing. MongoDB Atlas serves as our cloud database. The whole application is deployed on AWS EC2 for production use."),
        gap(),

        // ── INTRODUCTION ──
        h1("Introduction"),
        p("Today's educational institutions rely heavily on electronic infrastructure. Classrooms have smart boards and projectors. Computer labs are packed with PCs, networking equipment, and peripherals. When this stuff works, everything runs fine. When it breaks down, the trouble starts."),
        p("The typical process for reporting a fault is surprisingly painful. A student notices a dead PC or a malfunctioning fan. They tell a lab assistant, who might write it down or might not. Sometimes they send an email. Sometimes another student reports the same problem without knowing someone already did. The maintenance team has no real-time picture of which rooms have working equipment and which don't. Weeks can pass before a broken projector gets fixed, simply because the complaint fell through the cracks."),
        p("We wanted to fix this. Our Smart Classroom & Lab Electronic Management System provides a single, centralized web platform where equipment issues can be reported in a few clicks, tracked in real time, and resolved efficiently. The platform covers 15 classrooms and 15 computer labs, each containing multiple electronic items like PCs, fans, smart boards, and projectors. Students and faculty can visually browse the equipment, see what's already been reported, and submit targeted complaints. Administrators get a proper dashboard with filtering, statistics, and the ability to respond to individual reports."),
        p("The real differentiator is our conflict prevention mechanism. Once a particular item has been reported, the system blocks any duplicate submission until the original complaint is resolved. This one feature alone eliminates redundant communication, reduces admin workload, and keeps the issue queue clean."),

        // ── ARCHITECTURE OVERVIEW ──
        h1("Architecture Overview"),
        p("The system follows a standard three-tier architecture, keeping things modular and easy to maintain. Each tier can be updated independently without affecting the others."),

        h2("System Components"),

        h3("a. Frontend (Client-Side)"),
        p("Technology: React.js, TypeScript, Tailwind CSS, Framer Motion", { noIndent: true }),
        p("Responsibilities:", { bold: true, noIndent: true }),
        bullet("Provides a responsive, interactive user interface for all user roles including regular users and administrators."),
        bullet("Uses a minimalist design with dark and light theme support, clean borders, and yellow accent circles."),
        bullet("Handles client-side routing through a custom lightweight router, form validation, and local state management."),
        bullet("Communicates with the backend through RESTful API calls using the Fetch API."),
        bullet("Stores JWT tokens in localStorage for persistent authentication."),

        h3("b. Backend (Server-Side)"),
        p("Technology: Node.js, Express.js, jsonwebtoken, bcryptjs, Nodemailer", { noIndent: true }),
        p("Responsibilities:", { bold: true, noIndent: true }),
        bullet("Exposes a RESTful API for authentication, query management, stats computation, and health checks."),
        bullet("Implements business logic including input validation, conflict prevention for duplicate reports, and error handling."),
        bullet("Manages authentication and authorization using JWT with 7-day token expiry and bcrypt password hashing."),
        bullet("Handles role-based access control with middleware separating user and admin permissions."),
        bullet("Integrates with Gmail via Nodemailer to send automated welcome emails on user registration."),

        h3("c. Database"),
        p("Technology: MongoDB Atlas (cloud-hosted NoSQL)", { noIndent: true }),
        p("Responsibilities:", { bold: true, noIndent: true }),
        bullet("Stores persistent data including user profiles in the 'info' collection and equipment complaints in the 'queries' collection."),
        bullet("Supports flexible schema design allowing fields like adminResponse to be added without migrations."),
        bullet("Uses indexes on email (unique), equipment location fields (compound), status, and userName for fast lookups."),

        h2("Key Architectural Patterns"),

        h3("RESTful API"),
        p("All communication between the frontend and backend happens over a stateless REST API. The frontend sends HTTP requests using the Fetch API, and the backend responds with JSON. This keeps things simple and makes it easy to add new clients like a mobile app in the future."),

        h3("Role-Based Access Control (RBAC)"),
        p("We have two middleware functions that run before protected routes. The first, authenticateToken, verifies the JWT and extracts user info. The second, authorizeAdmin, checks that the logged-in user has the admin role. Regular users can submit queries and view their own complaints. Admins can see everything, update statuses, and access dashboard statistics."),

        h3("Conflict Prevention"),
        p("Before saving a new complaint, the backend checks if there's already an active complaint (status pending or in-progress) for the same equipment item at the same location. If one exists, it returns a 409 Conflict response instead of creating a duplicate. This is enforced at the database query level using a compound lookup on locationType, locationId, itemType, and itemNumber."),

        // ── FUNCTIONALITY AND FEATURES ──
        h1("Functionality and Features"),

        p("The platform's functionality is organized around the core processes of user management, location browsing, equipment status monitoring, issue reporting, and administrative management."),

        h2("User Management"),

        h3("Multi-Role Support:"),
        p("The system supports two user roles: regular User and Admin. Each role has a separate dashboard and access to role-specific features. Users can submit and track their own queries. Admins can view all queries across the institution, respond to them, update statuses, and see aggregated statistics."),

        h3("Secure Registration and Authentication:"),
        p("Users can register through a multi-step animated sign-up form that collects email first, then name and password. Google Sign-In is also available for quick one-click registration. Passwords are hashed using bcrypt with 10 salt rounds before storage. JWT tokens with 7-day expiry are issued upon login and stored in the browser's localStorage."),

        h3("Welcome Email:"),
        p("When a new user registers, the backend fires off a welcome email asynchronously through Nodemailer. The email is styled with HTML and informs the user about the platform's features. This happens in the background and doesn't block the API response."),

        h2("Location Browsing"),

        h3("Classroom and Lab Selection:"),
        p("The landing page presents two main categories: Classrooms and Labs. Each has 15 locations. Clicking on either takes the user to a grid of clickable cards showing each room. The cards are simple and clean, with hover animations powered by Framer Motion."),

        h2("Equipment Status and Reporting"),

        h3("Equipment Gallery:"),
        p("When a user selects a specific classroom or lab, they see all the equipment in that room displayed in an interactive radial scroll gallery. Each item shows its current status as either Working or Affected, with color-coded badges. Classrooms contain 10 fans and 3 smart boards. Labs contain 15 PCs, 10 fans, and 3 smart boards."),

        h3("Issue Reporting:"),
        p("Clicking on any equipment item opens a report form pre-filled with the location and item details. The user only needs to describe the problem and hit Submit. The system checks for conflicts before saving. If the submission is successful, a confirmation screen appears and the user is redirected back to the locations page."),

        h3("Conflict Prevention:"),
        p("If someone has already reported that specific item and the complaint is still pending or in-progress, the system returns an error message saying something like: \"This lab item is already affected by user [name].\" The new submission is blocked. This prevents duplicate complaints from cluttering the admin's queue."),

        h2("User Dashboard"),
        p("Once logged in, regular users can access a dashboard showing all their past complaints in a table format. The table displays location, item type and number, issue description, submission date, current status, and the admin's response if one has been provided. Status badges are visually distinct so users can quickly see what's been resolved and what's still pending."),

        h2("Admin Dashboard"),

        h3("Statistics Cards:"),
        p("At the top of the admin dashboard, four stat cards display the total number of queries, how many are pending, how many are in-progress, and how many have been resolved. These numbers update dynamically based on the selected filters."),

        h3("Query Filtering:"),
        p("Admins can filter queries by time period with options including Today, This Week, This Month, This Year, and Custom Date Range. They can also filter by status. The results count updates instantly as filters change."),

        h3("Query Resolution:"),
        p("Each query row includes a text area where the admin can type a response before clicking the Solve button. This marks the complaint as resolved and records the admin's response, which the user can then see in their own dashboard."),

        h2("Landing Page and Additional Features"),

        h3("Landing Page:"),
        p("Features a minimalist hero section with large typography displaying 'Smart Classroom.' Below is a Get Started button, typewriter-animated headings that cycle through messages, location selection cards, a step-by-step usage guide, and a 'Why Use Our System' feature showcase."),

        h3("About Us Page:"),
        p("Includes a description of the project, the team's goal, key features displayed as animated cards, and an orbiting skills visualization showing all the technologies used. A scroll progress indicator runs along the top as the user reads through the page."),

        h3("Theme Support:"),
        p("The application supports dark and light themes. The toggle is accessible from the navbar, and the user's preference is remembered across sessions through a ThemeContext that uses CSS custom properties for bg-background and text-foreground tokens."),

        // ── TECHNICAL IMPLEMENTATION ──
        h1("Technical Implementation"),

        h2("1. Technology Stack"),

        h3("1.1 Frontend Technologies"),

        table(
          ["Technology", "Version", "Purpose"],
          [
            ["React", "18.x", "Component-based UI library"],
            ["TypeScript", "5.9", "Static type checking for JavaScript"],
            ["Tailwind CSS", "3.x", "Utility-first CSS framework"],
            ["Framer Motion", "11.x", "Animation and transition library"],
            ["Vite", "6.x", "Build tool and development server"],
          ]
        ),

        gap(),
        h3("1.2 Backend Technologies"),

        table(
          ["Technology", "Version", "Purpose"],
          [
            ["Node.js", "20.x", "Server-side JavaScript runtime"],
            ["Express", "5.2", "Web application framework"],
            ["MongoDB Driver", "6.21", "Native database client"],
            ["bcryptjs", "3.0", "Password hashing library"],
            ["jsonwebtoken", "9.0", "JWT token creation and verification"],
            ["Nodemailer", "8.0", "Email sending module"],
            ["cors", "2.8", "Cross-origin resource sharing middleware"],
            ["dotenv", "17.x", "Environment variable management"],
          ]
        ),

        gap(),
        h3("1.3 Infrastructure"),

        table(
          ["Technology", "Purpose"],
          [
            ["MongoDB Atlas", "Cloud-hosted NoSQL database"],
            ["AWS EC2", "Cloud server for production deployment"],
            ["Git and GitHub", "Version control and collaboration"],
          ]
        ),

        h2("2. Database Design"),

        h3("2.1 Users Collection (info)"),
        p("Stores every registered account. Each document contains the user's name, email (unique index), bcrypt-hashed password, role (user or admin), and account creation timestamp."),

        table(
          ["Field", "Type", "Description"],
          [
            ["_id", "ObjectId", "Auto-generated unique identifier"],
            ["name", "String", "Full name of the user"],
            ["email", "String (unique)", "Login email address"],
            ["password", "String", "Bcrypt-hashed password"],
            ["role", "String", "Either 'user' or 'admin'"],
            ["createdAt", "Date", "Account creation timestamp"],
          ]
        ),

        gap(),
        h3("2.2 Queries Collection (queries)"),
        p("Stores every equipment complaint from submission to resolution. The status field follows a lifecycle: pending, in-progress, resolved."),

        table(
          ["Field", "Type", "Description"],
          [
            ["_id", "ObjectId", "Unique complaint identifier"],
            ["userId", "String", "Reference to submitting user"],
            ["userName", "String", "Username derived from email"],
            ["locationType", "String", "'classroom' or 'lab'"],
            ["locationId", "String", "Room identifier like '301' or 'lab-5'"],
            ["itemType", "String", "PC, Fan, Smart Board, or Projector"],
            ["itemNumber", "Number", "Specific item number"],
            ["query", "String", "Issue description text"],
            ["status", "String", "pending, in-progress, or resolved"],
            ["adminResponse", "String", "Admin's response when resolving"],
            ["createdAt", "Date", "Submission timestamp"],
            ["updatedAt", "Date", "Last update timestamp"],
          ]
        ),

        gap(),
        h3("2.3 Database Indexes"),
        bullet("Unique index on email in the info collection to prevent duplicate accounts."),
        bullet("Compound index on locationType, locationId, itemType, and itemNumber for fast conflict detection."),
        bullet("Index on status for efficient filtering on the admin dashboard."),
        bullet("Index on userName for quick lookup of a user's own complaints."),

        h2("3. API Design"),

        h3("3.1 Authentication Endpoints"),
        table(
          ["Method", "Endpoint", "Description"],
          [
            ["POST", "/api/auth/signup", "Register new user, returns JWT token"],
            ["POST", "/api/auth/login", "Authenticate user, returns JWT token"],
          ]
        ),

        gap(),
        h3("3.2 Query Endpoints"),
        table(
          ["Method", "Endpoint", "Description"],
          [
            ["POST", "/api/queries/submit", "Submit equipment complaint (auth required)"],
            ["GET", "/api/queries/my-queries", "Get logged-in user's complaints (auth required)"],
            ["GET", "/api/queries/all", "Get all complaints with filters (admin only)"],
            ["PATCH", "/api/queries/:id/status", "Update complaint status (admin only)"],
            ["GET", "/api/queries/check", "Check if specific item already reported"],
          ]
        ),

        gap(),
        h3("3.3 Statistics and Health Endpoints"),
        table(
          ["Method", "Endpoint", "Description"],
          [
            ["GET", "/api/stats/dashboard", "Dashboard statistics (admin only)"],
            ["GET", "/api/health", "Server health check"],
          ]
        ),

        h2("4. Authentication System"),

        h3("4.1 Authentication Architecture"),
        p("The authentication system uses a token-based approach. When a user logs in or signs up, the server generates a JWT containing the user's ID, email, and role, signed with a secret key and set to expire in 7 days. This token is returned in the API response and stored in the browser's localStorage by the frontend."),
        p("For every subsequent API request to a protected endpoint, the frontend sends the token in the Authorization header as a Bearer token. The authenticateToken middleware on the server extracts and verifies the token. If valid, it attaches the decoded user information to the request object. If invalid or expired, it returns a 403 error."),

        h3("4.2 Password Security"),
        p("All passwords are hashed using bcrypt with 10 salt rounds before being stored in the database. During login, the submitted password is compared against the stored hash using bcrypt.compare. Plaintext passwords are never stored or logged anywhere in the system. A minimum length of 6 characters is enforced on both the frontend and backend."),

        h3("4.3 Role-Based Access Control"),
        p("Two middleware functions handle authorization. The authenticateToken middleware runs on every protected route and ensures the request carries a valid JWT. The authorizeAdmin middleware runs on admin-only routes like fetching all queries, updating statuses, and viewing dashboard stats. It checks that the decoded JWT contains role = 'admin'. If not, it returns a 403 Forbidden response."),

        h2("5. Frontend Architecture"),

        h3("5.1 Component-Based Design"),
        p("The frontend follows a component-based architecture using React with TypeScript. The application consists of 14 page components, 11 reusable UI components, 2 custom hooks (useAuth for authentication logic, useComplaints for complaint management), and 2 context providers (ThemeContext for dark/light theme, PCStatusContext for equipment status tracking)."),

        h3("5.2 Routing"),
        p("Instead of using a third-party router like React Router, we built a lightweight custom Router component that listens to the browser's popstate event and matches URL paths to render the appropriate page. This keeps the bundle size small and gives us full control over navigation behavior."),

        h3("5.3 State Management"),
        p("State management is handled at the component level using React's useState and useEffect hooks. Authentication state is persisted in localStorage and loaded on app initialization through the useAuth hook. Theme preference is managed through React Context, and equipment status is tracked via the PCStatusContext."),

        h3("5.4 Animation System"),
        p("Framer Motion handles all animations throughout the application. Cards scale up slightly on hover using whileHover. Sections fade in as the user scrolls past them using whileInView with opacity and translateY transitions. The typewriter component cycles through messages with configurable speed and delay. All animations are GPU-accelerated and respect the browser's natural rendering pipeline."),

        // ── SECURITY CONSIDERATIONS ──
        h1("Security Considerations"),

        h2("1. Authentication and Authorization"),
        bullet("JWT tokens with 7-day expiry for stateless API authentication."),
        bullet("Bearer token scheme with tokens sent in the Authorization header."),
        bullet("Passwords hashed with bcrypt using 10 salt rounds before storage."),
        bullet("Minimum password length of 6 characters enforced on both client and server."),
        bullet("Role-based middleware preventing regular users from accessing admin endpoints."),

        h2("2. API Security"),
        bullet("CORS configured to accept requests only from trusted frontend origins."),
        bullet("All user inputs validated before processing on the server side."),
        bullet("Proper HTTP status codes used throughout: 400 for bad input, 401 for missing auth, 403 for insufficient permissions, 409 for duplicate reports, 500 for server errors."),
        bullet("Sensitive configuration stored in environment variables via dotenv, never committed to version control."),

        h2("3. Data Protection"),
        bullet("MongoDB Atlas provides built-in encryption at rest for all stored data."),
        bullet("Unique index on the email field prevents creation of duplicate accounts."),
        bullet("Database connection strings, JWT secrets, and email credentials stored as environment variables."),
        bullet("Error messages returned to clients do not expose internal server details."),

        h2("4. Session Management"),
        bullet("Tokens stored in localStorage with client-side cleanup on logout."),
        bullet("Logout process clears token and user data from localStorage and resets application state."),
        bullet("Protected routes redirect unauthenticated users to the login page."),

        // ── PERFORMANCE OPTIMIZATION ──
        h1("Performance Optimization"),

        h2("1. Frontend Performance"),

        h3("1.1 Build Optimization"),
        p("The application is bundled using Vite, which provides fast hot module replacement during development and optimized production builds with tree shaking and code splitting. Assets are minified and compressed for efficient delivery."),

        h3("1.2 Responsive Design"),
        p("The UI is built with Tailwind CSS using a mobile-first approach. Grid layouts adapt from single-column on mobile to multi-column on desktop. The RadialScrollGallery component adjusts its radius from 250px on mobile to 400px on desktop for optimal viewing on any screen size."),

        h3("1.3 Animation Performance"),
        p("Framer Motion animations use GPU-accelerated CSS transforms (translate, scale, opacity) rather than layout-triggering properties. This prevents layout thrashing and ensures smooth 60fps transitions even on mid-range devices."),

        h2("2. Backend Performance"),

        h3("2.1 Database Queries"),
        p("MongoDB indexes on frequently queried fields like status, userName, and the compound equipment identifier ensure that database lookups stay fast even as the data grows. The conflict check query for duplicate reports runs against the compound index, making it essentially instantaneous."),

        h3("2.2 Asynchronous Operations"),
        p("Email sending is handled asynchronously. When a new user registers, the welcome email is dispatched in the background without blocking the API response. This keeps registration response times fast."),

        h3("2.3 Stateless API Design"),
        p("The RESTful API is fully stateless. Authentication state is carried in the JWT token with each request. This means the server doesn't need to maintain session state in memory, allowing it to scale horizontally by simply adding more server instances behind a load balancer."),

        // ── CONCLUSION ──
        h1("Conclusion"),

        p("The Smart Classroom & Lab Electronic Management System successfully provides a centralized platform for managing electronic equipment issues in educational institutions. It addresses a real, everyday problem that most universities deal with but rarely solve properly."),
        p("The system covers the entire lifecycle of an equipment complaint, from the moment a user notices a broken device to the point where an admin resolves the issue and the user sees the response. The conflict prevention mechanism has proven particularly effective in testing, eliminating duplicate reports and keeping the admin queue focused on unique problems."),
        p("On the technical side, the project gave us solid hands-on experience with a modern full-stack development workflow. React with TypeScript on the frontend caught type-related bugs during development. Express on the backend provided a clean and flexible API layer. MongoDB Atlas handled our data storage needs without the overhead of schema migrations. JWT and bcrypt took care of authentication and password security."),
        p("The minimalist UI design with dark and light theme support, combined with smooth Framer Motion animations, delivers a polished user experience that works well across devices. The application is deployed on AWS EC2 and has been tested end-to-end with multiple concurrent users."),
        p("Going forward, we would like to add push notifications for real-time status updates, build a companion mobile app using React Native, implement analytics dashboards with charts showing equipment failure trends, and introduce QR codes on physical equipment for instant reporting. The architecture we've chosen supports all of these additions without major refactoring."),
        p("In summary, this project demonstrates how a focused, well-engineered web application can meaningfully improve institutional operations by replacing manual, error-prone processes with a streamlined digital workflow."),

        // ── REFERENCES ──
        h1("References"),
        gap(),
        num(1, "Facebook. \"React Documentation.\" Meta Platforms, Inc., 2024. Retrieved from: https://react.dev/"),
        p("(Documentation for React, a JavaScript library for building component-based user interfaces)", { noIndent: true, italic: true }),
        gap(),
        num(2, "Microsoft. \"TypeScript Documentation.\" Microsoft, 2024. Retrieved from: https://www.typescriptlang.org/"),
        p("(Documentation for TypeScript, a statically typed superset of JavaScript)", { noIndent: true, italic: true }),
        gap(),
        num(3, "MongoDB. \"MongoDB Documentation.\" MongoDB, Inc., 2024. Retrieved from: https://www.mongodb.com/docs/"),
        p("(Official documentation for MongoDB, a NoSQL database used for storing application data)", { noIndent: true, italic: true }),
        gap(),
        num(4, "Express.js. \"Express Documentation.\" OpenJS Foundation, 2024. Retrieved from: https://expressjs.com/"),
        p("(Documentation for Express, a minimal web application framework for Node.js)", { noIndent: true, italic: true }),
        gap(),
        num(5, "Tailwind CSS. \"Tailwind CSS Documentation.\" Tailwind Labs, 2024. Retrieved from: https://tailwindcss.com/"),
        p("(Documentation for Tailwind CSS, a utility-first CSS framework for building custom interfaces)", { noIndent: true, italic: true }),
        gap(),
        num(6, "Framer. \"Framer Motion Documentation.\" Framer, 2024. Retrieved from: https://www.framer.com/motion/"),
        p("(Documentation for Framer Motion, a production-ready animation library for React)", { noIndent: true, italic: true }),
        gap(),
        num(7, "Vite. \"Vite Documentation.\" Vite, 2024. Retrieved from: https://vitejs.dev/"),
        p("(Documentation for Vite, a next-generation frontend build tool)", { noIndent: true, italic: true }),
        gap(),
        num(8, "Auth0. \"JSON Web Tokens.\" Auth0, 2024. Retrieved from: https://jwt.io/"),
        p("(Information about JWT, a compact and URL-safe means of representing claims between parties)", { noIndent: true, italic: true }),
        gap(),
        num(9, "dcodeIO. \"bcrypt.js.\" 2024. Retrieved from: https://github.com/dcodeIO/bcrypt.js"),
        p("(Documentation for bcryptjs, a library for hashing passwords in JavaScript)", { noIndent: true, italic: true }),
        gap(),
        num(10, "Nodemailer. \"Nodemailer Documentation.\" 2024. Retrieved from: https://nodemailer.com/"),
        p("(Documentation for Nodemailer, a module for Node.js applications to send emails)", { noIndent: true, italic: true }),
        gap(),
        num(11, "Node.js. \"Node.js Documentation.\" OpenJS Foundation, 2024. Retrieved from: https://nodejs.org/"),
        p("(Documentation for Node.js, a JavaScript runtime built on Chrome's V8 engine)", { noIndent: true, italic: true }),
        gap(),
        num(12, "MongoDB Atlas. \"MongoDB Atlas Documentation.\" MongoDB, Inc., 2024. Retrieved from: https://www.mongodb.com/atlas"),
        p("(Documentation for MongoDB Atlas, a fully-managed cloud database service)", { noIndent: true, italic: true }),
        gap(),
        num(13, "AWS. \"Amazon EC2 Documentation.\" Amazon Web Services, 2024. Retrieved from: https://aws.amazon.com/ec2/"),
        p("(Documentation for Amazon EC2, a cloud computing service for deploying applications)", { noIndent: true, italic: true }),
      ],
    },
  ],
});

// ── Generate ──
async function generateDocx() {
  const buffer = await Packer.toBuffer(doc);
  const out = "e:\\SGP\\Technical_Paper_SGP_2025-26_Final.docx";
  fs.writeFileSync(out, buffer);
  console.log("Done:", out, `(${(buffer.length / 1024).toFixed(1)} KB)`);
}
generateDocx().catch(e => { console.error(e); process.exit(1); });

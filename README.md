# Simple Blog

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features user authentication, blog management, reactions system, and responsive UI with modern development tools.

## Current Status

✅ **Backend Complete** - Production-ready API with authentication, blog CRUD, and reactions system  
✅ **Frontend Complete** - Fully functional React application with modern UI and user experience  
✅ **Authentication System** - JWT-based auth with protected routes and user management  
✅ **Blog Management** - Complete CRUD operations with ownership validation  
✅ **User Interface** - Responsive design with Tailwind CSS and DaisyUI components  
🎯 **Production Ready** - Both backend and frontend fully implemented and integrated

## Features

### 🔐 Authentication & User Management
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Protected route middleware and UI protection
- User profile management with password updates
- Public user profiles for blog authors
- Modal-based authentication UI with error handling
- Persistent login sessions with auto-logout

### 📝 Blog Management
- Full CRUD operations for blog posts
- Rich text content with preview functionality
- Like/dislike reactions with toggle functionality
- Ownership validation (only authors can edit/delete)
- Public blog viewing without authentication
- Blog statistics and engagement metrics
- Real-time reaction updates without page refresh

### 🎨 User Interface & Experience
- Responsive design with mobile-first approach
- Modern UI components with DaisyUI
- Dark/light theme support via DaisyUI themes
- Dynamic page titles based on current route
- Loading states and error handling throughout
- Intuitive navigation with breadcrumbs
- Modal dialogs for authentication flows

### ⚡ Technical Features
- RESTful API with proper HTTP methods
- Input validation with express-validator
- Professional MVC architecture
- Clean separation of concerns
- Comprehensive error handling
- API versioning (v1)
- CORS enabled for frontend integration
- Optimized database queries with reactions that don't affect updatedAt
- Custom hooks for document title management
- Service layer pattern for API communication

## Technology Stack

### Backend (Implemented)
- **Runtime**: Node.js v16.20.1+
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB Atlas with Mongoose v8.17.0
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **Security**: CORS enabled
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot reloading

### Frontend (Implemented)
- **Framework**: React 19.1.0 with Vite 7.0.4
- **Build Tool**: Vite with optimized development server and HMR
- **Styling**: Tailwind CSS v4.1.11 with modern syntax and DaisyUI v5.0.50
- **UI Components**: Complete component library with modals, cards, navigation
- **Routing**: React Router v7.7.1 with protected routes and dynamic navigation
- **HTTP Client**: Axios v1.11.0 with interceptors and service layer
- **State Management**: React Context with useReducer for global auth state
- **Custom Hooks**: Document title management and reusable logic
- **TypeScript**: Type definitions included for React components
- **Responsive Design**: Mobile-first approach with Tailwind utilities

## Project Structure

```
simple-blog/
├── backend/                    # Express.js API server
│   ├── config/
│   │   ├── index.js           # Centralized configuration
│   │   └── database.js        # MongoDB connection management
│   ├── src/
│   │   ├── controllers/       # Business logic layer
│   │   │   ├── AuthController.js    # Authentication logic
│   │   │   ├── UserController.js    # User management logic
│   │   │   └── BlogController.js    # Blog CRUD and reactions
│   │   ├── middleware/
│   │   │   ├── auth.js        # JWT authentication middleware
│   │   │   └── index.js       # Middleware aggregation
│   │   ├── models/
│   │   │   ├── User.js        # User schema with password hashing
│   │   │   └── Blog.js        # Blog schema with embedded reactions
│   │   └── routes/
│   │       ├── index.js       # Main router with versioning
│   │       └── v1/            # API v1 routes
│   │           ├── index.js         # v1 API documentation endpoint
│   │           ├── authRoutes.js    # Authentication endpoints
│   │           ├── userRoutes.js    # User management endpoints
│   │           └── blogRoutes.js    # Blog CRUD and reactions
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Dependencies and scripts
│   └── server.js              # Main server file
├── frontend/                  # React client application
│   ├── config/
│   │   └── vite.config.js     # Vite build configuration with Tailwind
│   ├── public/
│   │   └── vite.svg           # Static assets
│   ├── src/
│   │   ├── assets/            # React logo and images
│   │   ├── components/        # Reusable UI components
│   │   │   ├── BlogCard.jsx         # Blog post card component
│   │   │   ├── ErrorMessage.jsx     # Error display component
│   │   │   ├── Loading.jsx          # Loading spinner component
│   │   │   ├── LoginModal.jsx       # Login modal dialog
│   │   │   ├── RegisterModal.jsx    # Registration modal dialog
│   │   │   ├── Modal.jsx            # Base modal component
│   │   │   ├── Navbar.jsx           # Navigation bar component
│   │   │   └── index.js             # Component exports
│   │   ├── context/           # React Context providers
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useDocumentTitle.js  # Dynamic page title hook
│   │   ├── pages/             # Page-level components
│   │   │   ├── Home.jsx             # Landing page with blog list
│   │   │   ├── Login.jsx            # Standalone login page
│   │   │   ├── Register.jsx         # Standalone registration page
│   │   │   ├── blog/                # Blog-related pages
│   │   │   │   ├── BlogDetail.jsx   # Individual blog post view
│   │   │   │   ├── CreateBlog.jsx   # Blog creation form
│   │   │   │   ├── EditBlog.jsx     # Blog editing form
│   │   │   │   └── MyBlogs.jsx      # User's blog management
│   │   │   └── user/                # User-related pages
│   │   │       ├── Profile.jsx      # User profile management
│   │   │       └── UserProfile.jsx  # Public user profile view
│   │   ├── routes/            # Application routing
│   │   │   └── AppRoutes.jsx        # Main routing configuration
│   │   ├── services/          # API service layer
│   │   │   ├── api.js               # Axios configuration and interceptors
│   │   │   ├── authService.js       # Authentication API calls
│   │   │   ├── blogService.js       # Blog-related API calls
│   │   │   ├── userService.js       # User management API calls
│   │   │   └── index.js             # Service exports
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main React component with routing
│   │   ├── main.jsx           # React application entry point
│   │   └── index.css          # Tailwind v4 + DaisyUI configuration
│   ├── .eslintrc.js           # ESLint configuration for React
│   ├── package.json           # Frontend dependencies and scripts
│   └── package-lock.json      # Dependency lock file
├── API_DOCUMENTATION.md       # Complete API documentation
├── ROADMAP.md                 # Development roadmap
├── 4-HOUR-SPRINT.md          # Sprint implementation guide
└── README.md                  # This file
```

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed and set up:

**Required Software:**
- **Node.js** (v16.20.1 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/) for cloning the repository

**Required Services:**
- **MongoDB Atlas account** ([Setup Guide](./MONGODB_SETUP.md)) - Free cloud database

**Development Tools (Recommended):**
- **VS Code** or your preferred code editor
- **Postman** or similar API testing tool
- **MongoDB Compass** (optional) - GUI for MongoDB

**System Requirements:**
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 1GB free space
- **Network**: Internet connection for MongoDB Atlas and package downloads

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jetsaguirel/simple-blog.git
   cd simple-blog
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

### Environment Configuration

1. **Backend Environment Setup**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure Environment Variables**
   
   > 📋 **Need help setting up MongoDB Atlas?** Follow our [MongoDB Atlas Setup Guide](./MONGODB_SETUP.md)
   
   Edit the `.env` file with your MongoDB Atlas credentials:
   ```bash
   # Server Configuration
   PORT=5000                    # Server port (default: 5000)
   NODE_ENV=development        # Environment: development or production
   
   # API Configuration
   API_VERSION=v1              # API version (v1, v2 when available)
   
   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@simple-blog.xxxxx.mongodb.net
   DB_NAME=simple-blog         # Database name
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

3. **Generate a Secure JWT Secret**
   
   For security, you need to generate a strong, random JWT secret. Use one of these methods:
   
   **Method 1: Using Node.js (Recommended)**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   
   **Method 2: Using OpenSSL (if available)**
   ```bash
   openssl rand -hex 64
   ```
   
   **Method 3: Using PowerShell**
   ```powershell
   -join ((1..128) | ForEach {[char][int]((65..90)+(97..122)+(48..57) | Get-Random)})
   ```
   
   Copy the generated string and replace `your-super-secret-jwt-key-here` in your `.env` file.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev          # Development mode with auto-restart
   # or
   npm start           # Production mode
   ```

2. **Verify Backend is Running**
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api/v1
   - Health Check: http://localhost:5000/health

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm install         # Install frontend dependencies
   npm run dev         # Start Vite development server
   ```

4. **Verify Frontend is Running**
   - Frontend Application: http://localhost:5174
   - Full blog application with authentication, blog management, and user profiles
   - Features live reload and HMR (Hot Module Replacement)
   - Should display the Simple Blog homepage with authentication modals

### Application Features

**User Authentication:**
- Register new account via modal or standalone page
- Login with existing credentials
- Persistent sessions with automatic token management
- Protected routes requiring authentication
- User profile management and password updates

**Blog Management:**
- View all blogs on the homepage (public access)
- Create new blog posts (authenticated users)
- Edit and delete own blog posts
- Like/dislike blog posts (authenticated users)
- View individual blog posts with full content
- Blog statistics and engagement metrics

**User Interface:**
- Responsive design that works on mobile and desktop
- Dark/light theme support via DaisyUI
- Dynamic page titles that change based on current page
- Loading states and error handling throughout the app
- Modal dialogs for authentication flows
- Breadcrumb navigation for better UX

### Frontend Development Features

**Modern Development Stack:**
- ⚡ **Vite**: Lightning-fast development server with instant HMR
- 🎨 **Tailwind CSS v4**: Latest version with modern `@import` syntax and utility classes
- 🧩 **DaisyUI**: Pre-built components with semantic class names and theme support
- ⚛️ **React 19**: Latest React with optimized rendering and concurrent features
- 🛣️ **React Router v7**: Client-side routing with protected routes implemented
- 🔄 **Axios**: HTTP client with interceptors and service pattern
- 🎯 **Custom Hooks**: Reusable logic for document titles and other features

**Implementation Highlights:**
- Complete authentication flow with JWT token management
- Protected routes that redirect to authentication when needed
- Service layer pattern for all API communications
- Custom hooks for document title management
- Modal-based authentication UI with error handling
- Responsive design that works on all screen sizes
- Real-time updates for blog reactions
- Comprehensive error handling and loading states

**Available Scripts:**
```bash
npm run dev      # Start development server (http://localhost:5174)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint for code quality
```

**Key Application Pages:**
- **Home** (`/`) - Blog listing with authentication options
- **Blog Detail** (`/blog/:id`) - Individual blog post with reactions
- **Create Blog** (`/create-blog`) - Blog creation form (protected)
- **Edit Blog** (`/edit-blog/:id`) - Blog editing (protected, owner only)
- **My Blogs** (`/my-blogs`) - User's blog management (protected)
- **Profile** (`/profile`) - User profile management (protected)
- **User Profile** (`/user/:id`) - Public user profile pages

## API Endpoints

### Quick Reference

**Base URL:** `http://localhost:5000/api/v1`

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

#### User Management
- `GET /users/profile` - Get own profile (protected)
- `PUT /users/profile` - Update profile (protected)
- `GET /users/:id` - Get public user profile

#### Blog Management
- `GET /blogs` - Get all blogs (public)
- `GET /blogs/:id` - Get single blog (public)
- `POST /blogs` - Create blog (protected)
- `PUT /blogs/:id` - Update blog (protected, owner only)
- `DELETE /blogs/:id` - Delete blog (protected, owner only)
- `POST /blogs/:id/like` - Like/unlike blog (protected)
- `POST /blogs/:id/dislike` - Dislike/remove dislike (protected)

📚 **Complete API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
   DB_NAME=simple-blog         # Base database name
   ```

## Testing the API

### Using curl

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create a blog post:**
```bash
curl -X POST http://localhost:5000/api/v1/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post..."
  }'
```

### Using Postman

1. Import the API endpoints from the documentation
2. Set base URL to `http://localhost:5000/api/v1`
3. For protected routes, add Authorization header: `Bearer YOUR_JWT_TOKEN`

## Frontend Configuration

The frontend is configured with a modern React development stack optimized for productivity and performance.

### Tailwind CSS v4 Setup

**Configuration File:** `frontend/src/index.css`
```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  --color-primary: oklch(0.7 0.15 142);
  --color-primary-content: oklch(1 0 0);
  --color-secondary: oklch(0.7 0.15 250);
  /* Custom theme colors using OKLCH color space */
}
```

### Vite Configuration

**Configuration File:** `frontend/config/vite.config.js`
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
});
```

### Key Dependencies

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "axios": "^1.7.9",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router": "^7.7.1",
    "tailwindcss": "^4.1.11"
  },
  "devDependencies": {
    "daisyui": "^5.0.50",
    "vite": "^7.0.4"
  }
}
```

### Development Workflow

1. **Component Development**: Use DaisyUI components with Tailwind utilities
2. **Hot Reloading**: Instant updates on file changes via Vite HMR
3. **Styling**: Utility-first CSS with semantic component classes
4. **Type Safety**: TypeScript definitions for React components
5. **Code Quality**: ESLint configuration for React best practices

**Example Component Usage:**
```jsx
// Using DaisyUI components with Tailwind classes
<div className="card bg-base-200 shadow-xl">
  <div className="card-body">
    <button className="btn btn-primary">
      Click me
    </button>
  </div>
</div>
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User, required),
  likes: [ObjectId] (ref: User),
  dislikes: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Development Status

### ✅ Completed Features
- [x] User authentication with JWT
- [x] User registration and login
- [x] Password hashing with bcryptjs
- [x] User profile management with password confirmation
- [x] Blog CRUD operations
- [x] Like/dislike reactions system (without affecting updatedAt)
- [x] Ownership validation for blog operations
- [x] Input validation and error handling
- [x] MVC architecture pattern
- [x] API documentation
- [x] React frontend with modern development stack
- [x] Authentication UI with modal and standalone forms
- [x] Blog management interface with full CRUD
- [x] User profile pages (both own and public profiles)
- [x] Responsive design with Tailwind CSS and DaisyUI
- [x] API integration with Axios service layer
- [x] Protected routing and navigation
- [x] Dynamic page titles and document management
- [x] Real-time reactions without page refresh
- [x] Comprehensive error handling and loading states

### 🎯 Production Ready
- [x] Backend API fully implemented and tested
- [x] Frontend application complete with all core features
- [x] Database integration with MongoDB Atlas
- [x] Authentication and authorization working end-to-end
- [x] Responsive UI that works on all device sizes
- [x] Error handling and user feedback systems
- [x] Performance optimizations (reactions don't update blog timestamps)
- [x] Code organization following best practices

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [MongoDB Setup Guide](./MONGODB_SETUP.md) - Database setup instructions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [API Documentation](./API_DOCUMENTATION.md)
2. Review the [MongoDB Setup Guide](./MONGODB_SETUP.md)
3. Open an issue on GitHub
4. Check existing issues for solutions
- Production: `simple-blog-production`

**Database Features:**
- Automatic connection management
- Connection pooling (max 10 connections)
- Environment-aware database selection
- Graceful error handling
- Connection status monitoring

## Development

### Backend Architecture

The backend follows a modular architecture pattern:

- **Configuration**: Centralized config management with environment variables and database connection
- **Database**: MongoDB Atlas integration with Mongoose ODM and environment separation
- **Middleware**: Custom middleware for logging, error handling, and request processing
- **Routing**: Versioned API routes with clear separation of concerns
- **Controllers**: Business logic separated from route definitions (planned)
- **Models**: Mongoose database models and schema definitions
- **Utils**: Shared utility functions and helpers

### Technology Stack

**Backend:**
- **Runtime**: Node.js v16.20.1+
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB Atlas
- **ODM**: Mongoose v8.17.0
- **Environment**: dotenv v17.2.1
- **Development**: nodemon v3.1.10

## Scripts

### Backend Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with auto-restart
npm test       # Run tests (to be implemented)
```

## License

This project is licensed under the MIT License.

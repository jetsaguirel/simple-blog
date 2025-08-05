# Simple Blog

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features user authentication, blog management, and user profile with a MVC architecture.

## Current Status

✅ **Backend Complete** - Production-ready API with authentication, blog CRUD, and reactions system  
🔄 **Frontend Pending** - React application to be implemented next

## Features

### Authentication & User Management
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Protected route middleware
- User profile management with password updates
- Public user profiles for blog authors

### Blog Management
- Full CRUD operations for blog posts
- Like/dislike reactions with toggle functionality
- Ownership validation (only authors can edit/delete)
- Public blog viewing without authentication
- Embedded reactions system for performance

### Technical Features
- RESTful API with proper HTTP methods
- Input validation with express-validator
- Professional MVC architecture
- Clean separation of concerns
- Comprehensive error handling
- API versioning (v1)
- CORS enabled for frontend integration

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

### Frontend (Planned)
- **Framework**: React 18+
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context + useReducer
- **Styling**: CSS Modules or Styled Components

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
├── frontend/                  # React client (to be implemented)
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
- [x] User profile management
- [x] Blog CRUD operations
- [x] Like/dislike reactions system
- [x] Ownership validation
- [x] Input validation
- [x] Error handling
- [x] MVC architecture
- [x] API documentation

### 🔄 In Progress
- [ ] Frontend React application
- [ ] User interface components
- [ ] State management
- [ ] API integration

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

# Simple Blog

A full-stack blog application built with modern web technologies. Features a professional Node.js/Express.js backend with MongoDB Atlas integration, environment-aware configuration, and scalable architecture designed for production use.

## Project Structure

```
simple-blog/
├── backend/          # Express.js API server with MongoDB
│   ├── config/       # Configuration and database connection
│   │   ├── index.js      # Centralized configuration
│   │   └── database.js   # MongoDB connection management
│   ├── src/
│   │   ├── controllers/  # Business logic (planned)
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose database models
│   │   ├── routes/       # API routes (versioned)
│   │   └── utils/        # Utility functions
│   ├── .env.example      # Environment variables template
│   ├── package.json      # Dependencies and scripts
│   ├── README.md         # Backend documentation
│   └── server.js         # Main server file
└── frontend/         # Frontend client (coming soon)
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

### Installation

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
   DB_NAME=simple-blog         # Base database name
   ```

   **Required Environment Variables:**
   - `PORT`: Server port number (default: 5000)
   - `NODE_ENV`: Application environment (development/production)
   - `API_VERSION`: API version for routing (currently v1)
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `DB_NAME`: Base database name (automatically appends environment)

## Running the Application

### Backend Server

**Development Mode** (with auto-restart):
```bash
cd backend
npm run dev
```

**Production Mode**:
```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000` by default.

### Frontend Client *(coming soon)*

```bash
cd frontend
npm start
```

## API Documentation

### Current Backend Features

- **Express.js v5.1.0** - Modern web framework with enhanced performance
- **MongoDB Atlas Integration** - Cloud database with automatic environment separation
- **Environment Configuration** - Clean development/production separation
- **Database Connection Management** - Automatic connection handling with status monitoring
- **Health Monitoring** - Database status and server health checks
- **API Versioning** - Structured API routing (`/api/v1`)
- **Request Logging** - Comprehensive request/response logging
- **Error Handling** - Professional error handling middleware
- **Modular Architecture** - Scalable code organization

### Available Endpoints

**Server Information:**
- `GET /` - Server status and API information
- `GET /health` - Health check with database connection status

**API Overview:**
- `GET /api` - Available API versions
- `GET /api/v1` - V1 API documentation

### Database

**Environment-Specific Databases:**
- Development: `simple-blog-development`
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

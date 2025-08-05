# Simple Blog

A full-stack blog application built with Node.js and Express. Currently features a modular backend architecture with API versioning, middleware, and structured organization.

## Project Structure

```
simple-blog/
├── backend/          # Express.js API server
│   ├── config/       # Configuration files
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes (versioned)
│   │   └── utils/        # Utility functions
│   ├── .env.example      # Environment variables template
│   ├── package.json      # Dependencies and scripts
│   └── server.js         # Main server file
└── frontend/         # Frontend client (coming soon)
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

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
   
   Edit the `.env` file with your specific values:
   ```bash
   # Server Configuration
   PORT=5000                    # Server port (default: 5000)
   NODE_ENV=development        # Environment: development or production
   
   # API Configuration
   API_VERSION=v1              # API version (v1, v2 when available)
   ```

   **Required Environment Variables:**
   - `PORT`: Server port number (default: 5000)
   - `NODE_ENV`: Application environment (development/production)
   - `API_VERSION`: API version for routing (currently v1)

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

- Express.js v5.1.0 server with modular architecture
- Environment-based configuration management
- API versioning (`/api/v1`)
- Request logging middleware
- Error handling middleware
- Health check endpoints
- Structured folder organization

### Available Endpoints

**Server Information:**
- `GET /` - Server status and API information
- `GET /health` - Health check endpoint

**API Overview:**
- `GET /api` - Available API versions
- `GET /api/v1` - V1 API documentation

## Development

### Backend Architecture

The backend follows a modular architecture pattern:

- **Configuration**: Centralized config management with environment variables
- **Middleware**: Custom middleware for logging, error handling, and request processing
- **Routing**: Versioned API routes with clear separation of concerns
- **Controllers**: Business logic separated from route definitions
- **Models**: Database models and schema definitions
- **Utils**: Shared utility functions and helpers

### Technology Stack

**Backend:**
- Express.js v5.1.0 - Web framework
- dotenv v17.2.1 - Environment variable management
- nodemon v3.1.10 - Development auto-restart

## Scripts

### Backend Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with auto-restart
npm test       # Run tests (to be implemented)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

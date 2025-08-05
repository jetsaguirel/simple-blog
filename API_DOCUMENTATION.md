# Simple Blog API Documentation

## Overview

RESTful API for a blog application built with Express.js, MongoDB, and JWT authentication. The API supports user authentication, blog management, and social interactions (like/dislike system).

**Base URL:** `http://localhost:5000/api/v1`  
**Authentication:** JWT Bearer Token  
**Content-Type:** `application/json`

---

## Authentication

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User registered successfully"
}
```

**Validation:**
- `name`: minimum 2 characters
- `email`: valid email format
- `password`: minimum 6 characters

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Login successful"
}
```

---

### Get Current User
**GET** `/auth/me`

Get information about the currently authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## User Management

### Get User Profile
**GET** `/users/profile`

Get the current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-06T10:30:00.000Z",
    "updatedAt": "2025-08-06T10:30:00.000Z"
  }
}
```

---

### Update User Profile
**PUT** `/users/profile`

Update user profile information and/or password.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "updatedAt": "2025-08-06T11:30:00.000Z"
  },
  "message": "Profile updated successfully"
}
```

**Validation:**
- `name`: minimum 2 characters (optional)
- `email`: valid email format (optional)
- `currentPassword`: required if updating password
- `newPassword`: minimum 6 characters (optional)

---

### Get Public User Profile
**GET** `/users/:id`

Get public information about any user (for viewing blog authors).

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-08-06T10:30:00.000Z"
  }
}
```

---

## Blog Management

### Get All Blogs
**GET** `/blogs`

Retrieve all blog posts (public endpoint).

**Response:**
```json
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "My First Blog Post",
      "content": "This is the content of my blog post...",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "likes": ["507f1f77bcf86cd799439013"],
      "dislikes": [],
      "likeCount": 1,
      "dislikeCount": 0,
      "createdAt": "2025-08-06T10:30:00.000Z",
      "updatedAt": "2025-08-06T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Blog
**GET** `/blogs/:id`

Retrieve a specific blog post by ID (public endpoint).

**Response:**
```json
{
  "blog": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "likes": ["507f1f77bcf86cd799439013"],
    "dislikes": [],
    "likeCount": 1,
    "dislikeCount": 0,
    "createdAt": "2025-08-06T10:30:00.000Z",
    "updatedAt": "2025-08-06T10:30:00.000Z"
  }
}
```

---

### Create Blog Post
**POST** `/blogs`

Create a new blog post (authentication required).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "This is the content of my new blog post..."
}
```

**Response:**
```json
{
  "blog": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My New Blog Post",
    "content": "This is the content of my new blog post...",
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "likes": [],
    "dislikes": [],
    "likeCount": 0,
    "dislikeCount": 0,
    "createdAt": "2025-08-06T10:30:00.000Z",
    "updatedAt": "2025-08-06T10:30:00.000Z"
  },
  "message": "Blog created successfully"
}
```

**Validation:**
- `title`: required, minimum 1 character
- `content`: required, minimum 1 character

---

### Update Blog Post
**PUT** `/blogs/:id`

Update an existing blog post (authentication required, owner only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content..."
}
```

**Response:**
```json
{
  "blog": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Blog Title",
    "content": "Updated blog content...",
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "likes": [],
    "dislikes": [],
    "likeCount": 0,
    "dislikeCount": 0,
    "createdAt": "2025-08-06T10:30:00.000Z",
    "updatedAt": "2025-08-06T11:30:00.000Z"
  },
  "message": "Blog updated successfully"
}
```

**Validation:**
- `title`: optional, minimum 1 character if provided
- `content`: optional, minimum 1 character if provided

---

### Delete Blog Post
**DELETE** `/blogs/:id`

Delete a blog post (authentication required, owner only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Blog deleted successfully"
}
```

---

## Reactions System

### Like Blog Post
**POST** `/blogs/:id/like`

Like or unlike a blog post (authentication required).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "likeCount": 1,
  "dislikeCount": 0,
  "userReaction": "like",
  "message": "Blog liked"
}
```

**Behavior:**
- If user hasn't reacted: adds like
- If user already liked: removes like
- If user disliked: removes dislike and adds like

---

### Dislike Blog Post
**POST** `/blogs/:id/dislike`

Dislike or remove dislike from a blog post (authentication required).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "likeCount": 0,
  "dislikeCount": 1,
  "userReaction": "dislike",
  "message": "Blog disliked"
}
```

**Behavior:**
- If user hasn't reacted: adds dislike
- If user already disliked: removes dislike
- If user liked: removes like and adds dislike

---

## Error Responses

### Validation Errors
**Status:** `400 Bad Request`
```json
{
  "errors": [
    {
      "msg": "Name must be at least 2 characters",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
**Status:** `401 Unauthorized`
```json
{
  "error": "No token, authorization denied"
}
```

### Authorization Errors
**Status:** `403 Forbidden`
```json
{
  "error": "Not authorized to update this blog"
}
```

### Not Found Errors
**Status:** `404 Not Found`
```json
{
  "error": "Blog not found"
}
```

### Server Errors
**Status:** `500 Internal Server Error`
```json
{
  "error": "Server error while creating blog"
}
```

---

## Models

### User Model
```javascript
{
  _id: ObjectId,
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
  _id: ObjectId,
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User, required),
  likes: [ObjectId] (ref: User),
  dislikes: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Successful GET, PUT |
| 201 | Created - Successful POST |
| 400 | Bad Request - Validation errors |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production use.

---

## CORS

CORS is enabled for all origins. Configure specific origins for production.

---

## Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints. Make sure to include the JWT token in the Authorization header for protected routes.

**Example curl request:**
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer your_jwt_token_here"
```

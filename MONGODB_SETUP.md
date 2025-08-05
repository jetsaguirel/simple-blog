# MongoDB Atlas Setup Guide

This guide will walk you through setting up a MongoDB Atlas account and configuring it for the Simple Blog application.

## What is MongoDB Atlas?

MongoDB Atlas is a fully-managed cloud database service that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS, Azure, and GCP).

## Prerequisites

- A valid email address
- Internet connection

## Step-by-Step Setup

### 1. Create MongoDB Atlas Account

1. **Visit MongoDB Atlas**
   - Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" or "Get Started Free"

2. **Sign Up**
   - Fill in your details:
     - First Name
     - Last Name
     - Email Address
     - Password
   - Click "Create your Atlas account"

3. **Verify Email**
   - Check your email for a verification message
   - Click the verification link

### 2. Create Your First Cluster

1. **Choose Deployment Type**
   - Select "Build a Database"
   - Choose "M0 Sandbox" (Free tier)
   - Click "Create"

2. **Cloud Provider & Region**
   - **Provider**: Choose AWS, Google Cloud, or Azure
   - **Region**: Select the region closest to your users
   - **Cluster Tier**: M0 Sandbox (Free)
   - **Cluster Name**: `simple-blog`
   - Click "Create Cluster"

### 3. Configure Database Access

1. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - **Authentication Method**: Password
   - **Username**: Choose a username (e.g., `bloguser`)
   - **Password**: Generate secure password or create your own
   - **Database User Privileges**: Select "Read and write to any database"
   - Click "Add User"

   > 💡 **Important**: Save these credentials! You'll need them for your `.env` file.

### 4. Configure Network Access

1. **Add IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - **For Development**: Click "Add Current IP Address"
   - **For Production**: Add specific IP addresses
   - **For Testing**: You can temporarily use "Allow Access from Anywhere" (0.0.0.0/0)
   - Add a comment like "Development Machine"
   - Click "Confirm"

   > ⚠️ **Security Note**: For production, always use specific IP addresses, never "Allow Access from Anywhere"

### 5. Get Connection String

1. **Connect to Cluster**
   - Go to "Database" in the left sidebar
   - Find your cluster and click "Connect"
   - Select "Connect your application"
   - **Driver**: Node.js
   - **Version**: Select latest version
   - Copy the connection string

2. **Connection String Format**
   ```
   mongodb+srv://<username>:<password>@simple-blog.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Configure Your Application

1. **Update .env File**
   ```bash
   # Replace with your actual connection string
   MONGODB_URI=mongodb+srv://bloguser:your-password@simple-blog.xxxxx.mongodb.net
   DB_NAME=simple-blog
   ```

2. **Replace Placeholders**
   - `<username>`: Your database username
   - `<password>`: Your database password
   - `xxxxx`: Your cluster identifier (automatically generated)

## Environment-Specific Setup

### Development Environment
```bash
NODE_ENV=development
```

### Production Environment
```bash
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify username and password in connection string
   - Check if user has proper database permissions
   - Ensure password doesn't contain special characters that need URL encoding

2. **Connection Timeout**
   - Check IP whitelist in Network Access
   - Verify internet connection
   - Check firewall settings

3. **Database Not Found**
   - Verify database name in connection string
   - Check if database user has access to the specific database

### URL Encoding Special Characters

If your password contains special characters, encode them:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `[` → `%5B`
- `]` → `%5D`

Example:
```bash
# Original password: myP@ssw0rd!
# Encoded password: myP%40ssw0rd!
MONGODB_URI=mongodb+srv://user:myP%40ssw0rd!@cluster.xxxxx.mongodb.net
```

## Useful Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [MongoDB Atlas Security](https://docs.atlas.mongodb.com/security/)
- [MongoDB Atlas Pricing](https://www.mongodb.com/pricing)

---

**Next Step**: After completing this setup, return to the main [README.md](./README.md) to continue with the application setup.

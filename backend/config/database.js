const mongoose = require('mongoose');
const config = require('./index');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(config.database.uri, config.database.options);
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Environment: ${config.nodeEnv}`);
    
    await checkDatabaseStatus();

  } catch (error) {
    console.error('Database connection failed:', error.message);
    isConnected = false;
    
    if (config.isProduction()) {
      process.exit(1);
    }
    
    console.log('Continuing without database connection in development mode');
  }
};

const checkDatabaseStatus = async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log(`Database is empty - collections will be created automatically when models are used`);
    } else {
      console.log(`Found ${collections.length} existing collections:`, 
                  collections.map(c => c.name).join(', '));
    }
  } catch (error) {
    console.log('Could not check database status:', error.message);
  }
};

const getConnectionStatus = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
};

module.exports = {
  connectDB,
  getConnectionStatus
};

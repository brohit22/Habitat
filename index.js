import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { app } from './app.js';

// Load environment variables from the ".env" file
dotenv.config({ path: './env' });

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Set up error handling for the Express app
    app.on('error', (err) => {
      console.error('ERROR:', err);
      throw err;
    });

    // Start the Express app and listen on the specified port or default to 8000
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    // Log an error message if the MongoDB connection fails
    console.log('MONGODB connection failed:', err);
  });

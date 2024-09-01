import app from './app.js';
import mongoose from 'mongoose';

const { MONGO_URI, PORT = 3000 } = process.env;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
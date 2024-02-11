const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
    `mongodb+srv://ayoubzouiine:${process.env.DB__PWD}@cluster0.agywqy6.mongodb.net/ChatDb?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
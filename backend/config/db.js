const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Attempting DB connection...");

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,   // 🔥 force IPv4
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
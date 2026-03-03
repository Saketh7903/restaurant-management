require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();


app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Backend API is running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
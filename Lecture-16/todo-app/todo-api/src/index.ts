import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cookieParser()); // This specific middleware parses Cookies
app.use(cors({
  origin: "*",         // This makes the Express server except request from other domains
  credentials: true    // Allows cookies sent to this API
}));        


// Routes
import todoRouter from './routes/todos'
import subtaskRouter from './routes/subtasks'
import authRouter from './routes/auth'
app.use('/todos', todoRouter)
app.use('/subtasks', subtaskRouter)
app.use('/auth', authRouter)


// Connect To DB
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

import 'dotenv/config'
import express from 'express';
import cors from 'cors'
// import { connectToDatabase } from './config/db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains


// Routes
import todoRouter from './routes/todos'
app.use('/todos', todoRouter)


// Connect To DB
// connectToDatabase();
// Start the express server
// const PORT = 3000
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`)
// })

async function main() {
  try {
    const PORT = 3000
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error('Error starting server:', e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

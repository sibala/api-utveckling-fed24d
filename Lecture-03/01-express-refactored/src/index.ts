import express from 'express';
import cors from 'cors'
const app = express();


// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains


// Routes
import malin from './routes/todos'
app.use('/todos', malin)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

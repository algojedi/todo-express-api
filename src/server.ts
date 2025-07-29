import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';
import { rootRoute } from './routes/rootRoute';
import cors from 'cors';
import logger from './services/logger';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// Pipe Morgan logs into Winston
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

// Use Morgan middleware
app.use(morgan('combined', { stream }));



// Root endpoint
app.get('/', rootRoute);

// API routes
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`🚀 Todo API server is running on port ${PORT}`);
  logger.info(`📖 API Documentation: http://localhost:${PORT}`);
  logger.info(`🔗 Todo endpoints: http://localhost:${PORT}/api/todos`);
});



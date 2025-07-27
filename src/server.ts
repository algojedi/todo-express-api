import express from 'express';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';
import { rootRoute } from './routes/rootRoute';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', rootRoute);

// API routes
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Todo API server is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}`);
  console.log(`🔗 Todo endpoints: http://localhost:${PORT}/api/todos`);
});

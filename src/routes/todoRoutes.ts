import { Router } from 'express';
import todoController from '../controllers/todoController';

const router = Router();

// GET /api/todos - Get all todos
router.get('/', todoController.getAllTodos);

// GET /api/todos/status?status=completed - Get todos by status
router.get('/status', todoController.getTodosByStatus);

// GET /api/todos/search?q=searchterm - Search todos
router.get('/search', todoController.searchTodos);

// GET /api/todos/:id - Get todo by ID
router.get('/:id', todoController.getTodoById);

// POST /api/todos - Create a new todo
router.post('/', todoController.createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/:id', todoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', todoController.deleteTodo);

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', todoController.toggleTodo);

export default router;


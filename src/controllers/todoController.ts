import { Request, Response } from 'express';
import TodoService from '../services/TodoService';
import { CreateTodoData, UpdateTodoData } from '../types/todo';
import { ApiResponse } from '../types/api';

export class TodoController {
  // Get all todos
  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await TodoService.getAllTodos();
      const response: ApiResponse = {
        success: true,
        data: todos,
        count: todos.length,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Failed to fetch todos',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  // Get todo by ID
  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await TodoService.getTodoById(id);

      const response: ApiResponse = {
        success: true,
        data: todo,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message:
          error instanceof Error && error.message === 'Todo not found'
            ? 'Todo not found'
            : 'Failed to fetch todo',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res
        .status(
          error instanceof Error && error.message === 'Todo not found'
            ? 404
            : 500,
        )
        .json(response);
    }
  }

  // Create a new todo
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, description }: CreateTodoData = req.body;
      const newTodo = await TodoService.createTodo({ title, description });

      const response: ApiResponse = {
        success: true,
        message: 'Todo created successfully',
        data: newTodo,
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message:
          error instanceof Error && error.message === 'Title is required'
            ? 'Title is required'
            : 'Failed to create todo',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res
        .status(
          error instanceof Error && error.message === 'Title is required'
            ? 400
            : 500,
        )
        .json(response);
    }
  }

  // Update a todo
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTodoData = req.body;
      const updatedTodo = await TodoService.updateTodo(id, updateData);

      const response: ApiResponse = {
        success: true,
        message: 'Todo updated successfully',
        data: updatedTodo,
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const isValidationError =
        errorMessage === 'At least one field must be provided for update' ||
        errorMessage === 'Title cannot be empty';
      const isNotFoundError = errorMessage === 'Todo not found';

      const response: ApiResponse = {
        success: false,
        message:
          isValidationError || isNotFoundError
            ? errorMessage
            : 'Failed to update todo',
        error: errorMessage,
      };
      res
        .status(isValidationError ? 400 : isNotFoundError ? 404 : 500)
        .json(response);
    }
  }

  // Delete a todo
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await TodoService.deleteTodo(id);

      const response: ApiResponse = {
        success: true,
        message: 'Todo deleted successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message:
          error instanceof Error && error.message === 'Todo not found'
            ? 'Todo not found'
            : 'Failed to delete todo',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res
        .status(
          error instanceof Error && error.message === 'Todo not found'
            ? 404
            : 500,
        )
        .json(response);
    }
  }

  // Toggle todo completion status
  async toggleTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const toggledTodo = await TodoService.toggleTodo(id);

      const response: ApiResponse = {
        success: true,
        message: `Todo ${
          toggledTodo.completed ? 'completed' : 'uncompleted'
        } successfully`,
        data: toggledTodo,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message:
          error instanceof Error && error.message === 'Todo not found'
            ? 'Todo not found'
            : 'Failed to toggle todo',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res
        .status(
          error instanceof Error && error.message === 'Todo not found'
            ? 404
            : 500,
        )
        .json(response);
    }
  }

  // Get todos by status
  async getTodosByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;
      const completed = status === 'completed';
      const todos = await TodoService.getTodosByStatus(completed);

      const response: ApiResponse = {
        success: true,
        data: todos,
        count: todos.length,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Failed to fetch todos by status',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  // Search todos
  async searchTodos(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        const response: ApiResponse = {
          success: false,
          message: 'Search query is required',
        };
        res.status(400).json(response);
        return;
      }

      const todos = await TodoService.searchTodosByTitle(q);
      const response: ApiResponse = {
        success: true,
        data: todos,
        count: todos.length,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Failed to search todos',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }
}

export default new TodoController();

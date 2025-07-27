import TodoRepository from '../repositories/TodoRepository';
import { Todo, CreateTodoData, UpdateTodoData } from '../types/todo';

export class TodoService {
  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    try {
      return await TodoRepository.findAll();
    } catch (error) {
      throw new Error('Failed to fetch todos from database');
    }
  }

  // Get todo by ID
  async getTodoById(id: string): Promise<Todo> {
    try {
      const todo = await TodoRepository.findById(id);
      if (!todo) {
        throw new Error('Todo not found');
      }
      return todo;
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        throw error;
      }
      throw new Error('Failed to fetch todo from database');
    }
  }

  // Create a new todo
  async createTodo(data: CreateTodoData): Promise<Todo> {
    try {
      // Validate input data
      if (!data.title || data.title.trim() === '') {
        throw new Error('Title is required');
      }

      // Trim whitespace from inputs
      const cleanData = {
        title: data.title.trim(),
        description: data.description?.trim() || '',
      };

      return await TodoRepository.create(cleanData);
    } catch (error) {
      if (error instanceof Error && error.message === 'Title is required') {
        throw error;
      }
      throw new Error('Failed to create todo in database');
    }
  }

  // Update a todo
  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    try {
      // Validate that at least one field is provided
      if (Object.keys(data).length === 0) {
        throw new Error('At least one field must be provided for update');
      }

      // Validate title if provided
      if (data.title !== undefined && data.title.trim() === '') {
        throw new Error('Title cannot be empty');
      }

      // Clean the data
      const cleanData: UpdateTodoData = {};
      if (data.title !== undefined) {
        cleanData.title = data.title.trim();
      }
      if (data.description !== undefined) {
        cleanData.description = data.description.trim();
      }
      if (data.completed !== undefined) {
        cleanData.completed = data.completed;
      }

      const updatedTodo = await TodoRepository.update(id, cleanData);
      if (!updatedTodo) {
        throw new Error('Todo not found');
      }

      return updatedTodo;
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === 'Todo not found' ||
          error.message === 'At least one field must be provided for update' ||
          error.message === 'Title cannot be empty')
      ) {
        throw error;
      }
      throw new Error('Failed to update todo in database');
    }
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    try {
      const deleted = await TodoRepository.delete(id);
      if (!deleted) {
        throw new Error('Todo not found');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        throw error;
      }
      throw new Error('Failed to delete todo from database');
    }
  }

  // Toggle todo completion status
  async toggleTodo(id: string): Promise<Todo> {
    try {
      const toggledTodo = await TodoRepository.toggle(id);
      if (!toggledTodo) {
        throw new Error('Todo not found');
      }
      return toggledTodo;
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        throw error;
      }
      throw new Error('Failed to toggle todo in database');
    }
  }

  // Check if todo exists
  async todoExists(id: string): Promise<boolean> {
    try {
      return await TodoRepository.exists(id);
    } catch (error) {
      throw new Error('Failed to check todo existence');
    }
  }

  // Get todos by completion status
  async getTodosByStatus(completed: boolean): Promise<Todo[]> {
    try {
      const allTodos = await TodoRepository.findAll();
      return allTodos.filter((todo) => todo.completed === completed);
    } catch (error) {
      throw new Error('Failed to fetch todos by status');
    }
  }

  // Search todos by title
  async searchTodosByTitle(searchTerm: string): Promise<Todo[]> {
    try {
      const allTodos = await TodoRepository.findAll();
      const lowerSearchTerm = searchTerm.toLowerCase();
      return allTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(lowerSearchTerm) ||
          todo.description?.toLowerCase().includes(lowerSearchTerm),
      );
    } catch (error) {
      throw new Error('Failed to search todos');
    }
  }
}

export default new TodoService();

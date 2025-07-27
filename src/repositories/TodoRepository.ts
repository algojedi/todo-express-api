import Database from '../db/Database';
import { Todo, CreateTodoData, UpdateTodoData } from '../types/todo';

export class TodoRepository {
  // Get all todos
  async findAll(): Promise<Todo[]> {
    try {
      return Database.getAllTodos();
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
  }

  // Get todo by ID
  async findById(id: string): Promise<Todo | null> {
    try {
      return Database.getTodoById(id);
    } catch (error) {
      throw new Error('Failed to fetch todo');
    }
  }

  // Create a new todo
  async create(data: CreateTodoData): Promise<Todo> {
    try {
      return Database.createTodo(data);
    } catch (error) {
      throw new Error('Failed to create todo');
    }
  }

  // Update a todo
  async update(id: string, data: UpdateTodoData): Promise<Todo | null> {
    try {
      return Database.updateTodo(id, data);
    } catch (error) {
      throw new Error('Failed to update todo');
    }
  }

  // Delete a todo
  async delete(id: string): Promise<boolean> {
    try {
      return Database.deleteTodo(id);
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  }

  // Toggle todo completion status
  async toggle(id: string): Promise<Todo | null> {
    try {
      return Database.toggleTodo(id);
    } catch (error) {
      throw new Error('Failed to toggle todo');
    }
  }

  // Check if todo exists
  async exists(id: string): Promise<boolean> {
    try {
      const todo = await this.findById(id);
      return todo !== null;
    } catch (error) {
      return false;
    }
  }
}

export default new TodoRepository();

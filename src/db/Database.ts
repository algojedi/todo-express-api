import { Todo, CreateTodoData, UpdateTodoData } from '../types/todo';
import { mockTodos } from './seed';

// Mock database using an array
class Database {
  private todos: Todo[] = mockTodos();

  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get all todos
  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  // Get todo by ID
  getTodoById(id: string): Todo | null {
    const todo = this.todos.find((todo) => todo.id === id);
    return todo ? { ...todo } : null;
  }

  // Create a new todo
  createTodo(data: CreateTodoData): Todo {
    const now = new Date();
    const newTodo: Todo = {
      id: this.generateId(),
      title: data.title,
      description: data.description || '',
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    this.todos.push(newTodo);
    return { ...newTodo };
  }

  // Update a todo
  updateTodo(id: string, data: UpdateTodoData): Todo | null {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const updatedTodo = {
      ...this.todos[todoIndex],
      ...data,
      updatedAt: new Date(),
    };

    this.todos[todoIndex] = updatedTodo;
    return { ...updatedTodo };
  }

  // Delete a todo
  deleteTodo(id: string): boolean {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return false;
    }

    this.todos.splice(todoIndex, 1);
    return true;
  }

  // Toggle todo completion status
  toggleTodo(id: string): Todo | null {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }

    return this.updateTodo(id, { completed: !todo.completed });
  }
}

export default new Database();

import { Todo } from '../types/todo';

export const mockTodos = (): Todo[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  return [
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Buy groceries for the week',
      completed: false,
      createdAt: threeDaysAgo,
      updatedAt: threeDaysAgo,
    },
    {
      id: '2',
      title: 'Finish the project',
      description: 'Finish the project for the client',
      completed: true,
      createdAt: twoDaysAgo,
      updatedAt: now,
    },
    {
      id: '3',
      title: 'Read a book',
      description: 'Read a book for the week',
      completed: false,
      createdAt: yesterday,
      updatedAt: yesterday,
    },
    {
      id: '4',
      title: 'Go to the gym',
      description: 'Go to the gym for the week',
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '5',
      title: 'Call mom',
      description: 'Call mom to check in',
      completed: true,
      createdAt: twoDaysAgo,
      updatedAt: yesterday,
    },
    {
      id: '6',
      title: 'Plan vacation',
      description: 'Research and plan summer vacation',
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
  ];
};

import express from 'express';

export const rootRoute = (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Todo API is running!',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/status?status=completed':
        'Get todos by status (completed/pending)',
      'GET /api/todos/search?q=searchterm':
        'Search todos by title or description',
      'GET /api/todos/:id': 'Get todo by ID',
      'POST /api/todos': 'Create a new todo',
      'PUT /api/todos/:id': 'Update a todo',
      'DELETE /api/todos/:id': 'Delete a todo',
      'PATCH /api/todos/:id/toggle': 'Toggle todo completion status',
    },
    example: {
      createTodo: {
        method: 'POST',
        url: '/api/todos',
        body: {
          title: 'Buy groceries',
          description: 'Milk, bread, eggs',
        },
      },
    },
  });
};

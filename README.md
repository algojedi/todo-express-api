# Express Project - Todo API

A simple RESTful Todo API built with Express.js and TypeScript using the MVC pattern with a mock database.

## Features

- ✅ Create, Read, Update, Delete todos
- ✅ Toggle todo completion status
- ✅ Input validation
- ✅ Error handling
- ✅ TypeScript support
- ✅ MVC architecture pattern

## Installation

```bash
npm install
```

## Running the Application

### Development mode (with auto-restart)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL

```
http://localhost:3000/api/todos
```

### Endpoints

| Method | Endpoint                             | Description                             |
| ------ | ------------------------------------ | --------------------------------------- |
| GET    | `/api/todos`                         | Get all todos                           |
| GET    | `/api/todos/status?status=completed` | Get todos by status (completed/pending) |
| GET    | `/api/todos/search?q=searchterm`     | Search todos by title or description    |
| GET    | `/api/todos/:id`                     | Get todo by ID                          |
| POST   | `/api/todos`                         | Create a new todo                       |
| PUT    | `/api/todos/:id`                     | Update a todo                           |
| DELETE | `/api/todos/:id`                     | Delete a todo                           |
| PATCH  | `/api/todos/:id/toggle`              | Toggle todo completion status           |

## API Examples

### Create a Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, bread, eggs"
  }'
```

### Get All Todos

```bash
curl http://localhost:3000/api/todos
```

### Get Todos by Status

```bash
# Get completed todos
curl http://localhost:3000/api/todos/status?status=completed

# Get pending todos
curl http://localhost:3000/api/todos/status?status=pending
```

### Search Todos

```bash
# Search todos by title or description
curl http://localhost:3000/api/todos/search?q=groceries
```

### Get Todo by ID

```bash
curl http://localhost:3000/api/todos/{todo_id}
```

### Update a Todo

```bash
curl -X PUT http://localhost:3000/api/todos/{todo_id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and vegetables",
    "completed": true
  }'
```

### Toggle Todo Completion

```bash
curl -X PATCH http://localhost:3000/api/todos/{todo_id}/toggle
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/{todo_id}
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Todo Object Structure

```typescript
{
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Project Structure

```
src/
├── types/
│   └── todoTypes.ts     # TypeScript type definitions
├── db/
│   ├── Database.ts      # Data model and mock database
│   └── seed.ts          # Seed data for the database
├── repositories/
│   └── TodoRepository.ts # Repository layer for data access
├── services/
│   └── TodoService.ts   # Business logic layer
├── controllers/
│   └── todoController.ts # Request handling and response formatting
├── routes/
│   └── todoRoutes.ts    # API route definitions
└── server.ts            # Main server file
```

## Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Node.js** - Runtime environment
- **Nodemon** - Development server with auto-restart
- **ts-node** - TypeScript execution

## Architecture

The application follows a clean architecture pattern with:

- **Types** (`types/`): TypeScript type definitions organized by domain
- **Database Layer** (`db/`): Contains the data models and mock database implementation
- **Repository Layer** (`repositories/`): Abstraction layer between services and database
- **Service Layer** (`services/`): Business logic and data validation
- **Controller Layer** (`controllers/`): Handles HTTP requests and response formatting
- **Route Layer** (`routes/`): Defines API endpoints

## Development

The application uses a mock database (in-memory array) for simplicity. In a production environment, you would replace the `Database` class in the `db/` folder with a real database connection, while keeping the repository interface unchanged.

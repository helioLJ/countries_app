# Country Info App

This repository contains the full-stack implementation of the Country Info App, consisting of a NestJS backend and a Next.js frontend. The application provides information about countries, including their borders, population data, and flags.

## Project Structure

```
.
├── backend/     # NestJS backend application
├── frontend/    # Next.js frontend application
└── README.md    # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

## Running the Application

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=3000
   ```

4. Start the backend server:
   ```
   npm run start:dev
   ```

The backend will be available at `http://localhost:3000`.

### Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:3001`.

## Testing

### Backend

To run backend tests, navigate to the backend directory and run:

```
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run test:cov    # Test coverage
```

## Code Quality

Both the backend and frontend projects use ESLint and Prettier for code quality and formatting. To run linters:

### Backend

```
cd backend
npm run lint
```

### Frontend

```
cd frontend
npm run lint
```

## API Documentation

After starting the backend server, Swagger API documentation is available at:

```
http://localhost:3000/api
```

## Additional Information

For more detailed information about each project, please refer to the README files in the respective directories:

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

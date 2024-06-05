# Todo List API with Authentication


## Objective

Develop a todo list API with authentication using Node.js, integrate with a database, Dockerize the application, set up CI/CD pipelines, and write test cases.

## Table of Contents

1. [Requirements](#requirements)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Testing](#testing)
7. [Contributors](#contributors)

## Requirements

- Implement CRUD operations for managing todo items.
- Include user authentication (e.g., JWT-based authentication).
- Utilize Node.js with Express.js for API development with TypeScript.
- Integrate the API with a database (e.g., MongoDB, PostgreSQL).
- Write test cases for API endpoints and authentication flows using Jest.
- Dockerize the application for easy deployment.
- Ensure secure storage of user credentials and proper validation of authentication tokens.
- Implement pagination and filtering options for fetching todo items.
- Document the API endpoints and authentication mechanisms.

## Technologies Used

- *Node.js*
- *Express.js* (with TypeScript)
- *MongoDB* or *PostgreSQL*
- *Jest* (for testing)
- *Docker*
- *Swagger* or *OpenAPI* (for API documentation)

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn
- MongoDB or PostgreSQL
- Docker

### Steps

1. *Clone the repository*
2. Navigate to cloned repository using cd command
3. *Run the application using*
    **npm start** command.
   It is is configured in such a way that it will in turn include everything like dependency installation , build application and running the application

## Usage

### Authentication

- Obtain a JWT token using the /auth/login endpoint.
- Use the token to access other API endpoints.

### CRUD Operations

- Manage todo items using the API endpoints.
- Implement pagination and filtering options for fetching todo items.

### API Documentation

- *Swagger* or *OpenAPI* documentation can be accessed at /api-docs.

## Testing

### Running Tests

sh
npm run test
# or
yarn test


## Contributors

- [Dhyey Vora](https://github.com/DhyeyVora-1706)

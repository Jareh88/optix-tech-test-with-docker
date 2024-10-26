# Optix Tech Test

## Project Overview

This project has two main parts: a **backend** and a **frontend** application. The backend is a Node.js Express server (with some minor tweaks I made to fix CORS issues), and the frontend is a React-based app built with Vite. The app displays a list of movies, lets users submit reviews, and is containerised with Docker for easy deployment.

## Folder Structure

- **backend/**: Contains the Node.js Express server code.
- **frontend/**: Contains the React app using Vite.
- **docker-compose.yml**: Used to manage both services and get them running in a Docker environment.

## Docker Deployment

Utilises Docker Compose in the root folder.

### Backend

- The backend Dockerfile sets up the Node.js environment, installs dependencies, and runs the Express server.
- I added CORS middleware to make sure the frontend can communicate smoothly with the backend without cross-origin issues.

### Frontend

- The frontend Dockerfile builds the React app and then serves it with nginx so we can make it production-ready.
- The frontend uses environment variables so it knows it's running locally or inside Docker, which lets it switch between `localhost` and the `backend` service names.

### Docker Compose

- The **docker-compose.yml** file manages both the backend and frontend services, linking them through a shared Docker network (`optix-network`) so they can communicate easily. It also exposes the necessary ports for external access.

## Running the Project

### Local Development

If you want to run the backend and frontend locally without Docker:

1. **Install**: Install modules for both frontend and backend with `npm run i:all`.
1. **Backend**: Go to the backend folder, run `npm install`, then `npm start`.
1. **Frontend**: Go to the frontend folder, run `npm install`, then `npm run start`.

The backend will be running at `http://localhost:3000`, and the frontend at `http://localhost:3001`.

### Docker Deployment

To build and deploy everything using Docker:

```sh
npm run docker:build
npm run docker:up
```

This will spin up both services, making the frontend available at `http://localhost:8080` and the backend at `http://localhost:3000`.

### Stopping the Containers

To stop all containers:

```sh
npm run docker:down
```

### Debugging and Logs

If you need to see what's going on or debug any issues:

```sh
npm run docker:logs
```

## Environment Configuration

I used different `.env` files to configure things based on the environment—whether it’s running locally or in Docker:

- **`.env.development`**: Used for local development, pointing the frontend to `http://localhost:3000`.
- **`.env.docker`**: Used when running in Docker, pointing the frontend to `http://backend:3000`.

## Design Decisions

### Code Reusability & Maintainability

- I kept the project structured with reusable hooks in places (`customHooks.tsx`) to ensure consistent and maintainable fetching logic.
- I used React Hook Form for form state management, which helped me keep the code simple while having built-in validation and error handling.

## Future Improvements

- **Testing**: I've added placeholders where some tests would live but I'd generally leverage generators (or AI nowadays) and then go through and refine them.
- **Pre commit hooks**: Husky and commit linting would come in handy for running tests on changed files and making sure we're not pushing any formatting errors to the repository, among other things.
- **Redux Toolkit**: Adding Redux Toolkit for state management would make things more scalable as the app grows.

## Running Tests

If you want to run the frontend unit tests, navigate to the `./frontend` folder and run:

```sh
npm run test
```

## Feedback

I wanted to show that I understand how to keep things simple and think about code reusability. My approach is usually to start by writing pseudo code, then build out a first draft of the functionality (even if it's not perfectly clean), and then go back to refine as needed. I realise there are still some areas that could be refactored, but hopefully I've demonstrated my capability and thought process.

If you'd like me to add Redux functionality or anything else, I'm happy to do so.

If you have any questions or want to discuss further improvements, I'd love to hear from you!

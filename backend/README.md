## Run backend and database

Make sure you have "Docker desktop" installed on your machine. Open docker desktop and keep it open in the background, then run the following command in the root of the project:

- cd backend
- make dev

## Bugfixing for backend and database

### Reset the whole backend and database

To reset the backend run the following command in the root of the project:

- cd backend
- make reset
- make dev

### Reset only backend: This is needed if you have added packages to the backend

To only reset the backend run the following command in the root of the project:

- cd backend
- make clean-backend
- make dev

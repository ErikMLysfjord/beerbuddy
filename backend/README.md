## Run backend and database

Make sure you have "Docker desktop" installed on your machine. Open docker desktop and keep it open in the background, then run the following command in the root of the project:

- cd backend
- make dev

The database may take a long time to start up, so if you get an error when running the backend, wait until the database is ready and try again or go into server.js and click save to restart the backend. (Its running nodemon so it will restart automatically when you save)

## Bugfixing for backend and database

### Empty database

To empty the database so it can be reseeded run the following command in the root of the project:

- rm -r backend/postgres-data

Or you could just delete the postgres-data folder in the backend folder.

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

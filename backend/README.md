## Run backend and database

Make sure you have "Docker desktop" installed on your machine. The API calls in the frontend now point toward the server, so if you want to run it locally you must change the addresses manually to `http://localhost:4000`. Open docker desktop and keep it open in the background, then run the following command in the root of the project:

- cd backend
- make dev

The backend is ready when you get:

```
[nodemon] starting `node server.js`
App listening at http://localhost:4000
```

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

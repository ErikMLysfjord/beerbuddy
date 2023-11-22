## Run backend and database

Make sure you have node installed on your machine. Then run the following command in the root of the project:

```bash
cd backend
npm i
npm start
```

If you wish to start the backend in development mode using nodemon, run the following command in the root of the project:

```bash
cd backend
npm i
npm run dev
```

## Bugfixing for database

### Reset database

Make sure you have sqlite3 installed on your machine. Then run the following command in the root of the project:

```bash
cd backend
rm database.db
sqlite3 database.db < database-seed.sql
```

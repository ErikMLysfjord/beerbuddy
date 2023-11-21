## Run backend and database

Make sure you have node installed on your machine. Then run the following command in the root of the project:

- cd backend
- npm i
- npm start

## Bugfixing for database

### Reset database

Make sure you have sqlite3 installed on your machine. Then run the following command in the root of the project:

- cd backend
- rm database.db
- sqlite3 database.db < database-seed.sql

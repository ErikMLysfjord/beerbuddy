## Run backend and database with sqlite3

Make sure you have node installed on your machine. Then run the following command in the root of the project:

```bash
cd backend
npm i
npm run dev
```

## Run backend and database with mysql

If you want to run the backend with MySQL instead of SQLite3, you will need to do a few more steps:

- Go into the backend folder and change the `.env` file to use MySQL instead of SQLite3
  - If you already have a mysql server running on your machine, update the `.env` file with your credentials
- Make sure you have mysql installed on your machine (example for mac: `brew install mysql` or `sudo apt-get install mysql-server` for linux or [here](https://dev.mysql.com/downloads/installer/) for windows)
- After installing mysql, start the server 
  - `brew services start mysql` or `sudo service mysql start` start in mac/linux
  - `mysqld start` in windows
- Write `cd backend` to go into the backend folder
- Then go into mysql console (write `sudo mysql` or `sudo mysql -u user` or `sudo mysql -u user -p`)
- Then create credentials
  - Write `CREATE USER 'user'@'localhost' IDENTIFIED BY 'Password12345678*';`
  - Then write `GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost';`
  - Then write `FLUSH PRIVILEGES;`
- NB: If you are having issues, do the same steps only for "root" user instead of "user". Then change the credentials in the `.env` file to use "root" instead of "user". And write `ALTER USER` instead of `CREATE USER` in the first step.
- Now that you have created credentials, you can create the database
  - Write `source ./database-seed.sql;`
  - Then write `exit;`
  
Now you have mysql running as databse in your system. 
Final step is to make sure you have node installed on your machine. Then run the following command (in backend folder):

```bash
npm i
npm run dev
```

## Bugfixing for database

### Reset database for sqlite3

Make sure you have SQLite3 installed on your machine. Then run the following command in the root of the project (NB: remember to uncomment the lines in database-seed.sql):
```bash
cd backend
rm database.db
sqlite3 database.db < database-seed.sql
```

For MySQL, go into the MySQL console and write `source ./database-seed.sql;`. Then write `exit;`.

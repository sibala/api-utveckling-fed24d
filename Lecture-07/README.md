# Exercises

## Exercise 01-express-mysql
### Rewrite Post-API, using mysql instead of working with a local array
- Begin with installing the packages mysql2 and dotenv: npm install mysql2 dotenv cors
- Also install the type definitions for some packages: npm install -D @types/dotenv @types/cors
- In PHPMyAdmin -> Create a DB with a posts-table, with the following fields:
  - id INT(10) PK 
  - title VARCHAR(100)
  - content TEXT
  - author VARCHAR(100)
  - created_at TIMESTAMP CURRENT_TIMESTAMP
- Establish a DB-connection in config/db.ts. For XAMPP, the login info is:
  - host: "localhost"
  - user: "root"
  - password: "" // Empty string
  - database: ??? // Whatever you named the databse when creating it
  - port: 3306
- Make sure the above credentials are saved in a .env file, and used by importing the dotenv package
- Build on the previous code, rewrite all endpoints using database queries to perform CRUD, instead of using the local array 
- NOTE, the following parts wasn't covered in the lesson, but is still part of the exercise for you to figure:
  - Rewrite the PATCH-endpoint to use MySQL instead of local array, 
  - Make the search and sort functionality work with the databse, on the get All Posts endpoint
import Database from "better-sqlite3";
export const db = new Database("app/database.db");

const initializeDatabase = () => {
  // Execute SQL commands to create tables or define schema as needed
  db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            address TEXT NULL,
            state TEXT NULL,
            phone TEXT NULL, 
            email TEXT UNIQUE, 
            password TEXT NOT NULL,
            accesToken TEXT NULL,
            refreshToken TEXT NULL,
            notes TEXT NULL, 
            createdAt DATE DEFAULT CURRENT_DATE
        )
    `);
};

// Call the function to initialize the database schema
initializeDatabase();

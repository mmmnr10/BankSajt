import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise"; //
//import { getUser } from "./models/users.js"; //

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Skapa MySQL-databasen
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank",
  port: 3306,
});

// Hjäpffunktion för att köra SQL-frågor
export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

// Skapa användare - Create
app.post("/users", async (req, res) => {
  console.log("req.body", req.body);
  const { username, password } = req.body;

  try {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const params = [username, password];
    const result = await query(sql, params);
    console.log("result", result);
    res.send("User created");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// Logga in - Read
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // const result = await getUser(username, password);
    // console.log("result", result);
    // if (result.length > 0) {
    //   res.json(result[0]);
    // } else {
    //   res.status(401).send("Invalid credentials");
    // }
  } catch (error) {
    res.status(500).send("Error login");
  }
});

// Uppdatera lösenord - Update
app.put("/new-password", async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const params = [newPassword, userId];
    const result = await query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).send("Error updating password");
  }
});

// Ta bort användare - Delete
app.delete("/users", async (req, res) => {
  const { userId } = req.body;

  try {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [userId];
    const result = await query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});

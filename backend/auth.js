const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

const users = [
  // Exempelanvändare (i en verklig applikation, lagra användare i en databas)
  {
    id: 1,
    email: "user@example.com",
    password: "$2a$10$T1smjqgwnQg7q51Dz1Z5xu9OZRpHKcPbO4jXb2GVq93u8ZX0en9Cm",
  }, // lösenord: 'password'
];

// Middleware för att hantera POST-data
app.use(express.json());

// Inloggningsendpunkt
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Hitta användare
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Kontrollera lösenord
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Skapa JWT-token
  const token = jwt.sign({ id: user.id, email: user.email }, "yourSecretKey", {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

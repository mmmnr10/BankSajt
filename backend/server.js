import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let userIds = 1;
let balanceIds = 1;
let sessionIds = 1;

let users = [];
let sessions = [];
let balances = [];

// Create a new user
app.post("/users", (req, res) => {
  const { username, password } = req.body;

  const userId = userIds++;

  const user = { id: userId, username, password };
  users.push(user);

  const balance = { id: balanceIds++, userId: userId, amount: 100 }; // Set initial balance
  balances.push(balance);

  console.log(users);

  res.status(201).json({ message: "User created successfully" });
});

// Login route that checks the username and password
app.post("/sessions", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const otp = Math.floor(10000 + Math.random() * 900000);
    sessions.push({ id: sessionIds++, userId: user.id, otp });
    console.log("Login successful");
    res.json({ otp });
  } else {
    console.log(user);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// Check the balance of a user based on the OTP
app.post("/accounts", (req, res) => {
  const { otp } = req.body;

  const session = sessions.find((session) => session.otp === parseInt(otp));

  if (session) {
    const userId = session.userId;
    const balance = balances.find((balance) => balance.userId == userId);

    if (balance) {
      res.json({ amount: balance.amount }); // Successfully return the balance
    } else {
      res.status(400).json({ message: "Balance not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Transfer money to the user's account (update balance)
app.post("/me/accounts/transactions", (req, res) => {
  const { otp, amount } = req.body;

  const session = sessions.find((s) => s.otp === parseInt(otp));

  if (session) {
    const userId = session.userId;
    const balance = balances.find((b) => b.userId === userId);

    if (balance) {
      balance.amount += amount; // Update the balance
      res.json({ balance: balance.amount });
    } else {
      res.status(400).json({ message: "User balance not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

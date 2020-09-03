import express from "express";
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
const db = new Database("src/todo.db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const users = db
    .prepare(
      `
      select *
      from users
    `
    )
    .all();

  res.send(users);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

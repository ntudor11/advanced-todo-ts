import express from "express";
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const db = new Database("src/todo.db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const secret = "TEMP_SECRET";

const withAuth = (requiredLevel?: string) => (
  req: any,
  res: any,
  next: any
) => {
  req.cookies = {
    token: undefined,
  };
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ error: "Unauthorized: Invalid token" });
      } else if (requiredLevel && !requiredLevel.includes(decoded.type)) {
        next();
        res.status(401).send({ error: "Unauthorized: Invalid user type" });
      } else {
        req.userId = decoded.userId;
        req.email = decoded.email;
        req.type = decoded.type;
        req.image = decoded.image;
        next();
      }
    });
  }
};

app.get("/users", (req, res) => {
  const users = db
    .prepare(
      `
      select id, email, image
      from users
    `
    )
    .all();

  res.send(users);
});

app.get("/user/:id", withAuth(undefined), (req, res) => {
  const { id } = req.params;
  const user = db
    .prepare(
      `
      select *
      from users
      where id = ?
    `
    )
    .get(id);

  const todos = db
    .prepare(
      `
        select t.id, t.task, t.description, t.priority, t.deadline from todos t
          join users u
          on u.id = t.user_id
          where t.user_id = ?
      `
    )
    .all(id);

  todos.map((todo: any) => {
    const todoTags = db
      .prepare(
        `
            select distinct tg.id, tg.name, tg.color
              from tags tg
              join todos_tags tt
              on tg.id = tt.tag_id
              join todos t
              on t.id = tt.todo_id
              where t.id = ?;
          `
      )
      .all(todo.id);

    const todoStatus = db
      .prepare(
        `
          select distinct s.id, s.name
            from status s
            join todos t
            on s.id = t.status_id
            where t.id = ?;
        `
      )
      .get(todo.id);

    todo.tags = todoTags;
    todo.status = todoStatus;
  });

  res.send({ user, todos });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

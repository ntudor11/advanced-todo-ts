import express from "express";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Database = require("better-sqlite3");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const _ = require("lodash");

const app = express();
const db = new Database("src/todo.db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const hashPass = (password: string) => {
  const sha256 = crypto.createHash("sha256");
  const passHash = sha256.update(password).digest("base64");
  return passHash;
};

const secret = "TEMP_SECRET";

const withAuth = (requiredLevel?: string) => (
  req: any,
  res: any,
  next: any
) => {
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
        req.emailAddress = decoded.emailAddress;
        req.name = decoded.name;
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

app.get("/user/:id", withAuth(), (req: any, res) => {
  const { id } = req.params;
  const user = db
    .prepare(
      `
      select id, name, email, image
      from users
      where id = ?
    `
    )
    .get(id);

  res.send({ user });
});

app.get("/my-todos", withAuth(), (req: any, res) => {
  const { userId } = req;

  const todos = db
    .prepare(
      `
        select t.id, t.task, t.description, t.priority, t.deadline from todos t
          join users u
          on u.id = t.user_id
          where t.user_id = ?
      `
    )
    .all(userId);

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

  res.send({ todos });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPass = hashPass(password);

  const dbRow = db
    .prepare(
      `
        select id, name, email, image, password
        from users
        where email = lower(?)
      `
    )
    .get(email);

  if (!dbRow) {
    return res.status(401).send({ success: false, errType: "user_not_found" });
  }

  const {
    id: userId,
    email: emailAddress,
    name,
    password: dbPasswordHash,
    image,
  } = dbRow;

  if (hashedPass !== dbPasswordHash) {
    return res.status(401).send({ success: false, errType: "WRONG_PASSWORD" });
  }

  const token = jwt.sign({ userId, emailAddress, name, image }, secret, {
    expiresIn: "3h",
  });
  return res
    .cookie("token", token, { httpOnly: true })
    .send({ success: true, userId });
});

app.post("/register", (req, res) => {
  const { name, email, image, password } = req.body;

  const dbRow = db
    .prepare(
      `
        select id, email
        from users
        where email = lower(?)
      `
    )
    .get(email);

  if (!dbRow) {
    const hashedPass = hashPass(password);

    db.prepare(
      `
        insert into users (
          name, email, image, password
        )
        values
          (?, ?, ?, ?)
      `
    ).run(name, email, image, hashedPass);
    res.send({ email });
    return;
  }
  res.send({ error: "email already exists" });
  return;
});

app.post("/logout", (_, res) => res.cookie("token", false).send("OK"));

app.post("/addTodo", withAuth(), (req, res) => {
  const {
    task,
    description,
    deadline,
    priority,
    statusId,
    userId,
    tagsArr,
  } = req.body;

  db.prepare(
    `
          insert into todos(task, description, deadline, priority, statusId, user_id)
            values (?, ?, ?, ?, ?, ?)
        `
  ).run(task, description, deadline, priority, statusId, userId);

  const todoId = db
    .prepare(
      `
        select id from todos
          order by id desc
          limit 1;
      `
    )
    .get();

  const { id } = todoId;

  tagsArr.forEach((tag: any) => {
    const { tagId } = tag;
    db.prepare(
      `
            insert into todos_tags(todo_id, tag_id)
              values (?, ?)
          `
    ).run(id, tagId);
  });
});

app.post(
  "/updateTodo",
  /* withAuth(), */ (req, res) => {
    const {
      task,
      description,
      deadline,
      priority,
      statusId,
      tagsArr,
      itemId,
    } = req.body;

    db.prepare(
      `
    update todos
      set task = ?,
      description = ?,
      deadline = ?,
      priority = ?,
      statusId = ?
      where id = ?
    `
    ).run(task, description, deadline, priority, statusId, itemId);

    const insideTagsArr = db
      .prepare(
        `
        select tag_id from todos_tags
        where todo_id = ?
      `
      )
      .run(itemId);

    if (!_.isEqual(tagsArr, insideTagsArr)) {
      db.prepare(
        `
          delete from todos_tags where
            todo_id = ?
        `
      ).run(itemId);

      tagsArr.forEach((tag: any) => {
        const { tagId } = tag;
        db.prepare(
          `
              insert into todos_tags(todo_id, tag_id)
                values (?, ?)
            `
        ).run(itemId, tagId);
      });
    }

    res.send("ok");
  }
);

app.post("/deleteTodo", withAuth(), (req, res) => {
  const { itemId } = req.body;
  db.prepare(
    `
        delete from todos_tags where
          todo_id = ?
      `
  ).run(itemId);
  db.prepare(
    `
        delete from todos where
          id = ?
      `
  ).run(itemId);

  res.send("ok");
});

app.post("/addTag", withAuth(), (req, res) => {
  const { name, color } = req.body;

  const insideTagsArr = db
    .prepare(
      `
        select name from tags
        where name = ?
      `
    )
    .run(name);

  if (!insideTagsArr.includes(name)) {
    db.prepare(
      `
          insert into tags
            (name, color)
            values (?, ?)
        `
    ).run(name, color);
    res.send(name);
  }
  res.send({ error: "tag already exists" });
});

app.post("/deleteTag", withAuth(), (req, res) => {
  const { tagId } = req.body;

  const usedTagsArr = db
    .prepare(
      `
        select tag_id from todos_tags
        where tag_id = ?
      `
    )
    .run(tagId);

  if (!usedTagsArr.includes(tagId)) {
    db.prepare(
      `
          delete from tags where
            id = ?
        `
    ).run(tagId);
    res.send("ok");
  }
  res.send({ error: "tag is used, you cannot delete it" });
});

app.get("/checkToken", withAuth(), (req, res) => {
  res.send({
    userId: (<any>req).userId,
    emailAddress: (<any>req).emailAddress,
    name: (<any>req).name,
    image: (<any>req).image,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

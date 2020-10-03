import express from "express";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const path = require("path");
const pgPromise = require("pg-promise");

const app = express();
const PORT = process.env.PORT || 8000;

const cn =
  process.env.DATABASE_URL ||
  "postgres://todo:todos-local@localhost:5432/todos_ts";
const pgp = pgPromise();
const postgresDb = pgp(cn);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
}

const hashPass = (password: string) => {
  const passHash = bcrypt.hashSync(password, 10);
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

app.get("/users", async (req, res) => {
  const users = await postgresDb.any(`
      select id, email, image
      from users
    `);

  res.send(users);
});

app.get("/user/:id", withAuth(), async (req: any, res) => {
  const { id } = req.params;
  const user = await postgresDb.any(
    `
      select id, name, email, image
      from users
      where id = $1
    `,
    id
  );
  res.send({ user });
});

app.get("/my-todos", withAuth(), async (req: any, res) => {
  const { userId } = req;

  const getAllTasks = () => {
    return postgresDb.task((t: any) => {
      return t
        .map(
          `select t.id, t.task, t.description, t.priority, t.deadline from todos t
            join users u
            on u.id = t.user_id
            where t.user_id = $1`,
          userId,
          (todo: any) => {
            return t
              .batch([
                t.any(
                  `select distinct tg.id as "tagId", tg.name as "tagName", tg.color
                    from tags tg
                    join todos_tags tt
                    on tg.id = tt.tag_id
                    join todos t
                    on t.id = tt.todo_id
                    where t.id = $1;`,
                  todo.id
                ),
                t.one(
                  `select distinct s.id as "statusId", s.name as "statusName"
                    from status s
                    join todos t
                    on s.id = t.status_id
                    where t.id = $1;`,
                  todo.id
                ),
              ])
              .then((data: any) => {
                todo.tags = data[0];
                todo.status = data[1];
                return todo;
              });
          }
        )
        .then(t.batch);
    });
  };

  const statuses = await postgresDb.any(
    `
    select distinct s.id as "statusId", s.name as "statusName"
      from status s;
    `
  );

  const tags = await postgresDb.any(
    `
    select id as "tagId", name as "tagName", color as "tagColor"
    from tags
    `
  );

  getAllTasks()
    .then((todos: any) => {
      res.json({ todos, statuses, tags });
    })
    .catch((err: any) => {
      console.log(err);
    });
});

app.get("/kanban", withAuth(), async (req: any, res) => {
  const reqId = req.userId;

  const getBoard = () => {
    return postgresDb.task((t: any) => {
      return t
        .map(
          `select s.id, s.name as title
        from status s`,
          [],
          (status: any) => {
            return t
              .map(
                `select t.id, t.task as title, t.description, t.status_id, t.priority, t.deadline
          from todos t
          where status_id = $1 and user_id = $2`,
                [status.id, reqId],
                (card: any) => {
                  return t
                    .any(
                      `select distinct tg.id as "tagId", tg.name as "tagName", tg.color
                from tags tg
                join todos_tags tt
                on tg.id = tt.tag_id
                join todos t
                on t.id = tt.todo_id
                where t.id = $1;`,
                      card.id
                    )
                    .then((data: any) => {
                      card.tags = data;
                      return card;
                    });
                }
              )
              .then(t.batch)
              .then((data: any) => {
                status.cards = data;
                return status;
              });
          }
        )
        .then(t.batch);
    });
  };

  const statuses = await postgresDb.any(
    `
    select distinct s.id as "statusId", s.name as "statusName"
      from status s;
    `
  );

  const tags = await postgresDb.any(
    `
    select id as "tagId", name as "tagName", color as "tagColor"
    from tags
    `
  );

  getBoard()
    .then((columns: any) => {
      res.json({ board: { columns }, statuses, tags });
    })
    .catch((err: any) => {
      res.send(err);
    });
});

app.get("/dashboard", withAuth(), async (req: any, res) => {
  const reqId = req.userId;

  const getBoard = () => {
    return postgresDb.task((t: any) => {
      return t
        .batch([
          t
            .map(
              `select s.id as "statusId", s.name as "statusName"
            from status s`,
              [],
              (status: any) => {
                return t
                  .map(
                    `select t.id, t.task as title, t.description, t.status_id, t.status_since, t.priority, t.deadline
              from todos t
              where t.status_id = $1 and t.user_id = $2`,
                    [status.statusId, reqId],
                    (card: any) => {
                      return t
                        .any(
                          `select distinct tg.id as "tagId", tg.name as "tagName", tg.color as "tagColor"
                    from tags tg
                    join todos_tags tt
                    on tg.id = tt.tag_id
                    join todos t
                    on t.id = tt.todo_id
                    where t.id = $1;`,
                          card.id
                        )
                        .then(t.batch)
                        .then((data: any) => {
                          card.tags = data;
                          return card;
                        });
                    }
                  )
                  .then(t.batch)
                  .then((data: any) => {
                    status.cards = data;
                    status.cardCount = data.length;
                    return status;
                  });
              }
            )
            .then(t.batch),
          t
            .map(
              `
              select id as "tagId", name as "tagName", color as "tagColor" from tags
            `,
              [],
              (tag: any) => {
                return t
                  .any(
                    `
                    select t.id, t.task as title, t.description, t.status_id, t.priority, t.deadline
              from todos t
              join todos_tags tt
              on t.id = tt.todo_id
              where tt.tag_id = $1 and t.user_id = $2
                    `,
                    [tag.tagId, reqId]
                  )
                  .then(t.batch)
                  .then((data: any) => {
                    tag.todoCount = data.length;
                    return tag;
                  });
              }
            )
            .then(t.batch),
          // t
          //   .map(
          //     `
          //     select s.id, s.name as label
          //     from status s
          //   `,
          //     [],
          //     (status: any) => {
          //       return t
          //         .any(
          //           `
          //             select distinct t.status_since from
          //             todos t
          //             where user_id = $1
          //           `,
          //           reqId
          //         )
          //         .then(t.batch)
          //         .then((res: any) => {
          //           console.log(res);
          //           status.data = res;
          //           return status;
          //         });
          //       // return t
          //       //   .one(
          //       //     `
          //       //     select count(t.id) from
          //       //       todos t
          //       //       where user_id = $1
          //       //       and t.status_id = $2
          //       //   `,
          //       //     [reqId, status.id]
          //       //   )
          //       //   .then((res: any) => {
          //       //     status.data = res.count;
          //       //     return status;
          //       //   });
          //     }
          //   )
          //   .then(t.batch),
          // t.batch([
          t
            .any(
              `
                  select array_agg(distinct t.status_since) as labels
                    from todos t
                    where t.user_id = $1
                `,
              [reqId]
            )
            .then(t.batch),
          t
            .map(
              `
                select s.id as status_id, s.name as label from status s
              `,
              [],
              (status: any) => {
                return t
                  .any(
                    `
                    select array_agg(distinct t.status_since) as dates
                      from todos t
                      join status s
                      on s.id = t.status_id
                      where s.id = $1
                      and t.user_id = $2
                  `,
                    [status.status_id, reqId]
                  )
                  .then((res: any) => {
                    status.data = res[0].dates;
                    return status;
                  });

                // return t
                //   .one(
                //     `
                //     select count(t.id) from todos t
                //       where t.status_id = $1
                //       and t.user_id = $2
                //   `,
                //     [status.status_id, reqId]
                //   )
                //   .then((res: any) => {
                //     status.data = res.count;
                //     return status;
                //   });
              }
            )
            .then(t.batch),
          // ]),
        ])
        .then(t.batch);
    });
  };

  getBoard()
    .then((data: any) => {
      res.json({
        columns: data[0],
        tags: data[1],
        todos: { labels: data[2][0].labels, datasets: data[3] },
        // data,
      });
    })
    .catch((err: any) => {
      res.send(err);
    });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const dbRow = await postgresDb.one(
    `
      select id, name, email, image, password
      from users
      where email = $1
    `,
    email.toLowerCase()
  );

  if (!dbRow) {
    return await res
      .status(401)
      .send({ success: false, errType: "user_not_found" });
  }

  const {
    id: userId,
    email: emailAddress,
    name,
    password: dbPasswordHash,
    image,
  } = dbRow;

  if (!bcrypt.compareSync(password, dbPasswordHash)) {
    return res.status(401).send({ success: false, errType: "WRONG_PASSWORD" });
  }

  const token = jwt.sign({ userId, emailAddress, name, image }, secret, {
    expiresIn: "3h",
  });
  return res
    .cookie("token", token, { httpOnly: true })
    .send({ success: true, userId });
});

app.get("/calendar", withAuth(), async (req: any, res) => {
  const { userId } = req;

  const getAllTasks = () => {
    return postgresDb.task((t: any) => {
      return t
        .map(
          `select t.id, t.task as title, t.description, t.priority, t.deadline as date from todos t
            join users u
            on u.id = t.user_id
            where t.user_id = $1`,
          userId,
          (todo: any) => {
            return t
              .batch([
                t.any(
                  `select distinct tg.id as "tagId", tg.name as "tagName", tg.color
                    from tags tg
                    join todos_tags tt
                    on tg.id = tt.tag_id
                    join todos t
                    on t.id = tt.todo_id
                    where t.id = $1;`,
                  todo.id
                ),
                t.one(
                  `select distinct s.id as "statusId", s.name as "statusName"
                    from status s
                    join todos t
                    on s.id = t.status_id
                    where t.id = $1;`,
                  todo.id
                ),
              ])
              .then((data: any) => {
                todo.tags = data[0];
                todo.status = data[1];
                return todo;
              });
          }
        )
        .then(t.batch);
    });
  };

  const statuses = await postgresDb.any(
    `
    select distinct s.id as "statusId", s.name as "statusName"
      from status s;
    `
  );

  const tags = await postgresDb.any(
    `
    select id as "tagId", name as "tagName", color as "tagColor"
    from tags
    `
  );

  getAllTasks()
    .then((todos: any) => {
      res.json({ todos, statuses, tags });
    })
    .catch((err: any) => {
      console.log(err);
    });
});

app.post("/register", async (req, res) => {
  const { name, email, image, password } = req.body;

  const dbRow = await postgresDb.any(
    `
      select id, email
      from users
      where email = $1
    `,
    email.toLowerCase()
  );

  if (!dbRow.id) {
    const hashedPass = hashPass(password);

    await postgresDb.none(
      `
        insert into users (
          name, email, image, password
        ) values (
          $1, $2, $3, $4
        )
      `,
      [name, email, image, hashedPass]
    );
    return res.send({ email, success: true });
  }
  return res.send({ error: "email already exists" });
});

app.post("/logout", (_, res) => res.cookie("token", false).send("OK"));

app.post("/add-todo", withAuth(), async (req: any, res) => {
  const { userId } = req;
  const { description, deadline, task, priority, statusId, tagsArr } = req.body;

  const currentTime = new Date().toISOString().split("T", 1)[0];

  await postgresDb.none(
    `
    insert into todos(task, description, deadline, priority, status_id, status_since, user_id)
      values ($1, $2, $3, $4, $5, $6, $7)
    `,
    [task, description, deadline, priority, statusId, currentTime, userId]
  );

  const todoId = await postgresDb.one(
    `
    select id from todos
      order by id desc
      limit 1;
    `
  );

  const { id } = todoId;

  tagsArr.forEach(async (tagId: any) => {
    await postgresDb.none(
      `
      insert into todos_tags(todo_id, tag_id)
        values ($1, $2)
      `,
      [id, tagId]
    );
  });
  res.send("ok");
});

app.post("/update-todo-status", withAuth(), async (req, res) => {
  const { itemId, statusId } = req.body;
  const currentTime = new Date().toISOString().split("T", 1)[0];

  await postgresDb.none(
    `
    update todos
      set status_id = $1,
      status_since = $2
      where id = $3
    `,
    [statusId, currentTime, itemId]
  );
  res.send("ok");
});

app.post("/update-todo", withAuth(), async (req, res) => {
  const {
    task,
    description,
    deadline,
    priority,
    statusId,
    tagsArr,
    id,
  } = req.body;

  const currentTime = new Date().toISOString().split("T", 1)[0];

  const prevStatus = await postgresDb.one(
    `
      select status_id from todos
        where id = $1;
    `,
    [id]
  );

  await postgresDb.none(
    `
      update todos
        set task = $1,
        description = $2,
        deadline = $3,
        priority = $4
        where id = $5
    `,
    [task, description, deadline, priority, id]
  );

  const insideTagsArr = await postgresDb.any(
    `
      select tag_id from todos_tags
      where todo_id = $1
    `,
    id
  );

  if (prevStatus.status_id !== statusId) {
    await postgresDb.none(
      `
        update todos
          set status_id = $1,
          status_since = $2
          where id = $3
      `,
      [statusId, currentTime, id]
    );
  }

  if (!_.isEqual(tagsArr, insideTagsArr)) {
    await postgresDb.any(
      `
        delete from todos_tags where
          todo_id = $1
      `,
      id
    );

    tagsArr.forEach(async (tagId: any) => {
      await postgresDb.any(
        `
          insert into todos_tags(todo_id, tag_id)
            values ($1, $2)
        `,
        [id, tagId]
      );
    });
  }
  res.send("ok");
});

app.post("/delete-todo", withAuth(), async (req, res) => {
  const { itemId } = req.body;
  await postgresDb.any(
    `
      delete from todos_tags where
        todo_id = $1
    `,
    itemId
  );
  await postgresDb.any(
    `
      delete from todos where
        id = $1
    `,
    itemId
  );
  res.send("ok");
});

app.post("/add-tag", withAuth(), async (req, res) => {
  const { tagName, tagColor } = req.body;

  const insideTagsArr = await postgresDb.any(
    `
      select name from tags
      where name = $1
    `,
    tagName
  );

  if (!insideTagsArr.includes(tagName)) {
    await postgresDb.none(
      `
            insert into tags
              (name, color)
              values ($1, $2)
      `,
      [tagName, tagColor]
    );
    res.status(200).send(tagName);
    return;
  }
  res.send({ error: "tag already exists" });
  return;
});

app.post("/remove-tag-from-task", withAuth(), async (req, res) => {
  const { tagId, todoId } = req.body;

  await postgresDb.any(
    `
      delete from todos_tags where
        tag_id = $1 and todo_id = $2
    `,
    [tagId, todoId]
  );
  res.send("ok");
});

app.post("/delete-tag", withAuth(), async (req, res) => {
  const { tagId } = req.body;

  await postgresDb.any(
    `
    delete from tags where
      id = $1
    `,
    tagId
  );
  res.send("ok");
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

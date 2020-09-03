create table users (
  id integer not null primary key,
  email text not null,
  password text not null,
  image text
);

create table status (
  id integer not null primary key,
  name text -- [eg. backlog, todo, doing, done]
);

create table todos (
  id integer not null primary key,
  task text,
  description text,
  deadline text,
  priority text,
  status_id text references status(id),
  user_id integer references users(id)
);

create table tags (
  id integer not null primary key,
  name text,
  color text
);

create table todos_tags (
  todo_id integer not null,
  tag_id integer not null
);

insert into users (
  email,
  password,
  image
) values (
  "abc@abc.com",
  "password",
  "https://cnaca.ca/wp-content/uploads/2018/10/user-icon-image-placeholder.jpg"
);

insert into status (name) values ("Backlog");

insert into status (name) values ("To Do");

insert into status (name) values ("Doing");

insert into status (name) values ("Done");

insert into users (
  email,
  password,
  image
) values (
  "ab@ab.com",
  "password",
  "https://cnaca.ca/wp-content/uploads/2018/10/user-icon-image-placeholder.jpg"
);

insert into todos (
  task,
  description,
  priority,
  status_id,
  user_id
) values (
  "check email",
  "check yahoo, itu, all  emails",
  "Medium",
  2,
  1
);

insert into todos (
  task,
  description,
  priority,
  status_id,
  user_id
) values (
  "eat green",
  "<ul><li>chickpeas</li><li>broccoli</li></ul>",
  "High",
  3,
  2
);

insert into todos (
  task,
  description,
  priority,
  status_id,
  user_id
) values (
  "sport",
  "<ul><li>pushups</li><li>squats</li></ul>",
  "Low",
  1,
  1
);

insert into tags (name, color) values (
  "work",
  "#ff0000"
);

insert into tags (name, color) values (
  "private",
  "#00ff00"
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  1, 2
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  1, 1
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  2, 1
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  3, 2
);

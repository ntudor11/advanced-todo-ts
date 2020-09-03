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
  priority text,
  status_id text unique references status(id),
  user_id integer unique references users(id)
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

drop table users cascade;
drop table status cascade;
drop table todos cascade;
drop table tags cascade;
drop table todos_tags cascade;

create table users (
  id serial primary key,
  name text,
  email text not null unique,
  password text not null,
  image text
);

create table status (
  id serial primary key,
  name text -- [eg. backlog, todo, doing, done]
);

-- create table status_history (
--   id serial primary key,
--   status_id integer references status(id),
--   todo_id integer references todos(id),
--   time_stamp text,
-- ); -- TODO keep timestamps for each status

create table todos (
  id serial primary key,
  task text,
  description text,
  deadline text,
  priority text,
  status_id integer references status(id),
  status_since text, -- references status_history(time_stamp),
  user_id integer references users(id)
);

create table tags (
  id serial not null primary key,
  name text,
  color text,
  user_id integer references users(id)
);

create table todos_tags (
  todo_id integer,
  tag_id integer
);

insert into users (
  email,
  password,
  image
) values (
  'abc@abc.com',
  '$2b$10$V6MNHFa9SbGW5t/5R8BUIe2o0NuGvphPW9OODkoD5V.qp/wCZQnHO',
  'https://images.generated.photos/iu45sy63UfSD4JqiVrW-LscMCQMYerSlH-BdkX9gfJc/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Ry/YW5zcGFyZW50X3Yy/L3YyXzA0NjU5MzUu/cG5n.png'
);

insert into status (name) values ('Backlog');

insert into status (name) values ('To Do');

insert into status (name) values ('Doing');

insert into status (name) values ('Done');

insert into users (
  email,
  password,
  image
) values (
  'ab@ab.com',
  '$2b$10$Bvjbn78G099VWWosXddCDelGfmw5Ap7bn.sfwBlgR3SXBgzyEZokO',
  'https://cnaca.ca/wp-content/uploads/2018/10/user-icon-image-placeholder.jpg'
);

insert into todos (
  task,
  description,
  priority,
  status_id,
  user_id
) values (
  'check email',
  'check yahoo, itu, all  emails',
  'Medium',
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
  'eat green',
  '<ul><li>chickpeas</li><li>broccoli</li></ul>',
  'High',
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
  'sport',
  '<ul><li>pushups</li><li>squats</li></ul>',
  'Low',
  1,
  1
);

insert into todos (
  task,
  description,
  priority,
  status_id,
  user_id
) values (
  'play conquistador',
  'hello world',
  'High',
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
  'email Tudor',
  'don not forget about this!',
  'High',
  4,
  1
);

insert into tags (name, color, user_id) values (
  'work',
  '#9F0500',
  1
);

insert into tags (name, color, user_id) values (
  'private',
  '#808900',
  1
);

insert into tags (name, color, user_id) values (
  'uni',
  '#0C797D',
  1
);

insert into tags (name, color, user_id) values (
  'private',
  '#872f02',
  2
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
  2, 4
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  3, 2
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  4, 2
);

insert into todos_tags (
  todo_id,
  tag_id
) values (
  5, 1
);

update todos
	set deadline='2020-09-03T12:00'
    where id=1;

update todos
	set deadline='2020-09-03T23:50'
    where id=4;

update todos
	set deadline='2020-08-27T21:23'
    where id=2;

update todos
	set deadline='2020-08-29T09:05'
    where id=3;

update todos
	set deadline='2020-09-05T16:30'
    where id=5;

insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'deliver report',
      'do not forget about presentation as well',
      '2020-08-24T17:20',
      'Medium',
      2,
      1
    );


insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'do presentation',
      'slide 1 was intro, last slide is thank you page',
      '2020-08-21T08:00',
      'Low',
      3,
      1
    );


insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'Cook something sweet',
      'maybe a lava cake or a profiterole',
      '2020-10-11T08:50',
      'High',
      4,
      1
    );


insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'go swimming',
      'amager or bellevue or hornbaek strand',
      '2020-10-07T06:00',
      'High',
      4,
      1
    );


insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'playbasketball',
      'at the local idraetsanlaeg',
      '2020-09-30T16:30',
      'High',
      3,
      1
    );

insert into todos (task, description, deadline, priority, status_id, user_id)
	values (
      'go to Switzerland',
      'St. Moritz, Zurich, Geneve, Pre saint Diddier',
      '2020-10-04T09:00',
      'High',
      2,
      1
    );


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO todo;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO todo;

# Advanced TS Todo Application

## Installation Guidelines

### Set up PostgreSQL

After installing PostgreSQL and enabling the `postgresql` service, run `psql postgres`. Once in the `psql` command line, run the commands:

```
> CREATE ROLE todo WITH LOGIN PASSWORD 'todos-local';
> ALTER ROLE todo CREATEDB;
> \q
```

Then, enter the `psql` command line again, this time with the newly created user account: `psql -d postgres -U todo`. Afterwards, run:

```
> CREATE DATABASE todos_ts;
> \q
```

For setting the data model and adding some demo data in the PostgreSQL database, run the following command from the root directory:

### `npm run setup-db`

### Installing the application

In the project directory, you can run the following command for installing all the necessary dependencies:

### `npm install --save`

For running both the React and Express servers, run the following command:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The server is located at the address [http://localhost:8000](http://localhost:8000) and the routes can be found in `src/server.tsx`

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

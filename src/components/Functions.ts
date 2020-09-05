const axios = require("axios").default;

interface ExistingUser {
  email: string;
  password: string;
}

interface NewUser {
  email: string;
  name: string;
  image: string;
  password: string;
}

export const login = (existingUser: ExistingUser) =>
  axios.post("/login", {
    email: existingUser.email,
    password: existingUser.password,
  });

export const logout = () => axios.post("/logout");

export const register = (newUser: NewUser) => axios.post("/register", newUser);

export const deleteTodo = (todo: any) => axios.post("/delete-todo", todo);

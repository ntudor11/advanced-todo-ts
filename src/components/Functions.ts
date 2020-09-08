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

export const updateTodo = (todo: any) => axios.post("/update-todo", todo);

export const updateTodoStatus = (todo: any) =>
  axios.post("/update-todo-status", todo);

export const deleteTodo = (todo: any) => axios.post("/delete-todo", todo);

export const removeTagFromTask = (tag: any) =>
  axios.post("/remove-tag-from-task", tag);

export const removeTag = (tagId: any) => axios.post("/delete-tag", tagId);

export const addNewTag = (newTag: any) => axios.post("/add-tag", newTag);

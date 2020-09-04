const axios = require("axios").default;

interface ExistingUser {
  email: string;
  password: string;
}

export const login = (existingUser: ExistingUser) =>
  axios.post("/login", {
    email: existingUser.email,
    password: existingUser.password,
  });

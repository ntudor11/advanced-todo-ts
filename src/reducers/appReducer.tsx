import { combineReducers } from "redux";
import todosReducer from "./todosReducer";

export const appReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof appReducer>;

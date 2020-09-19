import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import kanbanReducer from "./kanbanReducer";

export const appReducer = combineReducers({
  todos: todosReducer,
  kanban: kanbanReducer,
});

export type RootState = ReturnType<typeof appReducer>;

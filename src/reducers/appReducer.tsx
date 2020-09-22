import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import kanbanReducer from "./kanbanReducer";
import calendarReducer from "./calendarReducer";

export const appReducer = combineReducers({
  todos: todosReducer,
  kanban: kanbanReducer,
  calendar: calendarReducer,
});

export type RootState = ReturnType<typeof appReducer>;

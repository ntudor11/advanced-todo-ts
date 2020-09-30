import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import kanbanReducer from "./kanbanReducer";
import calendarReducer from "./calendarReducer";
import dashboardReducer from "./dashboardReducer";

export const appReducer = combineReducers({
  todos: todosReducer,
  kanban: kanbanReducer,
  calendar: calendarReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof appReducer>;

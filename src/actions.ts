import axios from "axios";

axios.defaults.validateStatus = (status) => status < 500;

const fetchTodosRequest = () => ({ type: "FETCH_TODOS_REQUEST" });
const fetchTodosSuccess = (todos: any, statuses: any, tags: any) => ({
  type: "FETCH_TODOS_SUCCESS",
  todos,
  statuses,
  tags,
});
const fetchTodosFailure = () => ({ type: "FETCH_TODOS_FAILURE" });

export const fetchTodos: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchTodosRequest());

    const { data, status } = await axios.get("/my-todos");

    if (status === 200) {
      dispatch(fetchTodosSuccess(data.todos, data.statuses, data.tags));
    } else {
      dispatch(fetchTodosFailure());
    }
  };
};

const fetchKanbanRequest = () => ({ type: "FETCH_KANBAN_REQUEST" });
const fetchKanbanSuccess = (board: any, statuses: any, tags: any) => ({
  type: "FETCH_KANBAN_SUCCESS",
  board,
  statuses,
  tags,
});
const fetchKanbanFailure = () => ({ type: "FETCH_KANBAN_FAILURE" });

export const fetchKanban: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchKanbanRequest());

    const { data, status } = await axios.get("/kanban");

    if (status === 200) {
      dispatch(fetchKanbanSuccess(data.board, data.statuses, data.tags));
    } else {
      dispatch(fetchKanbanFailure());
    }
  };
};

const fetchCalendarRequest = () => ({ type: "FETCH_CALENDAR_REQUEST" });
const fetchCalendarSuccess = (todos: any, statuses: any, tags: any) => ({
  type: "FETCH_CALENDAR_SUCCESS",
  todos,
  statuses,
  tags,
});
const fetchCalendarFailure = () => ({ type: "FETCH_CALENDAR_FAILURE" });

export const fetchCalendar: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchCalendarRequest());

    const { data, status } = await axios.get("/calendar");

    if (status === 200) {
      dispatch(fetchCalendarSuccess(data.todos, data.statuses, data.tags));
    } else {
      dispatch(fetchCalendarFailure());
    }
  };
};

const fetchDashboardRequest = () => ({ type: "FETCH_DASHBOARD_REQUEST" });
const fetchDashboardSuccess = (columns: any, tags: any) => ({
  type: "FETCH_DASHBOARD_SUCCESS",
  columns,
  tags,
});
const fetchDashboardFailure = () => ({ type: "FETCH_DASHBOARD_FAILURE" });

export const fetchDashboard: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchDashboardRequest());

    const { data, status } = await axios.get("/dashboard");

    if (status === 200) {
      dispatch(fetchDashboardSuccess(data.columns, data.tags));
    } else {
      dispatch(fetchDashboardFailure());
    }
  };
};

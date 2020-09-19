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
const fetchKanbanSuccess = (board: any) => ({
  type: "FETCH_KANBAN_SUCCESS",
  board,
});
const fetchKanbanFailure = () => ({ type: "FETCH_KANBAN_FAILURE" });

export const fetchKanban: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchKanbanRequest());

    const { data, status } = await axios.get("/kanban");

    if (status === 200) {
      dispatch(fetchKanbanSuccess(data.board));
    } else {
      dispatch(fetchKanbanFailure());
    }
  };
};

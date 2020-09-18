import axios from "axios";

axios.defaults.validateStatus = (status) => status < 500;

const fetchTodosRequest = () => ({ type: "FETCH_TODOS_REQUEST" });
const fetchTodosSuccess = (todos: any) => ({
  type: "FETCH_TODOS_SUCCESS",
  todos,
});
const fetchTodosFailure = () => ({ type: "FETCH_TODOS_FAILURE" });

export const fetchTodos: any = () => {
  return async (dispatch: any) => {
    dispatch(fetchTodosRequest());

    const { data, status } = await axios.get("/my-todos");

    if (status === 200) {
      dispatch(fetchTodosSuccess(data.todos));
    } else {
      dispatch(fetchTodosFailure());
    }
  };
};

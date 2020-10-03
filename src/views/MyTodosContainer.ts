import { connect } from "react-redux";
import { fetchTodos } from "../actions";
import MyTodos from "./MyTodos";

const mapStateToProps = ({
  todos,
  auth,
}: {
  todos: any;
  statuses: any;
  auth: any;
  tags: any;
}) => ({
  todos: todos.todos,
  statuses: todos.statuses,
  tags: todos.tags,
  auth,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTodos: () => dispatch(fetchTodos()),
});

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(MyTodos);

export default TodosContainer;

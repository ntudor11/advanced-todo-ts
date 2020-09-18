import { connect } from "react-redux";
import { fetchTodos } from "../actions";
import MyTodos from "./MyTodos";

const mapStateToProps = ({ todos, auth }: { todos: any; auth: any }) => ({
  todos: todos.todos,
  auth,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTodos: () => dispatch(fetchTodos()),
});

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(MyTodos);

export default TodosContainer;

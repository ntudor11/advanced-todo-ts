import { connect } from "react-redux";
import { fetchTodos } from "../actions";
import MyTodos from "./MyTodos";

type IProps = {
  todos: any[];
  statuses: any[];
  tags: any[];
};

const mapStateToProps = ({ todos }: { todos: IProps }) => ({
  todos: todos.todos,
  statuses: todos.statuses,
  tags: todos.tags,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTodos: () => dispatch(fetchTodos()),
});

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(MyTodos);

export default TodosContainer;

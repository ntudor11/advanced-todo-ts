export interface IModalTaskProps {
  showModal: string | null;
  formIds: any;
  handleClose: () => void;
  statuses: any[];
  tags: any[];
  stateEditTodo: any;
  fetchTodos: Function;
}

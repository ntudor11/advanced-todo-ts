const initialState = {
  fetching: false,
  todos: [],
};

const todosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_TODOS_SUCCESS":
      return { ...state, fetching: false, todos: action.todos };
    default:
      return state;
  }
};

export default todosReducer;

const initialState = {
  fetching: false,
  todos: [],
  tags: [],
  statuses: [],
};

const todosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        fetching: false,
        todos: action.todos,
        statuses: action.statuses,
        tags: action.tags,
      };
    default:
      return state;
  }
};

export default todosReducer;

const initialState = {
  fetching: false,
  columns: [],
  tags: [],
  todos: [],
};

const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_DASHBOARD_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_DASHBOARD_SUCCESS":
      return {
        ...state,
        fetching: false,
        columns: action.columns,
        tags: action.tags,
        todos: action.todos,
      };
    default:
      return state;
  }
};

export default dashboardReducer;

const initialState = {
  fetching: false,
  todos: [],
  tags: [],
  statuses: [],
};

const calendarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_CALENDAR_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_CALENDAR_SUCCESS":
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

export default calendarReducer;

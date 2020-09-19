const initialState = {
  fetching: false,
  board: [],
};

const kanbanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_KANBAN_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_KANBAN_SUCCESS":
      return {
        ...state,
        fetching: false,
        board: action.board,
      };
    default:
      return state;
  }
};

export default kanbanReducer;

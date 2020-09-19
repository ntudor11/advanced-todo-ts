import { connect } from "react-redux";
import { fetchKanban } from "../actions";
import Kanban from "./Kanban";

const mapStateToProps = ({ kanban }: { kanban: any }) => ({
  board: kanban.board,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchKanban: () => dispatch(fetchKanban()),
});

const KanbanContainer = connect(mapStateToProps, mapDispatchToProps)(Kanban);

export default KanbanContainer;

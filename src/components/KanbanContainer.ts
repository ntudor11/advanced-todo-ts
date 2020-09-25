import { connect } from "react-redux";
import { fetchKanban } from "../actions";
import Kanban from "./Kanban";

const mapStateToProps = ({ kanban }: { kanban: any }) => ({
  board: kanban.board,
  statuses: kanban.statuses,
  tags: kanban.tags,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchKanban: () => dispatch(fetchKanban()),
});

const KanbanContainer = connect(mapStateToProps, mapDispatchToProps)(Kanban);

export default KanbanContainer;

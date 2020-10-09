import { connect } from "react-redux";
import { fetchKanban } from "../actions";
import Kanban from "./Kanban";

type IProps = {
  board: Object;
  statuses: any[];
  tags: any[];
};

const mapStateToProps = ({ kanban }: { kanban: IProps }) => ({
  board: kanban.board,
  statuses: kanban.statuses,
  tags: kanban.tags,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchKanban: () => dispatch(fetchKanban()),
});

const KanbanContainer = connect(mapStateToProps, mapDispatchToProps)(Kanban);

export default KanbanContainer;

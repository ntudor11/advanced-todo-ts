import { connect } from "react-redux";
import { fetchDashboard } from "../actions";
import Dashboard from "./Dashboard";

type IProps = {
  todos: any[];
  columns: any[];
  tags: any[];
};

const mapStateToProps = ({ dashboard }: { dashboard: IProps }) => ({
  columns: dashboard.columns,
  tags: dashboard.tags,
  todos: dashboard.todos,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchDashboard: () => dispatch(fetchDashboard()),
});

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;

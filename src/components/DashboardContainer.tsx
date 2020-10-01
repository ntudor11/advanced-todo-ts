import { connect } from "react-redux";
import { fetchDashboard } from "../actions";
import Dashboard from "./Dashboard";

const mapStateToProps = ({ dashboard }: { dashboard: any }) => ({
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

import { connect } from "react-redux";
import { fetchCalendar } from "../actions";
import Calendar from "./Calendar";

const mapStateToProps = ({
  calendar,
}: {
  calendar: any;
  statuses: any;
  auth: any;
  tags: any;
}) => ({
  todos: calendar.todos,
  statuses: calendar.statuses,
  tags: calendar.tags,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchCalendar: () => dispatch(fetchCalendar()),
});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;

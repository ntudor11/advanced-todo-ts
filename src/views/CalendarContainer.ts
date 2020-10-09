import { connect } from "react-redux";
import { fetchCalendar } from "../actions";
import Calendar from "./Calendar";

type IProps = {
  todos: any[];
  statuses: any[];
  tags: any[];
};

const mapStateToProps = ({ calendar }: { calendar: IProps }) => ({
  todos: calendar.todos,
  statuses: calendar.statuses,
  tags: calendar.tags,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchCalendar: () => dispatch(fetchCalendar()),
});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;

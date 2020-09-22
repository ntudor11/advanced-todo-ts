import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "@lourenci/react-kanban/dist/styles.css";

interface IProps {
  fetchCalendar: any;
  statuses: any;
  todos: any;
  tags: any;
}

const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

class Calendar extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchCalendar } = this.props;
    fetchCalendar();
  }

  render() {
    const { todos, statuses, fetchCalendar, tags } = this.props;
    console.log(todos);

    return (
      <Container fluid className="body">
        <Row className="addNewButtons">
          <Col xs={3}>
            <Button
              size="sm"
              block
              className="btnDefault"
              type="submit"
              variant="outline-info"
              onClick={() => {
                // this.handleShow(formIds.newTask);
              }}
            >
              New Task <i className="icon mdi mdi-format-list-checkbox" />
            </Button>
          </Col>

          <Col xs={3}>
            <Button
              size="sm"
              className="btnDefault"
              block
              type="submit"
              variant="outline-info"
              onClick={() => {
                // this.handleShow(formIds.newTag);
              }}
            >
              Tags <i className="icon mdi mdi-tag-outline" />
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: "2em" }}>
          <Col sm={{ span: 10, offset: 1 }}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                bootstrapPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              fixedWeekCount={false}
              themeSystem="bootstrap"
              events={todos}
              select={this.handleDateSelect}
              eventContent={this.renderEventContent}
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* update db below:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
          </Col>
        </Row>
      </Container>
    );
  }

  handleEventClick = (clickInfo: any) => {
    console.log(clickInfo.event);
  };

  handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEvents = (events: any) => {
    this.setState({
      currentEvents: events,
    });
  };

  renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  renderSidebarEvent(event: any) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }
}

export default Calendar;

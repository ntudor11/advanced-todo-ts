import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import ButtonsRow, { formIds } from "../components/ButtonsRow";
import { ModalNewTask } from "../views/modals/ModalNewTask";
import { ModalEditTask } from "../views/modals/ModalEditTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";

interface IProps {
  fetchCalendar: Function;
  statuses: string[];
  todos: any;
  tags: string[];
}

interface IState {
  showModal: string | null;
  editTodo: any;
  vw: number;
  currentEvents?: Object;
}

class Calendar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: "",
      editTodo: {
        tagsArr: [],
        tags: [],
      },
      vw: window.innerWidth,
    };
  }

  componentDidMount() {
    const { fetchCalendar } = this.props;
    fetchCalendar();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  // update window width value on resize
  updateDimensions = () => {
    const width = window.innerWidth;
    if (window.innerWidth < 476) {
      this.setState({ vw: width });
    } else {
      let update_width = window.innerWidth - 100;
      this.setState({ vw: update_width });
    }
  };

  handleShow = (id: string) => {
    this.setState({ showModal: id });
  };

  handleClose = () => {
    this.setState({
      showModal: null,
    });
  };

  // set state for clicked event to allow editing
  handleEventClick = (info: any) => {
    const { editTodo } = this.state;
    this.setState({
      editTodo: {
        ...editTodo,
        id: info.event.id,
        task: info.event.title,
        description: info.event.extendedProps.description,
        priority: info.event.extendedProps.priority,
        status: {
          statusId: info.event.extendedProps.status.statusId,
          statusName: info.event.extendedProps.status.statusName,
        },
        tags: info.event.extendedProps.tags.map((tag: string) => tag),
        deadline: info.event.start && info.event.start.toISOString(),
      },
    });
    this.handleShow(formIds.viewTask);
  };

  render() {
    const { todos, statuses, fetchCalendar, tags } = this.props;
    const { showModal, editTodo, vw } = this.state;

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />

        <Row style={{ marginTop: "2em" }}>
          <Col sm={{ span: 10, offset: 1 }}>
            {vw >= 476 ? (
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
                eventColor="#17a2b8"
                editable={true}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                fixedWeekCount={false}
                themeSystem="bootstrap"
                events={todos}
                eventClick={this.handleEventClick}
              />
            ) : (
              <p className="text-left">
                Calendar cannot render in a small width. Resize window or rotate
                your device into a landscape position and then refresh the page.
              </p>
            )}
          </Col>
        </Row>

        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          statuses={statuses}
          tags={tags}
          stateEditTodo={editTodo}
          fetchTodos={fetchCalendar}
        />

        <ModalNewTag
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          tags={tags}
          todos={todos}
          fetchTodos={fetchCalendar}
        />

        <ModalEditTask
          formIds={formIds}
          showModal={showModal}
          stateEditTodo={editTodo}
          handleClose={this.handleClose}
          tags={tags}
          statuses={statuses}
          fetchTodos={fetchCalendar}
        />
      </Container>
    );
  }
}

export default Calendar;

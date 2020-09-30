import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ButtonsRow, { formIds } from "./ButtonsRow";
import { ModalNewTask } from "../views/modals/ModalNewTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";
import { updateTodoStatus, deleteTodo } from "./Functions";

interface IProps {
  fetchKanban: any;
  board: any;
  statuses: any;
  tags: any;
}

class Dashboard extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editTodo: {
        tagsArr: [],
        tags: [],
      },
      showModal: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // const { fetchKanban } = this.props;
    // fetchKanban();
  }

  handleShow(id: string) {
    this.setState({ showModal: id });
  }

  handleClose() {
    this.setState({
      showModal: null,
    });
  }

  onDelete = (itemId: any) => {
    // const { fetchKanban } = this.props;
    deleteTodo({ itemId }).then((res: any) => {
      if (res) {
        try {
          // fetchKanban();
        } catch (e) {
          console.log(`${e}`);
        }
      }
    });
  };

  handleMove = (itemId: any, oldStatus: any, direction: number) => {
    const { fetchKanban } = this.props;
    const statusId = oldStatus + direction;
    console.log(`card ${itemId} in status ${statusId}`);
    updateTodoStatus({ itemId, statusId }).then((res: any) => {
      if (res) {
        try {
          fetchKanban();
        } catch (e) {
          console.log(`${e}`);
        }
      }
    });
  };

  render() {
    const { fetchKanban, statuses, tags } = this.props;
    const { showModal, editTodo } = this.state;

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />
        <h3>Dashboard</h3>

        <Row className="flex-row flex-nowrap kanbanContainer"></Row>

        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          taskObj={editTodo}
          statuses={statuses}
          tags={tags}
          stateEditTodo={editTodo}
          fetchTodos={fetchKanban}
        />

        <ModalNewTag
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          tags={tags}
          // todos={flatTodos}
          fetchTodos={fetchKanban}
        />
      </Container>
    );
  }
}

export default Dashboard;

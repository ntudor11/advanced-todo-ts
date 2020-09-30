import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ButtonsRow, { formIds } from "./ButtonsRow";
import { ModalNewTask } from "../views/modals/ModalNewTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";
import { deleteTodo } from "./Functions";

interface IProps {
  fetchDashboard: any;
  columns: any;
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
    const { fetchDashboard } = this.props;
    fetchDashboard();
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
    const { fetchDashboard } = this.props;
    deleteTodo({ itemId }).then((res: any) => {
      if (res) {
        try {
          fetchDashboard();
        } catch (e) {
          console.log(`${e}`);
        }
      }
    });
  };

  render() {
    const { fetchDashboard, tags, columns } = this.props;
    const { showModal, editTodo } = this.state;

    const flatTodos =
      columns && columns.map((cols: any) => [].concat(cols.cards)).flat();

    console.log(tags, columns);

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />
        <h3>Dashboard</h3>

        <Row className="flex-row flex-nowrap dashboardContainer"></Row>

        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          taskObj={editTodo}
          statuses={columns}
          tags={tags}
          stateEditTodo={editTodo}
          fetchTodos={fetchDashboard}
        />

        <ModalNewTag
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          tags={tags}
          todos={flatTodos}
          fetchTodos={fetchDashboard}
        />
      </Container>
    );
  }
}

export default Dashboard;

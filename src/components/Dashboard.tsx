import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
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

    const colorsTags = [
      "rgba(76, 60, 77, 1)",
      "rgba(139, 182, 165, 1)",
      "rgba(213, 244, 231, 1)",
      "rgba(131, 140, 150)",
      "rgba(106, 112, 110)",
    ];

    const colorsCols = [
      "rgba(59, 60, 59, 1)",
      "rgba(128, 61, 32, 1)",
      "rgba(189, 147, 56, 1)",
      "rgba(31, 149, 103, 1)",
    ];

    const pieDataTags = (array: any) => {
      const data: any = {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: "rgba(0, 0, 255, 0)",
          },
        ],
        labels: [],
      };
      array.forEach((tag: any) => {
        data.labels.push(tag.tagName);
        const value: any = tag.todoCount;
        data.datasets[0].data.push(value);
        colorsTags.forEach((color: any) =>
          data.datasets[0].backgroundColor.push(color)
        );
      });
      return data;
    };

    const pieDataCols = (array: any) => {
      const data: any = {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: "rgba(0, 0, 255, 0)",
          },
        ],
        labels: [],
      };
      array.forEach((tag: any) => {
        data.labels.push(tag.statusName);
        const value: any = tag.cardCount;
        data.datasets[0].data.push(value);
        colorsCols.forEach((color: any) =>
          data.datasets[0].backgroundColor.push(color)
        );
      });
      return data;
    };

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />

        <Row className="piechartsContainer">
          <Col xs={12} sm={6}>
            <Doughnut
              data={pieDataTags(tags)}
              options={{
                legend: { position: "bottom" },
                cutoutPercentage: "75",
              }}
            />
            <h4>Tags Stats</h4>
          </Col>
          <Col xs={12} sm={6}>
            <Doughnut
              data={pieDataCols(columns)}
              options={{
                legend: { position: "bottom" },
                cutoutPercentage: "75",
              }}
            />
            <h4>Progress Stats</h4>
          </Col>
        </Row>

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

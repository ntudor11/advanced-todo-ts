import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Doughnut, Line } from "react-chartjs-2";
import ButtonsRow, { formIds } from "../components/ButtonsRow";
import { ModalNewTask } from "../views/modals/ModalNewTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";

interface IProps {
  fetchDashboard: Function;
  columns: Object[];
  tags: string[];
  todos: any;
}

interface IState {
  showModal: string | null;
  editTodo: any;
}

class Dashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      editTodo: {
        tagsArr: [],
        tags: [],
      },
      showModal: "",
    };
  }

  componentDidMount() {
    const { fetchDashboard } = this.props;
    fetchDashboard();
  }

  handleShow = (id: string) => {
    this.setState({ showModal: id });
  };

  handleClose = () => {
    this.setState({
      showModal: null,
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

    // categorise todos by tag
    const pieDataTags = (array: any[]) => {
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
        const value: number = tag.todoCount;
        data.datasets[0].data.push(value);
        colorsTags.forEach((color: string) =>
          data.datasets[0].backgroundColor.push(color)
        );
      });
      return data;
    };

    // categorise todos by status
    const pieDataCols = (array: any[]) => {
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
        const value: number = tag.cardCount;
        data.datasets[0].data.push(value);
        colorsCols.forEach((color: string) =>
          data.datasets[0].backgroundColor.push(color)
        );
      });
      return data;
    };

    // TODO add daily status of all todos (eg. todo, doing, done)
    const chartData = () => {
      const testData: any = {
        labels: [],
        datasets: [
          {
            label: "Backlog",
            data: [20, 15, 24, 30],
            backgroundColor: ["rgba(103, 103, 103, 0.25)"],
          },
          {
            label: "To do",
            data: [7, 8, 8, 15],
            backgroundColor: ["rgba(128, 61, 32, .45)"],
          },
          {
            label: "Doing",
            data: [8, 12, 8, 9],
            backgroundColor: ["rgba(189, 147, 56, .65)"],
          },
          {
            label: "Done",
            data: [12, 14, 17, 22],
            backgroundColor: ["rgba(31, 149, 103, .85)"],
          },
        ],
      };

      for (let i = 29; i >= 0; i--) {
        testData.labels.push(
          new Date(new Date().setDate(new Date().getDate() - i))
            .toLocaleString()
            .split(",", 1)
        );
        testData.datasets[0].data.push(i);
        testData.datasets[1].data.push(i + 2);
        testData.datasets[2].data.push(i + 5);
        testData.datasets[3].data.push(i + 7);
      }

      return testData;
    };

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />

        <Row className="piechartsContainer">
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
        </Row>

        <Row className="piechartsContainer">
          <Col xs={{ span: 10, offset: 1 }}>
            <h4>Timeline</h4>
            <Line
              data={chartData}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxes: [
                    {
                      scaleLabel: {
                        display: false,
                        labelString: "1k = 1000",
                      },
                      stacked: true,
                    },
                  ],
                },
              }}
            />
          </Col>
        </Row>

        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
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

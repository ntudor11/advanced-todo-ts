import React, { Component } from "react";
import { Container, Row, Col, Button, Table, Badge } from "react-bootstrap";
import _ from "lodash";
import FlipMove from "react-flip-move";
import "react-input-range/lib/css/index.css";
import { deleteTodo, updateTodoStatus } from "../components/Functions";
import ButtonsRow, { formIds } from "../components/ButtonsRow";
import FilterSearch from "../components/FilterSearch";
import { ModalEditTask } from "../views/modals/ModalEditTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";
import { ModalNewTask } from "../views/modals/ModalNewTask";

interface IProps {
  fetchTodos: Function;
  statuses: Object[];
  todos: any[];
  tags: string[];
}

class MyTodos extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      filterStr: "",
      isActive: 1,
      range: {
        min: "",
        max: "",
      },
      sortBy: "priority",
      showModal: "",
      editTodo: {
        tagsArr: [],
        tags: [],
      },
      newTag: { tagName: "", tagColor: "" },
    };
  }

  getDeadlines = () => {
    const { todos } = this.props;
    const arr: any[] = [];
    todos.forEach((item: any) => {
      arr.push(item.deadline);
    });
    return arr;
  };

  getMin = (arr: any[]) => {
    if (!arr) {
      return null;
    }
    var minV = arr[0];
    arr.forEach((a: number) => {
      if (a < minV) minV = a;
    });
    return minV;
  };

  getMax = (arr: any[]) => {
    if (!arr) {
      return null;
    }
    var maxV = arr[0];
    arr.forEach((a: number) => {
      if (a > maxV) maxV = a;
    });
    return maxV;
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    this.setState({ [target.name]: value });
  };

  // show specific modal
  handleShow = (id: string) => {
    this.setState({ showModal: id });
  };

  // close specific modal
  handleClose = () => {
    this.setState({
      showModal: null,
    });
  };

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  componentDidUpdate() {
    const { range } = this.state;

    // add dynamic values to filter slider if it doesn't have any
    if (range.min === "" || range.max === "") {
      this.setState({
        range: {
          ...range,
          min: new Date(this.getMin(this.getDeadlines())).getTime(),
          max: new Date(this.getMax(this.getDeadlines())).getTime(),
        },
      });
    }
  }

  render() {
    const { todos, statuses, fetchTodos, tags } = this.props;

    const {
      filterStr,
      isActive,
      range,
      sortBy,
      editTodo,
      showModal,
    } = this.state;

    // real-time filtering (no refresh required)
    const filteredElementsAll =
      todos &&
      todos.filter(
        (item: any) =>
          (item.task.toLowerCase().includes(filterStr.toLowerCase()) &&
            new Date(item.deadline).getTime() >= range.min &&
            new Date(item.deadline).getTime() <= range.max) ||
          (item.description.toLowerCase().includes(filterStr.toLowerCase()) &&
            new Date(item.deadline).getTime() >= range.min &&
            new Date(item.deadline).getTime() <= range.max) ||
          (item.priority.toLowerCase().includes(filterStr.toLowerCase()) &&
            new Date(item.deadline).getTime() >= range.min &&
            new Date(item.deadline).getTime() <= range.max)
      );

    const filterActive =
      todos &&
      filteredElementsAll.filter(
        (item: any) =>
          item.status.statusId !== 4 &&
          new Date(item.deadline).getTime() >= range.min &&
          new Date(item.deadline).getTime() <= range.max
      );

    /* better sort: sorting and leaving to end of array items with statusId === 4 */
    const sortedTodos = (arr: any) =>
      (sortBy === "priority" &&
        _.orderBy(
          arr,
          [
            function (resultItem) {
              return resultItem.status.statusId === 4;
            },
            "priority",
            "deadline",
          ],
          ["asc", "asc"]
        )) ||
      (sortBy === "task" &&
        _.orderBy(
          arr,
          [
            function (resultItem) {
              return resultItem.status.statusId === 4;
            },
            "task",
            "deadline",
          ],
          ["asc", "asc"]
        )) ||
      (sortBy === "date" &&
        _.orderBy(
          arr,
          [
            function (resultItem) {
              return resultItem.status.statusId === 4;
            },
            "deadline",
            "priority",
          ],
          ["asc", "asc"]
        ));

    // table row view of each todo
    const todoItem = (array: any) =>
      array.map((item: any) => (
        <tr
          key={item.id}
          className={`todoItem ${item.status.statusId === 4 && `doneItem`}`}
        >
          <th className="align-middle">
            <div className="pretty p-icon p-round p-bigger">
              <input
                type="checkbox"
                defaultChecked={item.status.statusId === 4}
                onClick={() => {
                  const statusId = item.status.statusId !== 4 ? 4 : 1;
                  const itemId = item.id;
                  updateTodoStatus({ itemId, statusId }).then(
                    (res: boolean) => {
                      if (res) {
                        try {
                          fetchTodos();
                        } catch (e) {
                          console.log(`${e}`);
                        }
                      }
                    }
                  );
                }}
              />
              <div className="state">
                <i className="icon mdi mdi-check"></i>
                <label />
              </div>
            </div>
          </th>

          <th className="text-left">
            <p>
              <span
                className={`mdi mdi-arrow-up-thick ${
                  item.priority === "Low" && `priorityLow`
                } ${item.priority === "Medium" && `priorityMedium`}
                ${item.priority === "High" && `priorityHigh`}`}
              />
            </p>
          </th>

          <th className="text-left">
            <p
              className="taskNameTh"
              onClick={() => {
                this.setState({
                  editTodo: {
                    ...editTodo,
                    id: item.id,
                    task: item.task,
                    description: item.description,
                    priority: item.priority,
                    status: {
                      statusId: item.status.statusId,
                      statusName: item.status.statusName,
                    },
                    tags: item.tags.map((tag: string) => tag),
                    deadline: item.deadline,
                  },
                });
                this.handleShow(formIds.viewTask);
              }}
            >
              {item.task}
            </p>
          </th>

          <th className="text-left tagsField">
            <p>
              {item.tags &&
                item.tags.map((tag: any) => (
                  <Badge
                    key={tag.tagId}
                    style={{ backgroundColor: tag.color }}
                    className="tagSpan"
                  >
                    {tag.tagName}
                  </Badge>
                ))}
            </p>
          </th>

          <th className="text-left">
            <p>{new Date(item.deadline).toLocaleString()}</p>
          </th>

          <th className="align-middle">
            <Button
              size="sm"
              className="btnDefault"
              type="submit"
              variant="outline-danger"
              onClick={() => {
                const itemId = item.id;
                deleteTodo({ itemId }).then((res: boolean) => {
                  if (res) {
                    try {
                      fetchTodos();
                    } catch (e) {
                      console.log(`${e}`);
                    }
                  }
                });
              }}
            >
              <i className="icon mdi mdi-delete-outline" />
            </Button>
          </th>
        </tr>
      ));

    return (
      <Container fluid className="body">
        <Row
          id="row-login"
          className="justify-content-sm-center row-loginSignup"
        >
          <Col xs={12} sm={8} md={3} className="asidePanel sticky-top">
            <ButtonsRow handleShow={this.handleShow} colSize={6} />

            <FilterSearch
              filterStr={filterStr}
              setFilterStr={(e: any) =>
                this.setState({ filterStr: e.target.value })
              }
              isActive={isActive}
              onChange={this.onChange}
              getMax={this.getMax}
              getMin={this.getMin}
              getDeadlines={this.getDeadlines}
              range={this.state.range}
              setRange={(range: any) => this.setState({ range })}
              sortBy={sortBy}
            />
          </Col>
          <Col xs={{ span: 12 }} md={9}>
            <Row className="justify-content-sm-center">
              <Col sm={10} md={8} className="loginBlock">
                <h2>My Todos</h2>

                <Table
                  hover
                  size="sm"
                  responsive="xs"
                  className="table"
                  id="todosTable"
                >
                  <FlipMove typeName="tbody" easing="ease">
                    {isActive === 1
                      ? todoItem(
                          sortBy ? sortedTodos(filterActive) : filterActive
                        )
                      : todoItem(
                          sortBy
                            ? sortedTodos(filteredElementsAll)
                            : filteredElementsAll
                        )}
                  </FlipMove>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>

        <ModalNewTag
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          tags={tags}
          todos={todos}
          fetchTodos={fetchTodos}
        />
        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          statuses={statuses}
          tags={tags}
          stateEditTodo={editTodo}
          fetchTodos={fetchTodos}
        />
        <ModalEditTask
          formIds={formIds}
          showModal={showModal}
          stateEditTodo={editTodo}
          handleClose={this.handleClose}
          tags={tags}
          statuses={statuses}
          fetchTodos={fetchTodos}
        />
      </Container>
    );
  }
}
export default MyTodos;

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import InputRange from "react-input-range";
import FlipMove from "react-flip-move";
import "react-input-range/lib/css/index.css";
import {
  deleteTodo,
  updateTodoStatus,
  addNewTag,
  removeTag,
} from "./Functions";
import { ModalEditTask } from "../views/modals/ModalEditTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";

const formIds = {
  viewTask: "view-task",
  newTag: "new-tag",
  newTask: "new-task",
};

class MyTodos extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      task: "",
      description: "",
      deadline: "",
      priority: "",
      status: {},
      todos: [],
      filterStr: "",
      isActive: 1,
      range: { min: 1, max: 10 },
      sortBy: "priority",
      showModal: "",
      editTodo: {},
      newTag: { tagName: "", tagColor: "" },
      statuses: [],
      tags: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEditTodo = this.onChangeEditTodo.bind(this);
    this.onChangeNewTag = this.onChangeNewTag.bind(this);
    this.onChangeNewTagColor = this.onChangeNewTagColor.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onSubmitNewTag = this.onSubmitNewTag.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.getDeadlines = this.getDeadlines.bind(this);
    this.getMin = this.getMin.bind(this);
    this.getMax = this.getMax.bind(this);
    this.delTag = this.delTag.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  getDeadlines() {
    const { todos } = this.state;
    const arr: any = [];
    todos.forEach((item: any) => {
      arr.push(item.deadline);
    });
    return arr;
  }

  getMin(arr: any) {
    // return Math.min(...arr);
    if (!arr) {
      return null;
    }
    var minV = arr[0];
    arr.forEach((a: any) => {
      if (a < minV) minV = a;
    });
    return minV;
  }

  getMax(arr: any) {
    // return Math.max(...arr);
    if (!arr) {
      return null;
    }
    var maxV = arr[0];
    arr.forEach((a: any) => {
      if (a > maxV) maxV = a;
    });
    return maxV;
  }

  getMinMax(arr: any) {
    if (!arr) {
      return null;
    }
    var minV = arr[0];
    var maxV = arr[0];
    arr.forEach((a: any) => {
      if (a < minV) minV = a;
      if (a > maxV) maxV = a;
    });
    return { minV, maxV };
  }

  onChange(e: any) {
    const { target } = e;
    const value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    this.setState({ [target.name]: value });
  }

  onChangeEditTodo(e: any) {
    const { editTodo } = this.state;
    this.setState({
      editTodo: {
        ...editTodo,
        [e.target.name]: e.target.value,
      },
    });
  }

  onChangeNewTag(e: any) {
    const { newTag } = this.state;
    this.setState({
      newTag: {
        ...newTag,
        [e.target.name]: e.target.value,
      },
    });
  }

  delTag(tagId: any) {
    const { todos } = this.state;
    const tagsArr: string[] = [];
    todos.map((todo: any) =>
      todo.tags.forEach((tag: any) => {
        tagsArr.push(tag.tagId);
      })
    );
    if (!tagsArr.includes(tagId.tagId)) {
      removeTag(tagId).then((res: any) => {
        if (res) {
          try {
            fetch(`/tags`)
              .then((data) => data.json())
              .then((data) => {
                this.setState({ tags: data });
              });
          } catch (e) {
            console.log(`${e}`);
          }
        }
      });
    } else {
      console.log("tag cannot be deleted");
    }
  }

  onChangeNewTagColor(color: any) {
    const { newTag } = this.state;
    this.setState({
      newTag: {
        ...newTag,
        tagColor: color.hex,
      },
    });
  }

  convertDate(date: any) {
    const { editTodo } = this.state;
    this.setState({
      editTodo: {
        ...editTodo,
        deadline: date.toISOString(),
      },
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
  }

  onSubmitEdit(e: any) {
    e.preventDefault();
  }

  onSubmitNewTag(e: any) {
    e.preventDefault();
    const { newTag, tags } = this.state;
    if (
      tags &&
      !tags
        .map((tag: any) => {
          return tag.tagName;
        })
        .includes(newTag.tagName)
    ) {
      addNewTag(newTag).then((res: any) => {
        if (res) {
          // this.handleClose();
          try {
            fetch(`/tags`)
              .then((data) => data.json())
              .then((data) => {
                this.setState({
                  tags: data,
                  newTag: { tagName: "", tagColor: "" },
                });
              });
          } catch (e) {
            console.log(`${e}`);
          }
        }
      });
    } else {
      console.log("This tag already exists!");
    }
  }

  handleShow(id: string) {
    this.setState({ showModal: id });
  }

  handleClose() {
    this.setState({ showModal: null });
  }

  componentDidMount() {
    try {
      fetch("/api/checkToken")
        .then((data) => data.json())
        .then(({ userId, type }) =>
          this.setState({ loggedInUser: userId, loggedUserType: type })
        );
    } catch (e) {
      console.log(`${e} not authenticated`);
    }

    fetch(`/my-todos`)
      .then((data) => data.json())
      .then((data) => {
        this.setState(data);
      });

    fetch(`/tags`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ tags: data });
      });
  }

  render() {
    const {
      email,
      task,
      description,
      deadline,
      priority,
      tags,
      status,
      todos,
      filterStr,
      isActive,
      range,
      sortBy,
      editTodo,
      newTag,
      showModal,
      statuses,
    } = this.state;

    // const { task, description, deadline, priority, tags, status } = todos;
    // const { statusId, statusName } = status;
    // const { tagId, color, tagName } = tags;

    console.log(this.state);

    const filteredElementsAll =
      todos &&
      todos.filter(
        (item: any) =>
          item.task.toLowerCase().includes(filterStr.toLowerCase()) ||
          item.description.toLowerCase().includes(filterStr.toLowerCase()) ||
          // item.deadline.toLowerCase().includes(filterStr.toLowerCase()) ||
          item.priority.toLowerCase().includes(filterStr.toLowerCase())
      );

    const filterActive =
      todos &&
      filteredElementsAll.filter(
        (item: any) => item.status.statusId !== 4 // &&
        // item.deadline >= range.min &&
        // item.deadline <= range.max
      );

    const sortedTodos = (arr: any) =>
      (sortBy === "priority" &&
        arr.sort((a: any, b: any) => a.priority.localeCompare(b.priority))) ||
      (sortBy === "task" &&
        arr.sort((a: any, b: any) => a.task.localeCompare(b.task))) ||
      (sortBy === "date" &&
        arr.sort((a: any, b: any) => a.deadline.localeCompare(b.deadline)));

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
                  updateTodoStatus({ itemId, statusId }).then((res: any) => {
                    if (res) {
                      try {
                        fetch(`my-todos`)
                          .then((data) => data.json())
                          .then((data) => this.setState(data));
                      } catch (e) {
                        console.log(`${e}`);
                      }
                    }
                  });
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
                    tags: item.tags.map((tag: any) => tag),
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
              {item.tags.map((tag: any) => (
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
              variant="outline-info"
              onClick={() => {
                const itemId = item.id;
                deleteTodo({ itemId }).then((res: any) => {
                  if (res) {
                    try {
                      fetch(`/my-todos`)
                        .then((data) => data.json())
                        .then((data) => {
                          this.setState(data);
                        });
                    } catch (e) {
                      console.log(`${e}`);
                    }
                  }
                });
              }}
            >
              🗑
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
          <Col xs={12} md={3} className="aside">
            <Row className="addNewButtons">
              <Col>
                <Button
                  size="sm"
                  block
                  className="btnDefault"
                  type="submit"
                  variant="outline-info"
                  onClick={() => {
                    this.handleShow(formIds.newTask);
                  }}
                >
                  New Task <i className="icon mdi mdi-format-list-checkbox" />
                </Button>
              </Col>

              <Col>
                <Button
                  size="sm"
                  className="btnDefault"
                  block
                  type="submit"
                  variant="outline-info"
                  onClick={() => {
                    this.handleShow(formIds.newTag);
                  }}
                >
                  New Tag <i className="icon mdi mdi-tag-outline" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <h3>Search</h3>

                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="search-input-left"
                  value={filterStr}
                  placeholder="Search here"
                  onChange={(e) => this.setState({ filterStr: e.target.value })}
                />

                <h3>Filter</h3>

                <div className="pretty p-default p-curve">
                  <input
                    type="checkbox"
                    name="isActive"
                    value={isActive}
                    onChange={this.onChange}
                    checked={isActive}
                  />
                  <div className="state p-info">
                    <label>Active</label>
                  </div>
                </div>

                <div>
                  <label>By Date</label>
                  <InputRange
                    // maxValue={this.getMax(this.getDeadlines())}
                    // minValue={this.getMin(this.getDeadlines())}
                    maxValue={10}
                    minValue={1}
                    allowSameValues={true}
                    step={1}
                    value={this.state.range}
                    onChange={(range) => this.setState({ range })}
                  />
                </div>

                <h3>Sort By</h3>

                <div>
                  <Form.Control
                    as="select"
                    name="sortBy"
                    value={sortBy}
                    onChange={this.onChange}
                  >
                    <option value="" disabled>
                      Choose Type
                    </option>
                    <option value="priority">Priority</option>
                    <option value="date">Date</option>
                    <option value="task">Task</option>
                  </Form.Control>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 12 }} md={9}>
            <Row className="justify-content-sm-center">
              <Col sm={8} md={8} className="loginBlock">
                <h2>My Todos</h2>

                <Table hover size="sm" responsive="xs" className="table">
                  {/*<thead>
                    <tr>
                      <th className="text-left">Status</th>
                      <th className="text-left" />
                      <th className="text-left">Task</th>
                      <th className="text-left">Tags</th>
                      <th className="text-left">Deadline</th>
                      <th />
                    </tr>
                  </thead>*/}
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
          newTag={newTag}
          onChangeNewTag={this.onChangeNewTag}
          onSubmitNewTag={this.onSubmitNewTag}
          activeColor={newTag.tagColor}
          delTag={(tagId: any) => this.delTag(tagId)}
          onChangeNewTagColor={this.onChangeNewTagColor}
          onExit={() =>
            this.setState({
              newTag: { tagName: "" },
            })
          }
        />

        <ModalEditTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          taskObj={editTodo}
          convertDate={this.convertDate}
          statuses={statuses}
          onExit={() =>
            this.setState({
              editTodo: {},
            })
          }
          onSubmit={async (payload: any) => {
            try {
              // await this.onSubmitInvest(payload);
              // this.showAlert();
              this.setState({
                alertText: "",
                isSuccess: true,
              });
            } catch (err) {
              // this.showAlert();
              this.setState({
                alertText: "",
                isSuccess: false,
              });
            }
          }}
          onChangeEditTodo={this.onChangeEditTodo}
        />
      </Container>
    );
  }
}

export default MyTodos;

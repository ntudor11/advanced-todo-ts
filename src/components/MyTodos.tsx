import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import InputRange from "react-input-range";
import FlipMove from "react-flip-move";
import "react-input-range/lib/css/index.css";
import { deleteTodo, updateTodoStatus } from "./Functions";

class MyTodos extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      task: "",
      description: "",
      deadline: "",
      priority: "",
      tags: "",
      status: {},
      todos: [],
      filterStr: "",
      isActive: 0,
      range: { min: 1, max: 21 },
      sortBy: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: any) {
    e.preventDefault();
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
    } = this.state;

    // const { task, description, deadline, priority, tags, status } = todos;
    // const { statusId, statusName } = status;
    // const { tagId, color, tagName } = tags;

    console.log(this.state);

    // const tasks = (arr: any[]) => arr.map(item );

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
        (item: any) =>
          item.status.statusName !== "Done" &&
          item.rating >= range.min &&
          item.rating <= range.max
      );

    const sortedTodos = (arr: any) => {
      switch (sortBy) {
        case "task":
          arr.sort((a: any, b: any) => a.task.localeCompare(b.task));
        case "date":
          arr.sort((a: any, b: any) => a.deadline.localeCompare(b.deadline));
      }
    };

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
                checked={item.status.statusId === 4}
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
                  console.log(item.status.statusId);
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
            <p>{item.task}</p>
          </th>

          <th className="text-left tagsField">
            <p>
              {item.tags.map((tag: any) => (
                <span
                  key={tag.tagId}
                  style={{ backgroundColor: tag.color }}
                  className="tagSpan"
                >
                  {tag.tagName}
                </span>
              ))}
            </p>
          </th>

          <th>
            <p>{item.deadline}</p>
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

    // todo array of all dates

    return (
      <Container fluid className="body">
        <Row
          id="row-login"
          className="justify-content-sm-center row-loginSignup"
        >
          <Col xs={12} md={3} className="aside">
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
              />
              <div className="state p-info">
                <label>Active</label>
              </div>
            </div>

            <div>
              <label>By Date</label>
              <InputRange
                maxValue={21}
                minValue={1}
                allowSameValues={true}
                step={1}
                value={this.state.range}
                onChange={(range) => this.setState({ range })}
              />
            </div>
          </Col>
          <Col xs={{ span: 12 }} md={9}>
            <Row className="justify-content-sm-center">
              <Col sm={8} md={8} className="loginBlock">
                <h2>My Todos</h2>

                <p>Authorised access only.</p>

                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group
                    className="formTemplate"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <br />

                    <Form.Group controlId="formBasicTask">
                      <Form.Control
                        type="text"
                        name="task"
                        placeholder="Enter Task"
                        value={task}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Button className="btnDefault" type="submit" variant="dark">
                      Login
                    </Button>
                  </Form.Group>
                </Form>

                {/* <ul id="todoListing">{todoItem(filteredElementsAll)}</ul> */}

                <Table
                  striped
                  hover
                  size="sm"
                  responsive="xs"
                  className="table"
                >
                  <thead>
                    <tr>
                      <th className="text-left">Status</th>
                      <th className="text-left" />
                      <th className="text-left">Task</th>
                      <th className="text-left">Tags</th>
                      <th className="text-left">Deadline</th>
                      <th />
                    </tr>
                  </thead>
                  <FlipMove typeName="tbody" easing="ease">
                    {todoItem(filteredElementsAll)}
                  </FlipMove>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyTodos;

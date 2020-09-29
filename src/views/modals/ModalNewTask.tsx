import React, { useState } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import _ from "lodash";
import "flatpickr/dist/themes/airbnb.css";
import { addTodo } from "../../components/Functions";

export const ModalNewTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    stateEditTodo,
    tags,
    statuses,
    fetchTodos,
  } = props;

  const [editTodo, setEditTodo] = useState(stateEditTodo);

  const setETD = (e: any) =>
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });

  const handleCheckboxChange = (e: any) => {
    const item = e.target.name;
    const { tagsArr } = editTodo;
    if (tagsArr && !tagsArr.includes(item)) {
      setEditTodo({
        ...editTodo,
        tagsArr: [...tagsArr, item],
      });
    } else {
      setEditTodo({
        ...editTodo,
        tagsArr: [...tagsArr.filter((check: any) => check !== item)],
      });
    }
  };

  const onSubmitEdit = (e: any) => {
    e.preventDefault();

    if (showModal === formIds.newTask) {
      addTodo(editTodo).then((res: any) => {
        if (res) {
          try {
            fetchTodos().then(() => {
              setEditTodo({ tagsArr: [] });
            });
          } catch (e) {
            console.log(`${e}`);
          }
          handleClose();
        }
      });
    }
  };

  const onChangeDeadline = (date: any) => {
    setEditTodo({
      ...editTodo,
      deadline: date[0].toISOString(),
    });
  };

  const date = new Date().toISOString();

  return (
    <Modal
      keyboard
      show={showModal === formIds.newTask}
      id={formIds.newTask}
      onHide={handleClose}
      onExit={() => setEditTodo({ tagsArr: [], tags: [] })}
      size="lg"
    >
      <Modal.Header>
        <Row className="topRowModal">
          <Col>
            <p>New Task</p>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form noValidate onSubmit={onSubmitEdit} id="formNewTask">
          <Form.Group className="formTemplate">
            <Container>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                      name="task"
                      defaultValue={editTodo.task}
                      onChange={setETD}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      as="select"
                      name="priority"
                      defaultValue=""
                      required
                      onChange={setETD}
                    >
                      <option value="" disabled>
                        Choose Priority
                      </option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="formTemplate">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="statusId"
                      defaultValue=""
                      required
                      onChange={setETD}
                    >
                      <option value="" disabled>
                        Choose Status
                      </option>
                      {statuses &&
                        _.orderBy(statuses, ["statusId"], ["asc"]).map(
                          (status: any) => (
                            <option
                              key={status.statusId}
                              value={status.statusId}
                            >
                              {status.statusName}
                            </option>
                          )
                        )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <Form.Group>
                    <Form.Label>Choose Tags</Form.Label>
                    <br />

                    {tags &&
                      tags.map((tag: any, i: any) => (
                        <div key={i} className="pretty p-default p-curve">
                          <input
                            type="checkbox"
                            name={tag.tagId}
                            value={tag.tagId}
                            onChange={handleCheckboxChange}
                          />
                          <div className="state p-info">
                            <label>{tag.tagName}</label>
                          </div>
                        </div>
                      ))}
                  </Form.Group>
                </Col>

                <Col xs={8}>
                  <Form.Group>
                    <Form.Label>Deadline</Form.Label>

                    <Row>
                      <Flatpickr
                        data-enable-time
                        defaultValue={date}
                        onReady={(date: any) => {
                          onChangeDeadline(date);
                        }}
                        onChange={(date: any) => {
                          onChangeDeadline(date);
                        }}
                      />
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  defaultValue={editTodo.description}
                  onChange={setETD}
                />
              </Form.Group>
            </Container>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" form="formNewTask" type="submit">
          Add Task
        </Button>

        <Button
          variant="outline-info"
          onClick={() => {
            handleClose();
          }}
        >
          <i className="icon mdi mdi-close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

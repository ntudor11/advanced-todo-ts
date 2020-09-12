/* eslint react/require-default-props: 0 */
import React from "react";
import {
  Button,
  Modal,
  Form,
  Badge,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { removeTagFromTask } from "../../components/Functions";
import "flatpickr/dist/themes/airbnb.css";

export const ModalNewTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    onExit,
    onSubmitEdit,
    onChangeEditTodo,
    taskObj,
    tags,
    statuses,
    handleCheckboxChange,
    onChangeDeadline,
  } = props;

  const date = new Date().toISOString();

  return (
    <Modal
      keyboard
      show={showModal === formIds.newTask}
      id={formIds.newTask}
      onHide={handleClose}
      onExit={onExit}
      size="lg"
    >
      <Modal.Header>
        <Row className="topRowModal">
          <Col>
            <p>New Task</p>
          </Col>
          <Col>
            <div className="align-right" style={{ float: "right" }}>
              {taskObj.tags &&
                taskObj.tags.map((tag: any) => (
                  <Badge
                    key={tag.tagId}
                    style={{ backgroundColor: tag.color }}
                    className="tagSpan"
                  >
                    {tag.tagName}
                    <i
                      className="icon mdi mdi-close removeTagIcon"
                      onClick={() => {
                        const tagId = tag.tagId;
                        const todoId = taskObj.id;
                        removeTagFromTask({ tagId, todoId });
                      }}
                    ></i>
                  </Badge>
                ))}
            </div>
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
                      defaultValue={taskObj.task}
                      onChange={onChangeEditTodo}
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
                      onChange={onChangeEditTodo}
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
                      onChange={onChangeEditTodo}
                    >
                      <option value="" disabled>
                        Choose Status
                      </option>
                      {statuses.map((status: any) => (
                        <option key={status.statusId} value={status.statusId}>
                          {status.statusName}
                        </option>
                      ))}
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
                  defaultValue={taskObj.description}
                  onChange={onChangeEditTodo}
                />
              </Form.Group>
            </Container>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>

        <Button variant="dark" form="formNewTask" type="submit">
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

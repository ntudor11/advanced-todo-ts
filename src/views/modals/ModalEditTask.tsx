/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from "react";
import {
  Button,
  Modal,
  Form,
  Badge,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { removeTagFromTask } from "../../components/Functions";

export const ModalEditTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    onExit,
    onSubmitEdit,
    onChangeEditTodo,
    taskObj,
    statuses,
    tags,
    handleCheckboxChange,
    onChangeDeadline,
    copyInitial,
  } = props;

  const existingTags = (arr: any) => {
    let arr2: any = [];
    arr.map((tag: any) => arr2.push(tag.tagId));
    return arr2;
  };

  // console.log(taskObj.tags && existingTags(taskObj.tags));

  return (
    <Modal
      keyboard
      show={showModal === formIds.viewTask}
      id={formIds.viewTask}
      onShow={copyInitial}
      onHide={handleClose}
      onExit={onExit}
      dialogClassName="modal-90w"
    >
      <Modal.Header>
        <Row className="topRowModal">
          <Col>
            <p>Edit Task: {taskObj.task}</p>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmitEdit} id="formEditTask">
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
                      defaultValue={taskObj.priority}
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
                      defaultValue={taskObj.status && taskObj.status.statusId}
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
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Choose Tags</Form.Label>
                    <br />

                    {taskObj.tags &&
                      tags.map((tag: any, i: any) => (
                        <div key={i} className="pretty p-default p-curve">
                          <input
                            type="checkbox"
                            name={tag.tagId}
                            value={tag.tagId}
                            onChange={handleCheckboxChange}
                            defaultChecked={existingTags(taskObj.tags).includes(
                              tag.tagId
                            )}
                          />
                          <div className="state p-info">
                            <label>{tag.tagName}</label>
                          </div>
                        </div>
                      ))}
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Deadline</Form.Label>

                    <Row>
                      <Flatpickr
                        data-enable-time
                        defaultValue={taskObj.deadline}
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

        <Button variant="dark" form="formEditTask" type="submit">
          Update Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

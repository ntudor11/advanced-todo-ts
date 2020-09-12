/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from "react";
import { Button, Modal, Form, Badge, Row, Col } from "react-bootstrap";
import { removeTagFromTask } from "../../components/Functions";

export const ModalEditTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    onExit,
    disabled,
    onSubmitEdit,
    onChangeEditTodo,
    taskObj,
    removeTag,
    statuses,
  } = props;

  // todo concat date time inputs

  const activeStatus = () =>
    statuses.map((stat: any) =>
      stat.statusName === taskObj.status.statusName ? stat.statusName : ""
    );

  // const getDate = () => {
  //   if (taskObj !== undefined) {
  //     const { deadline } = taskObj;
  //     const date = deadline.substring(0, 9);
  //     const time = deadline.substring(10, 15);
  //     return date;
  //   }
  // };

  return (
    <Modal
      keyboard
      show={showModal === formIds.viewTask}
      id={formIds.viewTask}
      onHide={handleClose}
      onExit={onExit}
      dialogClassName="modal-90w"
    >
      <Modal.Header>
        <Row className="topRowModal">
          <Col>
            <p>Edit Task: {taskObj.task}</p>
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
      <Modal.Body>
        <Form noValidate onSubmit={onSubmitEdit} id="formUpdateKpis">
          <Form.Group className="formTemplate" controlId="formEditTodo">
            <Form.Label>Choose priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              defaultValue={taskObj.priority}
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

          <Form.Group className="formTemplate" controlId="formEditStatus">
            <Form.Label>Choose Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              defaultValue={taskObj.status}
              onChange={onChangeEditTodo}
            >
              <option value="" disabled>
                Choose Type
              </option>
              {statuses.map((status: any) => (
                <option key={status.statusName} value={status.statusName}>
                  {status.statusName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              id="start"
              name="trip-start"
              // defaultValue={
              //   taskObj.deadline && taskObj.deadline.substring(0, 10)
              // }
              placeholder="yyyy-mm-dd"
              // value="2018-07-22"
              min="2018-01-01"
              max="2018-12-31"
            />

            <Form.Control
              type="time"
              placeholder="hh:mm"
              // defaultValue={
              //   taskObj.deadline && taskObj.deadline.substring(11, 16)
              // }
              id="appt"
              name="appt"
              min="00:00"
              max="23:59"
            />
          </Form.Group>

          <span>Description</span>
          <Form.Control
            as="textarea"
            rows={6}
            name="description"
            defaultValue={taskObj.description}
            onChange={onChangeEditTodo}
          />
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

        <Button
          disabled={disabled}
          variant="dark"
          form="formEditTask"
          type="submit"
        >
          Update Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

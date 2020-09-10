/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from "react";
import { Button, Modal, Form, Badge, Row, Col } from "react-bootstrap";
import { removeTagFromTask } from "../../components/Functions";

export const ModalNewTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    onExit,
    disabled,
    onSubmitEdit,
    onChangeEditTodo,
    taskObj,
    tags,
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
      show={showModal === formIds.newTask}
      id={formIds.newTask}
      onHide={handleClose}
      onExit={onExit}
      dialogClassName="modal-90w"
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
      <Modal.Body>
        <Form noValidate onSubmit={onSubmitEdit} id="formUpdateKpis">
          <Form.Group className="formTemplate">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              defaultValue=""
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
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              defaultValue=""
              onChange={onChangeEditTodo}
            >
              <option value="" disabled>
                Choose Status
              </option>
              {statuses.map((status: any) => (
                <option key={status.statusName} value={status.statusName}>
                  {status.statusName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Choose Tags</Form.Label>

            {tags &&
              tags.map((tag: any) => (
                <div key={tag.id} className="pretty p-default p-curve">
                  <input
                    type="checkbox"
                    name="isActive"
                    value={tag.tagName}
                    onChange={onChangeEditTodo}
                  />
                  <div className="state p-info">
                    <label>{tag.tagName}</label>
                  </div>
                </div>
              ))}
          </Form.Group>

          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            {/* <Form.Control
              name="deadline"
              // defaultValue={new Date(taskObj.deadline).toLocaleString()}
              defaultValue={
                taskObj.deadline && taskObj.deadline.substring(0, 10)
              }
              type="text"
              placeholder="Enter date"
            /> */}

            <Form.Control
              type="date"
              name="trip-start"
              // value=""
              // placeholder="yyyy-mm-dd"
              defaultValue={new Date().toISOString().substring(0, 10)}
              min="2018-01-01"
              max="2018-12-31"
            />

            <Form.Control
              type="time"
              placeholder="hh:mm"
              defaultValue={
                taskObj.deadline && taskObj.deadline.substring(11, 16)
              }
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
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
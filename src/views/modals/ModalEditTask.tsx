/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
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
    convertDate,
    removeTag,
    statuses,
  } = props;

  const activeStatus = () =>
    statuses.map((stat: any) =>
      stat.statusName === taskObj.status.statusName ? stat.statusName : ""
    );

  return (
    <Modal
      keyboard
      show={showModal === formIds.viewTask}
      id={formIds.viewTask}
      onHide={handleClose}
      onExit={onExit}
      dialogClassName="modal-90w"
    >
      <Modal.Header>Edit Task: {taskObj.task}</Modal.Header>
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
                Choose Type
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
                <option value={status.statusName}>{status.statusName}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              name="deadline"
              defaultValue={new Date(taskObj.deadline).toLocaleString()}
              type="text"
              placeholder="Enter date"
            />
          </Form.Group>

          <div>
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

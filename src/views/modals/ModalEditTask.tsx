/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
  } = props;

  return (
    <Modal
      keyboard
      show={showModal === formIds.viewTask}
      id={formIds.viewTask}
      onHide={handleClose}
      onExit={onExit}
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
                <span
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
                </span>
              ))}
          </div>
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
          Edit Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// export default ModalEditTask;

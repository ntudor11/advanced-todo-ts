import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/airbnb.css";
import { updateTodo } from "../../components/Functions";

export const ModalEditTask = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    statuses,
    tags,
    stateEditTodo,
    fetchTodos,
  } = props;

  const [editTodo, setEditTodo] = useState(stateEditTodo);

  const copyInitial = () => {
    const { tagsArr, status, tags } = stateEditTodo;
    const tempArr: any[] = [];
    tags &&
      tags.forEach((tag: any) => {
        if (!tagsArr.includes(tag.tagId.toString())) {
          tempArr.push(tag.tagId.toString());
        }
      });
    setEditTodo({
      ...stateEditTodo,
      tagsArr: [...tagsArr.concat(tempArr)],
      statusId: status.statusId,
    });
  };

  const setETD = (e: any) => {
    e.preventDefault();
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });
  };

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

  const onChangeDeadline = (date: any) => {
    setEditTodo({
      ...editTodo,
      deadline: date.toISOString(),
      // for Flatpickr module: deadline: date[0].toISOString(),
      // TODO fix issue with clicking inside component
    });
  };

  const onSubmitEdit = (e: any) => {
    e.preventDefault();

    if (showModal === formIds.viewTask) {
      updateTodo(editTodo).then((res: any) => {
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
      onExit={() => setEditTodo({ tagsArr: [], tags: [] })}
      dialogClassName="modal-90w"
    >
      <Modal.Header>
        <Row className="topRowModal">
          <Col>
            <p>Edit Task: {editTodo.task}</p>
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
                      defaultValue={stateEditTodo.task}
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
                      defaultValue={stateEditTodo.priority}
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
                      defaultValue={
                        stateEditTodo.status && stateEditTodo.status.statusId
                      }
                      onChange={setETD}
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

                    {stateEditTodo.tags &&
                      tags.map((tag: any, i: any) => (
                        <div key={i} className="pretty p-default p-curve">
                          <input
                            type="checkbox"
                            name={tag.tagId}
                            value={tag.tagId}
                            onChange={handleCheckboxChange}
                            defaultChecked={existingTags(
                              stateEditTodo.tags
                            ).includes(tag.tagId)}
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
                      <DateTimePicker
                        onChange={(date: any) => {
                          onChangeDeadline(date);
                        }}
                        name="deadline"
                        value={new Date(stateEditTodo.deadline)}
                      />
                      {/* <Flatpickr
                        data-enable-time
                        defaultValue={stateEditTodo.deadline}
                        onChange={(date: any) => {
                          onChangeDeadline(date);
                        }}
                      /> */}
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
                  defaultValue={stateEditTodo.description}
                  onChange={setETD}
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

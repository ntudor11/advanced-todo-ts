import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export const formIds = {
  viewTask: "view-task",
  newTag: "new-tag",
  newTask: "new-task",
};

const ButtonsRow = (props: any) => {
  const { handleShow, colSize } = props;

  return (
    <Row className="addNewButtons">
      <Col xs={12} sm={colSize}>
        <Button
          size="sm"
          block
          className="btnDefault"
          type="submit"
          variant="outline-info"
          onClick={() => {
            handleShow(formIds.newTask);
          }}
        >
          New Task <i className="icon mdi mdi-format-list-checkbox" />
        </Button>
      </Col>

      <Col xs={12} sm={colSize}>
        <Button
          size="sm"
          className="btnDefault"
          block
          type="submit"
          variant="outline-info"
          onClick={() => {
            handleShow(formIds.newTag);
          }}
        >
          Tags <i className="icon mdi mdi-tag-outline" />
        </Button>
      </Col>
    </Row>
  );
};

export default ButtonsRow;

import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

export const formIds = {
  viewTask: "view-task",
  newTag: "new-tag",
  newTask: "new-task",
};

const ButtonsRow = (props: any) => {
  const { handleShow } = props;

  return (
    <Row className="addNewButtons">
      <Col>
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

      <Col>
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

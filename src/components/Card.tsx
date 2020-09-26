import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default ({
  card,
  cardIndex,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
  onTitleClick,
}: {
  card: any;
  cardIndex: any;
  canMoveLeft: any;
  canMoveRight: any;
  onMoveLeft: any;
  onMoveRight: any;
  onTitleClick: any;
}) => (
  <Container className="card">
    <Row>
      <Col className="cardTitle text-wrap">
        <p onClick={() => onTitleClick(card)}>
          <strong>{card.title}</strong>
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="text-wrap">{card.description}</p>
      </Col>
    </Row>
    <Row>
      <Col xs={6} className="moveBtnContainer">
        {canMoveLeft && (
          <Button
            variant="info"
            className="moveBtn moveBtnLeft"
            size="sm"
            block
            onClick={onMoveLeft}
          >
            <i className="icon mdi mdi-arrow-left-bold-circle"></i>
          </Button>
        )}
      </Col>
      <Col xs={6} className="moveBtnContainer">
        {canMoveRight && (
          <Button
            variant="info"
            className="moveBtn moveBtnRight"
            block
            size="sm"
            onClick={onMoveRight}
          >
            <i className="icon mdi mdi-arrow-right-bold-circle"></i>
          </Button>
        )}
      </Col>
    </Row>
  </Container>
);

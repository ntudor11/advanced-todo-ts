import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

export default ({
  card,
  cardIndex,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
  onTitleClick,
  onDelete,
}: {
  card: any;
  cardIndex: any;
  canMoveLeft: any;
  canMoveRight: any;
  onMoveLeft: any;
  onMoveRight: any;
  onTitleClick: any;
  onDelete: any;
}) => (
  <Container className="card">
    <Row className="cardHeader">
      <Col xs={6} className="cardTagContainer">
        {card.tags &&
          card.tags.map((tag: any) => (
            <Badge
              key={tag.tagId}
              style={{ backgroundColor: tag.color }}
              className="tagSpan"
            >
              {tag.tagName}
            </Badge>
          ))}
      </Col>
      <Col xs={6} className="text-right float-right">
        <span style={{ fontSize: "8pt" }}>
          {new Date(card.deadline).toLocaleString()}
        </span>
      </Col>
    </Row>
    <Row>
      <Col className="cardTitle text-wrap">
        <p onClick={() => onTitleClick(card)}>
          <span
            className={`cardPriority mdi mdi-arrow-up-thick ${
              card.priority === "Low" && `priorityLow`
            } ${card.priority === "Medium" && `priorityMedium`}
          ${card.priority === "High" && `priorityHigh`}`}
          />
          <strong>{card.title}</strong>
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="cardDescription">
        <p className="text-wrap">{card.description}</p>
      </Col>
    </Row>
    <Row>
      <Col className="moveBtnContainer">
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
      <Col className="moveBtnContainer">
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
      <Col xs={2} className="moveBtnContainer">
        <Button
          variant="danger"
          className="moveBtn moveBtnRight"
          block
          size="sm"
          onClick={onDelete}
        >
          <i className="icon mdi mdi-delete" />
        </Button>
      </Col>
    </Row>
  </Container>
);

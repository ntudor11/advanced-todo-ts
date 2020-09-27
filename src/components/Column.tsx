import React from "react";
import Card from "./Card";
import { Col } from "react-bootstrap";

export default ({
  column,
  columnIndex,
  onMoveLeft,
  onMoveRight,
  onTitleClick,
  onDelete,
}: {
  column: any;
  columnIndex: any;
  onMoveLeft: any;
  onMoveRight: any;
  onTitleClick: any;
  onDelete: any;
}) => (
  <Col className="column" xs={12} sm={6} md={3}>
    <p className="font-weight-bold">
      {column.title} ({column.cards.length})
    </p>
    {column.cards.map((card: any, cardIndex: any) => (
      <Card
        key={card.id}
        card={card}
        cardIndex={cardIndex}
        canMoveLeft={columnIndex !== 0}
        canMoveRight={columnIndex !== 3}
        onMoveLeft={() => onMoveLeft(card.id, card.status_id)}
        onMoveRight={() => onMoveRight(card.id, card.status_id)}
        onTitleClick={() => onTitleClick(card)}
        onDelete={() => onDelete(card.id)}
      />
    ))}
  </Col>
);

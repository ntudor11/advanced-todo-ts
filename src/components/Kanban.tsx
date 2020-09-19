import React, { Component, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { Container, Row, Col, Button } from "react-bootstrap";
import "@lourenci/react-kanban/dist/styles.css";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: (
            <a href="#" onClick={() => console.log("click")}>
              Add card
            </a>
          ),
          description: "Add capability to add a card in a column",
          priorityId: 1,
          tags: [
            {
              tagName: "work",
            },
            {
              tagName: "uni",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Todo",
      cards: [
        {
          id: 2,
          title: "Drag-n-drop support",
          description: "Move a card between the columns",
        },
      ],
    },
    {
      id: 3,
      title: "Doing",
      cards: [
        {
          id: 3,
          title: "Drag-n-drop support",
          description: "Move a card between the columns",
        },
      ],
    },
    {
      id: 4,
      title: "Done",
      cards: [
        {
          id: 4,
          title: "Drag-n-drop support",
          description: "Move a card between the columns",
        },
      ],
    },
  ],
};

class Kanban extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  ControlledBoard() {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);

    function handleCardMove(_card: any, source: any, destination: any) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      setBoard(updatedBoard);
    }

    return (
      <Board onCardDragEnd={handleCardMove} disableColumnDrag>
        {controlledBoard}
      </Board>
    );
  }

  render() {
    return (
      <Container fluid className="body">
        <Row className="addNewButtons">
          <Col xs={3}>
            <Button
              size="sm"
              block
              className="btnDefault"
              type="submit"
              variant="outline-info"
              onClick={() => {
                // this.handleShow(formIds.newTask);
              }}
            >
              New Task <i className="icon mdi mdi-format-list-checkbox" />
            </Button>
          </Col>

          <Col xs={3}>
            <Button
              size="sm"
              className="btnDefault"
              block
              type="submit"
              variant="outline-info"
              onClick={() => {
                // this.handleShow(formIds.newTag);
              }}
            >
              Tags <i className="icon mdi mdi-tag-outline" />
            </Button>
          </Col>
        </Row>

        <Row>
          {/* <Board
            allowRemoveLane
            allowRenameColumn
            allowRemoveCard
            onLaneRemove={console.log}
            onCardRemove={console.log}
            onLaneRename={console.log}
            initialBoard={board}
            allowAddCard={{ on: "top" }}
            // onNewCardConfirm={(draftCard) => ({
            //   id: new Date().getTime(),
            //   ...draftCard,
            // })}
            onCardNew={console.log}
          /> */}
          <this.ControlledBoard />
        </Row>
      </Container>
    );
  }
}

export default Kanban;

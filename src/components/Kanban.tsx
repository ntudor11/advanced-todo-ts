import React, { Component, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { Container, Row } from "react-bootstrap";
import "@lourenci/react-kanban/dist/styles.css";
import ButtonsRow from "./ButtonsRow";

const demoBoard = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "add card",
          description: "Add capability to add a card in a column",
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

interface IProps {
  fetchKanban: any;
  board: any;
}

class Kanban extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      boardDemo: {},
    };
    this.controlledBoard = this.controlledBoard.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { fetchKanban, board } = this.props;
    fetchKanban();
    this.setState({ boardDemo: board });
  }

  controlledBoard() {
    const { board } = this.props;
    console.log(board);
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

  handleShow(id: string) {
    this.setState({ showModal: id });
  }

  handleClose() {
    this.setState({
      showModal: null,
    });
  }

  render() {
    const { board } = this.props;
    console.log(board);
    console.log(demoBoard);

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />

        <Row>
          <Board
            allowRemoveLane
            allowRenameColumn
            allowRemoveCard
            onLaneRemove={console.log}
            onCardRemove={console.log}
            onLaneRename={console.log}
            initialBoard={demoBoard}
            allowAddCard={{ on: "top" }}
            // onNewCardConfirm={(draftCard) => ({
            //   id: new Date().getTime(),
            //   ...draftCard,
            // })}
            onCardNew={console.log}
          />
          {/* <this.controlledBoard /> */}
          {/* <Board>{board}</Board> */}
        </Row>
      </Container>
    );
  }
}

export default Kanban;

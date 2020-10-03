import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ButtonsRow, { formIds } from "../components/ButtonsRow";
import { ModalNewTask } from "../views/modals/ModalNewTask";
import { ModalEditTask } from "../views/modals/ModalEditTask";
import { ModalNewTag } from "../views/modals/ModalNewTag";
import Column from "../components/Column";
import { updateTodoStatus, deleteTodo } from "../components/Functions";

interface IProps {
  fetchKanban: any;
  board: any;
  statuses: any;
  tags: any;
}

class Kanban extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      boardDemo: {},
      editTodo: {
        tagsArr: [],
        tags: [],
      },
      showModal: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { fetchKanban } = this.props;
    fetchKanban();
  }

  handleShow(id: string) {
    this.setState({ showModal: id });
  }

  handleClose() {
    this.setState({
      showModal: null,
    });
  }

  onTitleClick = (item: any) => {
    const { editTodo } = this.state;
    this.setState({
      editTodo: {
        ...editTodo,
        id: item.id,
        task: item.title,
        description: item.description,
        priority: item.priority,
        status: {
          statusId: item.status_id,
          // statusName: item.status.statusName,
        },
        tags: item.tags.map((tag: any) => tag),
        deadline: item.deadline,
      },
    });
    this.handleShow(formIds.viewTask);
  };

  onDelete = (itemId: any) => {
    const { fetchKanban } = this.props;
    deleteTodo({ itemId }).then((res: any) => {
      if (res) {
        try {
          fetchKanban();
        } catch (e) {
          console.log(`${e}`);
        }
      }
    });
  };

  handleMove = (itemId: any, oldStatus: any, direction: number) => {
    const { fetchKanban } = this.props;
    const statusId = oldStatus + direction;
    console.log(`card ${itemId} in status ${statusId}`);
    updateTodoStatus({ itemId, statusId }).then((res: any) => {
      if (res) {
        try {
          fetchKanban();
        } catch (e) {
          console.log(`${e}`);
        }
      }
    });
  };

  render() {
    const { board, fetchKanban, statuses, tags } = this.props;
    const { showModal, editTodo } = this.state;

    const DIRECTION_LEFT = -1;
    const DIRECTION_RIGHT = 1;

    const flatTodos =
      board.columns &&
      board.columns.map((cols: any) => [].concat(cols.cards)).flat();

    return (
      <Container fluid className="body">
        <ButtonsRow handleShow={this.handleShow} colSize={3} />

        <Row className="flex-row flex-nowrap kanbanContainer">
          {board.columns &&
            board.columns.map((column: any, columnIndex: any) => (
              <Column
                column={column}
                columnIndex={columnIndex}
                onTitleClick={(card: any) => this.onTitleClick(card)}
                onMoveLeft={(cardId: any, statusId: any) =>
                  this.handleMove(cardId, statusId, DIRECTION_LEFT)
                }
                onMoveRight={(cardId: any, statusId: any) =>
                  this.handleMove(cardId, statusId, DIRECTION_RIGHT)
                }
                key={column.id}
                onDelete={(cardId: any) => this.onDelete(cardId)}
              />
            ))}
        </Row>

        <ModalNewTask
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          taskObj={editTodo}
          statuses={statuses}
          tags={tags}
          stateEditTodo={editTodo}
          fetchTodos={fetchKanban}
        />

        <ModalNewTag
          formIds={formIds}
          showModal={showModal}
          handleClose={this.handleClose}
          tags={tags}
          todos={flatTodos}
          fetchTodos={fetchKanban}
        />

        <ModalEditTask
          formIds={formIds}
          showModal={showModal}
          stateEditTodo={editTodo}
          handleClose={this.handleClose}
          tags={tags}
          statuses={statuses}
          fetchTodos={fetchKanban}
        />
      </Container>
    );
  }
}

export default Kanban;

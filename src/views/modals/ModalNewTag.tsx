import React, { useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import { CompactPicker } from "react-color";
import { addNewTag, removeTag } from "../../components/Functions";

interface IProps {
  showModal: string | null;
  formIds: any;
  handleClose: () => void;
  tags: any[];
  todos: any[];
  fetchTodos: Function;
}

export const ModalNewTag = (props: IProps) => {
  const { showModal, formIds, handleClose, tags, fetchTodos, todos } = props;

  const [newTag, setTag] = useState({ tagName: "", tagColor: "" });

  const onChangeNewTag = (e: any) => {
    setTag({
      ...newTag,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNewTagColor = (color: any) => {
    setTag({
      ...newTag,
      tagColor: color.hex,
    });
  };

  const onSubmitNewTag = (e: any) => {
    e.preventDefault();
    if (
      tags &&
      !tags
        .map((tag: any) => {
          return tag.tagName;
        })
        .includes(newTag.tagName)
    ) {
      addNewTag(newTag).then((res: any) => {
        if (res) {
          try {
            fetchTodos().then(() =>
              setTag({
                tagName: "",
                tagColor: "",
              })
            );
          } catch (e) {
            console.log(`${e}`);
          }
        }
      });
    } else {
      console.log("This tag already exists!");
    }
  };

  const delTag = (tagId: any) => {
    const tagsArr: string[] = [];
    todos.map((todo: any) =>
      todo.tags.forEach((tag: any) => {
        tagsArr.push(tag.tagId);
      })
    );
    if (!tagsArr.includes(tagId.tagId)) {
      removeTag(tagId).then((res: any) => {
        if (res) {
          try {
            fetchTodos();
          } catch (e) {
            console.log(`${e}`);
          }
        }
      });
    } else {
      console.log("tag cannot be deleted");
    }
  };

  return (
    <Modal
      keyboard
      show={showModal === formIds.newTag}
      id={formIds.newTag}
      onHide={handleClose}
      onExit={() =>
        setTag({
          tagName: "",
          tagColor: "",
        })
      }
      dialogClassName="modal-90w"
    >
      <Modal.Header>Tag Manager</Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmitNewTag} id="formNewTag">
          <Form.Group className="formTemplate" controlId="formEditTodo">
            <Form.Label>Choose priority</Form.Label>

            <Form.Group controlId="formBasicDeadline">
              <Form.Label>Tag Name</Form.Label>
              <Form.Control
                name="tagName"
                value={newTag.tagName}
                type="text"
                placeholder="Enter tag name"
                isInvalid={
                  tags &&
                  tags
                    .map((tag: any) => {
                      return tag.tagName;
                    })
                    .includes(newTag.tagName)
                }
                onChange={onChangeNewTag}
              />
              <Form.Control.Feedback type="invalid">
                Tag already exists!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Tag Color</Form.Label>
            <CompactPicker
              color={newTag.tagColor}
              onChange={onChangeNewTagColor}
            />
          </Form.Group>
        </Form>

        <p>Available Tags</p>
        <div>
          {tags &&
            tags.map((tag: any) => (
              <Badge
                key={tag.tagId}
                style={{ backgroundColor: tag.tagColor }}
                className="tagSpan tagSpanModal"
              >
                {tag.tagName}
                <i
                  className="icon mdi mdi-close removeTagIcon"
                  onClick={() => {
                    const tagId = tag.tagId;
                    console.log(tagId);
                    delTag({ tagId });
                  }}
                ></i>
              </Badge>
            ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          form="formNewTag"
          type="submit"
          disabled={showModal !== null && newTag.tagName.length === 0}
        >
          Add Tag
        </Button>

        <Button
          variant="outline-info"
          onClick={() => {
            handleClose();
          }}
        >
          <i className="icon mdi mdi-close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

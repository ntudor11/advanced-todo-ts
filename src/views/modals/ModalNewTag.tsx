/* eslint react/require-default-props: 0 */
import React from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import { CompactPicker } from "react-color";

export const ModalNewTag = (props: any) => {
  const {
    showModal,
    formIds,
    handleClose,
    onExit,
    onSubmitNewTag,
    onChangeNewTag,
    onChangeNewTagColor,
    tags,
    newTag,
    activeColor,
    delTag,
  } = props;

  // delete tag on badge, directly import from functions
  return (
    <Modal
      keyboard
      show={showModal === formIds.newTag}
      id={formIds.newTag}
      onHide={handleClose}
      onExit={onExit}
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
            <CompactPicker color={activeColor} onChange={onChangeNewTagColor} />
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
          variant="outline-dark"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>

        <Button
          variant="dark"
          form="formNewTag"
          type="submit"
          disabled={showModal && newTag.tagName.length === 0}
        >
          Add Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

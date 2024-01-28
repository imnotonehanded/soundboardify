import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import AudioCard from "./AudioCard";

function FloatingButton() {
  let currentFile: FileList | null;
  const [show, setShow] = useState(false);
  const handleNext = () => {
    if (!currentFile || currentFile.length < 1) {
      console.log("invalid");
    } else {
      {
        <AudioCard />;
      }
      console.log(currentFile[0].name);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
        }}
        size="lg"
        onClick={handleShow}
      >
        Create a new bind
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new bind</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Import an audio file</Form.Label>
            <Form.Control
              type="file"
              accept="audio/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                (currentFile = e.target.files)
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FloatingButton;

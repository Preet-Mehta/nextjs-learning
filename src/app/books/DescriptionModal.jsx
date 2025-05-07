import { Modal, Button } from "react-bootstrap";

export default function DescriptionModal({ show, onClose, book }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{book?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{book?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

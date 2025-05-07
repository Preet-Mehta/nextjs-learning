import { Modal, Button } from "react-bootstrap";

export default function BioModal({ show, onClose, author }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{author?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{author?.biography}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

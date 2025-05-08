import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  message,
  books,
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        {books && books.length > 0 && (
          <div>
            The following books will be deleted: <br />{" "}
            <ul>
              {books.map((book) => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

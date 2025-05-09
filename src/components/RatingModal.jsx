import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export default function RatingModal({ show, onClose, name, addNewRating }) {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Rating: {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Rating onClick={handleRating} allowFraction={true} size={20} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => addNewRating(rating)}
          disabled={rating === 0}
        >
          Add Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

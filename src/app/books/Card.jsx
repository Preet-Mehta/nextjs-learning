import { Card, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function BookCard({
  book,
  handleShowDescription,
  onEdit,
  onDelete,
}) {
  return (
    <Card>
      <Card.Body>
        <div>
          <Card.Title>{book.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Published: {book.published_date}
          </Card.Subtitle>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={() => handleShowDescription(book)}>
            View Description
          </Button>
          <div className="d-flex gap-3">
            <PencilSquare
              role="button"
              onClick={() => onEdit(book)}
              style={{ cursor: "pointer" }}
              title="Edit"
            />
            <Trash
              role="button"
              onClick={() => onDelete(book)}
              style={{ cursor: "pointer" }}
              title="Delete"
              color="red"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

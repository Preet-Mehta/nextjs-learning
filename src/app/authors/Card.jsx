import { Card, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function AuthorCard({
  author,
  handleShowBio,
  onEdit,
  onDelete,
}) {
  return (
    <Card>
      <Card.Body>
        <div>
          <Card.Title>{author.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Born: {author.born_date}
          </Card.Subtitle>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={() => handleShowBio(author)}>
            View Bio
          </Button>
          <div className="d-flex gap-3">
            <PencilSquare
              role="button"
              onClick={() => onEdit(author)}
              style={{ cursor: "pointer" }}
              title="Edit"
            />
            <Trash
              role="button"
              onClick={() => onDelete(author)}
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

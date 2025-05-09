import { useRouter } from "next/navigation";
import { Card, Button } from "react-bootstrap";

export default function AuthorCard({ author }) {
  const router = useRouter();

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
          <Button
            variant="primary"
            onClick={() => router.push(`/authors/${author.id}`)}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

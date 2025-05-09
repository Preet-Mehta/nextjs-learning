import { useRouter } from "next/navigation";
import { Card, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export default function BookCard({ book }) {
  const router = useRouter();

  return (
    <>
      <Card>
        <Card.Body>
          <div>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted d-flex flex-column">
              <div>Published: {book.published_date}</div>
              <div>Author: {book.author.name}</div>
              <div className="d-flex align-items-center">
                Rating:
                <Rating
                  initialValue={book.rating.average}
                  allowFraction={true}
                  size={20}
                  readonly={true}
                />
                ({book.rating.count})
              </div>
            </Card.Subtitle>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="primary"
              onClick={() => router.push(`/books/${book.id}`)}
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Rating } from "react-simple-star-rating";

import RatingModal from "@/components/RatingModal";
import {
  CREATE_RATING_FOR_BOOK,
  GET_RATINGS_FOR_BOOK,
} from "@/graphql/client/rating";

export default function BookCard({
  book,
  handleShowDescription,
  onEdit,
  onDelete,
  setShowToast,
}) {
  const [showRatingModal, setShowRatingModal] = useState(false);

  const { data, loading, refetch } = useQuery(GET_RATINGS_FOR_BOOK, {
    variables: { book_id: Number(book.id) },
  });

  const [createRating] = useMutation(CREATE_RATING_FOR_BOOK);

  function closeRatingModal() {
    setShowRatingModal(false);
  }

  async function addNewRating(newRating) {
    try {
      await createRating({
        variables: { rating: { book_id: book.id, rating: newRating } },
      });
      setShowToast("New Rating added successfully !");

      refetch({ book_id: Number(book.id) });
    } catch (error) {
      console.log("Error occurred while adding new rating:", error);
    }

    closeRatingModal();
  }

  if (loading) {
    return <Card>Loading...</Card>;
  }

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
                  initialValue={data.rating.average}
                  allowFraction={true}
                  size={20}
                  readonly={true}
                />
                ({data.rating.count})
              </div>
            </Card.Subtitle>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1">
              <Button
                variant="primary"
                onClick={() => handleShowDescription(book)}
              >
                View Description
              </Button>
              <Button variant="info" onClick={() => setShowRatingModal(true)}>
                Add Rating
              </Button>
            </div>
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

      {showRatingModal && (
        <RatingModal
          show={showRatingModal}
          onClose={closeRatingModal}
          name={book.title}
          addNewRating={addNewRating}
        />
      )}
    </>
  );
}

"use client";

import { useState, use } from "react";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/navigation";

import RatingModal from "@/components/RatingModal";
import ConfirmModal from "@/components/ConfirmModal";
import SuccessToast from "@/components/SuccessToast";
import FormModal from "@/app/books/FormModal";

import { CREATE_RATING_FOR_BOOK } from "@/graphql/client/rating";
import {
  DELETE_BOOK,
  GET_SINGLE_BOOK,
  UPDATE_BOOK,
} from "@/graphql/client/book";
import { ArrowLeft } from "react-bootstrap-icons";

export default function BookPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const { data, loading, refetch } = useQuery(GET_SINGLE_BOOK, {
    variables: { bookId: id },
  });

  const [createRating] = useMutation(CREATE_RATING_FOR_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const closeRatingModal = () => setShowRatingModal(false);
  const handleShowEdit = () => setShowFormModal(true);
  const handleCloseEdit = () => setShowFormModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const goToBooks = () => router.replace("/books");

  async function addNewRating(newRating) {
    try {
      await createRating({
        variables: { rating: { book_id: data.book.id, rating: newRating } },
      });
      setShowToast("New Rating added successfully !");

      refetch({ book_id: Number(data.book.id) });
    } catch (error) {
      console.log("Error occurred while adding new rating:", error);
    }

    closeRatingModal();
  }

  const handleBookUpdate = async (updatedBook) => {
    const { title, description, published_date, author_id } = updatedBook;

    try {
      await updateBook({
        variables: {
          updateBookId: data.book.id,
          book: { title, description, published_date, author_id },
        },
      });
      setShowFormModal(false);
      setShowToast("Updated the Book successfully !");

      refetch({ book_id: Number(data.book.id) });
    } catch (error) {
      console.log("Error occurred while updating the book:", error);
    }
  };

  const handleBookDelete = async () => {
    try {
      await deleteBook({ variables: { deleteBookId: data.book.id } });
      handleCloseDelete();

      goToBooks();
    } catch (error) {
      console.log("Error occurred while deleting the book:", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!data.book) return <h1>Book not found</h1>;

  return (
    <>
      <SuccessToast message={showToast} onClose={() => setShowToast(false)} />

      <div className="container my-5">
        <Button
          variant="dark"
          className="mb-3 d-flex align-items-center"
          onClick={goToBooks}
        >
          <ArrowLeft className="m-1" size={20} /> Back
        </Button>
        <h2>{data.book.title}</h2>
        <div className="d-flex gap-3 mb-3">
          <Button variant="warning" onClick={handleShowEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleShowDelete}>
            Delete
          </Button>
        </div>
        <p>
          <strong>Published:</strong> {data.book.published_date}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{data.book.description}</p>

        <hr />
        <h4>Rating</h4>
        <div className="d-flex align-items-center">
          <Rating
            initialValue={data.book.rating.average}
            allowFraction={true}
            size={25}
            readonly={true}
          />
          ({data.book.rating.average.toFixed(2)} / 5)
        </div>
        <p>
          <strong>Total Ratings:</strong> {data.book.rating.count}
        </p>

        <div className="d-flex gap-3">
          <Button variant="info" onClick={() => setShowRatingModal(true)}>
            Add Rating
          </Button>
        </div>
      </div>

      {showRatingModal && (
        <RatingModal
          show={showRatingModal}
          onClose={closeRatingModal}
          name={data.book.title}
          addNewRating={addNewRating}
        />
      )}

      {showFormModal && (
        <FormModal
          show={showFormModal}
          initialData={data.book}
          onClose={handleCloseEdit}
          onSubmit={handleBookUpdate}
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          onClose={handleCloseDelete}
          onConfirm={handleBookDelete}
          message={"Are you sure you want to delete the book ?"}
        />
      )}
    </>
  );
}

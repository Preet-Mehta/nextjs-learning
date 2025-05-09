"use client";

import { useState, use } from "react";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "react-bootstrap-icons";

import {
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
  GET_SINGLE_AUTHOR,
} from "@/graphql/client/author";
import FormModal from "@/app/authors/FormModal";
import SuccessToast from "@/components/SuccessToast";
import ConfirmModal from "@/components/ConfirmModal";

export default function Authors({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // GraphQL queries and mutations
  const { loading, data, error, refetch } = useQuery(GET_SINGLE_AUTHOR, {
    variables: { author_id: id },
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const handleShowEdit = () => setShowFormModal(true);
  const handleShowDelete = () => setShowDeleteModal(true);
  const handleCloseEdit = () => setShowFormModal(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const goToAuthors = () => router.replace("/authors");

  // Submit handlers
  const handleAuthorUpdate = async (updatedAuthor) => {
    const { name, biography, born_date } = updatedAuthor;

    try {
      await updateAuthor({
        variables: {
          updateAuthorId: data.author.id,
          author: { name, biography, born_date },
        },
      });
      setShowToast("Updated the Author successfully !");

      refetch({ author_id: Number(data.author.id) });
    } catch (error) {
      console.log("Error occurred while updating the author:", error);
    }

    handleCloseEdit();
  };

  const handleAuthorDelete = async () => {
    try {
      await deleteAuthor({ variables: { deleteAuthorId: data.author.id } });
      handleCloseDelete();

      goToAuthors();
    } catch (error) {
      console.log("Error occurred while deleting the author:", error);
    }
  };
  console.log(data, error);

  if (loading) return <h1>Loading...</h1>;
  if (!data.author) return <h1>Author not found</h1>;

  return (
    <>
      <SuccessToast message={showToast} onClose={() => setShowToast(false)} />

      <div className="container my-5">
        <Button
          variant="dark"
          className="mb-3 d-flex align-items-center"
          onClick={goToAuthors}
        >
          <ArrowLeft className="m-1" size={20} /> Back
        </Button>
        <h2>{data.author.name}</h2>
        <div className="d-flex gap-3 mb-3">
          <Button variant="warning" onClick={handleShowEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleShowDelete}>
            Delete
          </Button>
        </div>
        <p>
          <strong>Born:</strong> {data.author.born_date}
        </p>
        <p>
          <strong>Biography:</strong>
        </p>
        <p>{data.author.biography}</p>
        <hr />
        <div className="d-flex gap-2 align-items-center m-0">
          <h4 className="m-0">Books</h4>({data.author.books.length})
        </div>
        <ul>
          {data.author.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>

      {showFormModal && (
        <FormModal
          show={showFormModal}
          initialData={data.author}
          onClose={handleCloseEdit}
          onSubmit={handleAuthorUpdate}
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          onClose={handleCloseDelete}
          onConfirm={handleAuthorDelete}
          message={"Are you sure you want to delete the author ?"}
          books={data.author.books}
        />
      )}
    </>
  );
}

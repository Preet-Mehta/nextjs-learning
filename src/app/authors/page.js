"use client";

import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";

import {
  GET_AUTHORS,
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
} from "@/graphql/client/author";
import Card from "@/app/authors/Card";
import BioModal from "./BioModal";
import FormModal from "./FormModal";
import SuccessToast from "./SuccessToast";
import ConfirmModal from "./ConfirmModal";

export default function Authors() {
  // Modals
  const [showBioModal, setShowBioModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selected author data
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  // Toast
  const [showToast, setShowToast] = useState(false);

  // GraphQL queries and mutations
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);
  const [createAuthor] = useMutation(CREATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  // Show Modal handlers
  const handleShowBio = (author) => {
    setShowBioModal(true);
    setSelectedAuthor(author);
  };
  const handleShowForm = () => setShowFormModal(true);
  const handleShowEditForm = (author) => {
    setSelectedAuthor(author);
    handleShowForm();
  };
  const handleShowDelete = (author) => {
    setShowDeleteModal(true);
    setSelectedAuthor(author);
  };

  // Close Modal handlers
  const handleCloseBio = () => {
    setShowBioModal(false);
    setSelectedAuthor(null);
  };
  const handleCloseForm = () => {
    setSelectedAuthor(null);
    setShowFormModal(false);
  };
  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedAuthor(null);
  };

  // Submit handlers
  const handleAuthorCreate = async (newAuthor) => {
    try {
      await createAuthor({ variables: { author: newAuthor } });
      setShowFormModal(false);
      setShowToast("Added a new Author !");

      refetch();
    } catch (error) {
      console.log("Error occurred while creating new author:", error);
    }
  };

  const handleAuthorUpdate = async (updatedAuthor) => {
    const { name, biography, born_date } = updatedAuthor;

    try {
      await updateAuthor({
        variables: {
          updateAuthorId: selectedAuthor.id,
          author: { name, biography, born_date },
        },
      });
      setShowFormModal(false);
      setShowToast("Updated the Author successfully !");

      refetch();
    } catch (error) {
      console.log("Error occurred while updating the author:", error);
    }
  };

  const handleAuthorDelete = async () => {
    try {
      await deleteAuthor({ variables: { deleteAuthorId: selectedAuthor.id } });
      handleCloseDelete();
      setShowToast("Author deleted successfully !");

      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the author:", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <SuccessToast show={showToast} onClose={() => setShowToast(false)} />

      <Container className="my-3">
        <h2 className="text-center mb-4">Know the Authors</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={handleShowForm}>
            + New Author
          </Button>
        </div>

        <Row>
          {data.authors.map((author, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card
                author={author}
                handleShowBio={handleShowBio}
                onDelete={() => handleShowDelete(author)}
                onEdit={() => handleShowEditForm(author)}
              />
            </Col>
          ))}
        </Row>

        {showBioModal && (
          <BioModal
            show={showBioModal}
            onClose={handleCloseBio}
            author={selectedAuthor}
          />
        )}

        {showFormModal && (
          <FormModal
            show={showFormModal}
            initialData={selectedAuthor}
            onClose={handleCloseForm}
            onSubmit={selectedAuthor ? handleAuthorUpdate : handleAuthorCreate}
          />
        )}

        {showDeleteModal && (
          <ConfirmModal
            show={showDeleteModal}
            onClose={handleCloseDelete}
            onConfirm={handleAuthorDelete}
            message={"Are you sure you want to delete the author ?"}
          />
        )}
      </Container>
    </>
  );
}

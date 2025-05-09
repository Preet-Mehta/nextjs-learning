"use client";

import { useRef, useState } from "react";
import { Button, Container, Row, Col, Pagination } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";

import { GET_AUTHORS, CREATE_AUTHOR } from "@/graphql/client/author";
import Card from "@/app/authors/Card";
import FormModal from "./FormModal";
import SuccessToast from "@/components/SuccessToast";
import { LIMIT } from "@/constants";

export default function Authors() {
  // Modals
  const [showFormModal, setShowFormModal] = useState(false);

  // Toast
  const [showToast, setShowToast] = useState(false);

  // Dynamic content data
  const [currentPage, setCurrentPage] = useState(1);
  const nameRef = useRef(null);
  const bornDateRef = useRef(null);

  // GraphQL queries and mutations
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS, {
    variables: { offset: (currentPage - 1) * LIMIT, limit: LIMIT },
  });

  const [createAuthor] = useMutation(CREATE_AUTHOR);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  // Filter handlers
  const applyFilters = () => {
    setCurrentPage(1);

    refetch({
      offset: 0,
      limit: LIMIT,
      name: nameRef.current.value,
      born_date: bornDateRef.current.value,
    });
  };

  const resetFilters = () => {
    setCurrentPage(1);

    nameRef.current.value = "";
    bornDateRef.current.value = "";
    refetch({
      offset: 0,
      limit: LIMIT,
      name: nameRef.current.value,
      born_date: bornDateRef.current.value,
    });
  };

  // Show Modal handlers

  const handleShowForm = () => setShowFormModal(true);

  // Close Modal handlers

  const handleCloseForm = () => setShowFormModal(false);

  // Submit handlers
  const handleAuthorCreate = async (newAuthor) => {
    try {
      await createAuthor({ variables: { author: newAuthor } });
      setShowFormModal(false);
      setShowToast("Added a new Author !");

      refetch({
        offset: 0,
        limit: LIMIT,
        name: nameRef.current.value,
        born_date: bornDateRef.current.value,
      });
    } catch (error) {
      console.log("Error occurred while creating new author:", error);
    }
  };

  // Pagination-related calculations
  const totalAuthorsCount = data.authors.totalCount;
  const totalPages = Math.ceil(totalAuthorsCount / LIMIT);

  return (
    <>
      {<SuccessToast message={showToast} onClose={() => setShowToast(false)} />}
      <Container className="my-3">
        <h2 className="text-center mb-4">Know the Authors</h2>

        <div className="row g-2 mb-3 align-items-end">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Search by name"
              name="name"
              ref={nameRef}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="born_date"
              ref={bornDateRef}
            />
          </div>
          <div className="col-md-3">
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button className="mx-1" variant="secondary" onClick={resetFilters}>
              Reset
            </Button>
          </div>
          <div className="col-md-3 text-end">
            <Button variant="success" onClick={handleShowForm}>
              + New Author
            </Button>
          </div>
        </div>

        <Row>
          {data.authors.authors.map((author, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card author={author} />
            </Col>
          ))}
        </Row>

        {showFormModal && (
          <FormModal
            show={showFormModal}
            onClose={handleCloseForm}
            onSubmit={handleAuthorCreate}
          />
        )}
      </Container>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          />
        </Pagination>
      )}
    </>
  );
}

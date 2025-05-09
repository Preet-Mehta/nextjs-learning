"use client";

import { useRef, useState } from "react";
import { Button, Container, Row, Col, Pagination } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";

import { GET_BOOKS, CREATE_BOOK } from "@/graphql/client/book";
import Card from "./Card";
import FormModal from "./FormModal";
import SuccessToast from "@/components/SuccessToast";
import { LIMIT } from "@/constants";

export default function Books() {
  // Modals
  const [showFormModal, setShowFormModal] = useState(false);

  // Toast
  const [showToast, setShowToast] = useState(false);

  // Dynamic content data
  const [currentPage, setCurrentPage] = useState(1);

  const titleRef = useRef(null);
  const publishedDateRef = useRef(null);

  // GraphQL queries and mutations
  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: { offset: (currentPage - 1) * LIMIT, limit: LIMIT },
  });

  const [createBook] = useMutation(CREATE_BOOK);

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
      title: titleRef.current.value,
      published_date: publishedDateRef.current.value,
    });
  };

  const resetFilters = () => {
    setCurrentPage(1);

    titleRef.current.value = "";
    publishedDateRef.current.value = "";
    refetch({
      offset: 0,
      limit: LIMIT,
      title: titleRef.current.value,
      published_date: publishedDateRef.current.value,
    });
  };

  // Modal handlers
  const handleShowForm = () => setShowFormModal(true);
  const handleCloseForm = () => setShowFormModal(false);

  // Submit handlers
  const handleBookCreate = async (newBook) => {
    try {
      await createBook({ variables: { book: newBook } });
      setShowFormModal(false);
      setShowToast("Added a new Book !");

      refetch({
        offset: 0,
        limit: LIMIT,
        title: titleRef.current.value,
        published_date_date: publishedDateRef.current.value,
      });
    } catch (error) {
      console.log("Error occurred while creating new book:", error);
    }
  };

  // Pagination-related calculations
  const totalBooksCount = data.books.totalCount;
  const totalPages = Math.ceil(totalBooksCount / LIMIT);

  return (
    <>
      <SuccessToast message={showToast} onClose={() => setShowToast(false)} />
      <Container className="my-3">
        <h2 className="text-center mb-4">Explore Books</h2>

        <div className="row g-2 mb-3 align-items-end">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Search by title"
              name="title"
              ref={titleRef}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="published_date"
              ref={publishedDateRef}
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
              + New Book
            </Button>
          </div>
        </div>

        <Row>
          {data.books.books.map((book, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card book={book} />
            </Col>
          ))}
        </Row>

        {showFormModal && (
          <FormModal
            show={showFormModal}
            onClose={handleCloseForm}
            onSubmit={handleBookCreate}
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

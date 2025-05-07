"use client";

import { useState } from "react";
import { Modal, Button, Card, Container, Row, Col } from "react-bootstrap";

import { BOOKS } from "@/lib/data";

export default function Books() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleShowDescription = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <Container className="my-3">
      <h2 className="text-center mb-4">Explore Books</h2>
      <Row>
        {BOOKS.map((book, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Published on: {book.published_date}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  onClick={() => handleShowDescription(book)}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedBook?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

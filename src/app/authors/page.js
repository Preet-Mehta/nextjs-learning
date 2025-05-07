"use client";

import { useState } from "react";
import { Modal, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_AUTHORS } from "@/graphql/client/author";

export default function Authors() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const { loading, error, data } = useQuery(GET_AUTHORS);

  const handleShowBio = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAuthor(null);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <Container className="my-3">
      <h2 className="text-center mb-4">Know the Authors</h2>

      <Row>
        {data.authors.map((author, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{author.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Born: {author.born_date}
                </Card.Subtitle>
                <Button variant="primary" onClick={() => handleShowBio(author)}>
                  View Bio
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAuthor?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedAuthor?.biography}</p>
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

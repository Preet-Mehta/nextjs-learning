import { GET_AUTHOR_NAMES } from "@/graphql/client/author";
import { useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const initialFormData = { title: "", published_date: "", description: "" };

export default function FormModal({ show, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(initialData ? initialData : initialFormData);
  const authorRef = useRef(null);

  const { loading, data, error } = useQuery(GET_AUTHOR_NAMES);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, author_id: authorRef.current.value });
    setForm(initialFormData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${
          initialData ? "Update" : "Add new"
        } Book`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Published Date</label>
            <input
              type="date"
              className="form-control"
              name="published_date"
              onChange={handleChange}
              value={form.published_date}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              onChange={handleChange}
              value={form.description}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <select
              name="authorName"
              id="authorName"
              ref={authorRef}
              defaultValue={
                initialData
                  ? initialData.author.id
                  : data.authorNames.length > 0
                  ? data.authorNames[0].id
                  : ""
              }
            >
              {data.authorNames.map((author, idx) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!data.authorNames.length}
            >
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

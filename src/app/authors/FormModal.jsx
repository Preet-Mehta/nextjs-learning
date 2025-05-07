import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const initialFormData = { name: "", born_date: "", biography: "" };

export default function FormModal({ show, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(initialData ? initialData : initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialFormData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${
          initialData ? "Update" : "Add new"
        } Author`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              onChange={handleChange}
              value={form.name}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Born Date</label>
            <input
              type="date"
              className="form-control"
              name="born_date"
              onChange={handleChange}
              value={form.born_date}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Biography</label>
            <textarea
              className="form-control"
              name="biography"
              rows="3"
              onChange={handleChange}
              value={form.biography}
              required
            />
          </div>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

import { Toast, ToastContainer } from "react-bootstrap";

export default function SuccessToast({ show, onClose }) {
  return (
    <ToastContainer position="top-end" className="my-5 mx-2">
      <Toast bg="success" onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body className="text-white">{show}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

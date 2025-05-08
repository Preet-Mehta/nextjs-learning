import { Toast, ToastContainer } from "react-bootstrap";

export default function SuccessToast({ message, onClose }) {
  return (
    <ToastContainer position="top-end" className="my-5 mx-2">
      <Toast
        bg="success"
        onClose={onClose}
        show={message}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

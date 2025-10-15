import ReactDOM from "react-dom";

interface ModelProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Model: React.FC<ModelProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById("model-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black shadow-md bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // click outside to close
    >
      <div
        className="bg-white rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Model;

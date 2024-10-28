import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Popup = ({ children, onClose, onSubmit }) => {
  const modalRoot = document.getElementById("popup-root");
  if (!modalRoot) {
    // Create the root element if it doesn't exist
    const root = document.createElement("div");
    root.id = "popup-root";
    document.body.appendChild(root);
  }

  const modalRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      onClose(); // Call onClose function when Escape key is pressed
    } else if (event.key === "Enter") {
      onSubmit(); // Call onSubmit function when Enter key is pressed
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Call onClose function when clicked outside the children component
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Adding an empty dependency array ensures that the effect runs only once

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
      {/* Rest of your popup content */}

      <div className="relative max-w-md w-full" ref={modalRef}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Popup;

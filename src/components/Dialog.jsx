import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import Popup from "../utils/Popup";

const Dialog = ({
  isOpen,
  isColourReverse = false,
  title = "Popup Dialog",
  message = "Are you sure ?",
  submitText = "Yes",
  handleSubmit,
  closeText = "No",
  handleClose,
}) => {
  if (!isOpen) return null;

  return (
    <Popup onClose={handleClose} onSubmit={handleSubmit}>
      <div className="bg-gray-50 rounded-md shadow-md shadow-black border-2 border-gray-300 max-w-md w-full">
        <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300">
          <h2 className="font-Poppins text-lg font-semibold text-gray-800">
            {title}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={handleClose}
          >
            <IoCloseCircle className="text-2xl" />
          </button>
        </div>
        <div className="p-4">
          <p className="font-Poppins text-gray-800">{message}</p>
          <div className="flex items-center justify-end pt-8 space-x-8">
            <button
              className={`${
                isColourReverse
                  ? `text-green-500 border-green-500 hover:bg-green-500`
                  : `text-red-500 border-red-500 hover:bg-red-500`
              } min-w-[100px] p-1 font-Poppins  hover:text-white border-2 rounded-md`}
              onClick={handleClose}
            >
              {closeText}
            </button>
            <button
              className={`${
                isColourReverse
                  ? `text-red-500 border-red-500 hover:bg-red-500`
                  : `text-green-500 border-green-500 hover:bg-green-500`
              } min-w-[100px] p-1 font-Poppins  hover:text-white border-2 rounded-md`}
              onClick={handleSubmit}
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Dialog;

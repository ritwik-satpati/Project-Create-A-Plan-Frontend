import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import Popup from "../utils/Popup";

const Dialog = ({
  isOpen,
  canClose = true,
  handleClose = null,
  title = "Popup Dialog",
  message = "Are you sure ?",
  buttonsCount = 3,
  button1Text,
  button1Colour = "red-500",
  button1HoverColour = "red-600", // Only if buttonsType is not blank
  button1OnClick = null,
  button2Text,
  button2Colour = "green-500",
  button2OnClick = null,
  button3Text,
  button3Colour = "yellow-500",
  button3OnClick = null,
  submitBtn = 2,
  buttonsType = "blank", // "blank" / "filled"
  buttonsAlign = "full", // "full" / "center" / "left" / "right"
  buttonsGap = 4,
  buttonsWidth = "max", // "max" / "nomax"
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (canClose && submitBtn !== 0) {
      const buttonActions = {
        1: button1OnClick,
        2: button2OnClick,
        3: button3OnClick,
      };

      const action = buttonActions[submitBtn];
      if (action) {
        action();
      }
    } else {
      null;
    }
  };

  return (
    <Popup onClose={handleClose} onSubmit={handleSubmit}>
      <div className="min-h-40 bg-gray-50 rounded-sm shadow-md shadow-black border-2 border-gray-300 max-w-md w-full">
        <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300">
          <h2 className="font-Poppins text-lg font-semibold text-gray-800">
            {title}
          </h2>
          {canClose && handleClose && (
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={handleClose}
            >
              <IoCloseCircle className="text-2xl" />
            </button>
          )}
        </div>
        <div className="p-4">
          <p className="font-Poppins text-gray-800">{message}</p>
          {buttonsCount > 0 && (
            <div
              className={`flex items-center ${
                buttonsAlign === "full" && `justify-between`
              } ${buttonsAlign === "center" && `justify-center`} ${
                buttonsAlign === "right" && `justify-end`
              } ${
                buttonsAlign === "left" && `justify-start`
              } pt-8 space-x-${buttonsGap}`}
            >
              {button1Text && (
                <button
                  className={`
                    ${
                      buttonsType === "blank"
                        ? `text-${button1Colour} border-${button1Colour} border-2 hover:bg-${button1Colour} hover:text-white `
                        : `text-white bg-${button1Colour} hover:bg-${button1HoverColour} `
                    } 
                    ${buttonsWidth === "max" ? `w-full ` : `min-w-[100px] `}
                  p-1 font-Poppins rounded-sm`}
                  onClick={button1OnClick}
                >
                  {button1Text}
                </button>
              )}

              {button2Text && (
                <button
                  className={`
                  ${
                    buttonsType === "blank"
                      ? `text-${button2Colour} border-${button2Colour} border-2 hover:bg-${button2Colour} hover:text-white `
                      : `text-white bg-${button2Colour} hover:bg-${button2HoverColour} `
                  } 
                  ${buttonsWidth === "max" ? `w-full ` : `min-w-[100px] `}
                p-1 font-Poppins rounded-sm`}
                  onClick={button2OnClick}
                >
                  {button2Text}
                </button>
              )}

              {button3Text && (
                <button
                  className={`
                  ${
                    buttonsType === "blank"
                      ? `text-${button3Colour} border-${button3Colour} border-2 hover:bg-${button3Colour} hover:text-white `
                      : `text-white bg-${button3Colour} hover:bg-${button3HoverColour} `
                  } 
                  ${buttonsWidth === "max" ? `w-full ` : `min-w-[100px] `}
                p-1 font-Poppins rounded-sm`}
                  onClick={button3OnClick}
                >
                  {button3Text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default Dialog;

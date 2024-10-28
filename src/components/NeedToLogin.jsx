import React from "react";
import { useNavigate } from "react-router-dom";

const NeedToLogin = ({
  refQuery,
  title = "Protected Page",
  text = "This page is protected. Please log in to access the content.",
}) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    if (refQuery) {
      navigate(`/login?ref=${encodeURIComponent(refQuery)}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-50 rounded-md shadow-md shadow-black border-2 border-gray-300 max-w-md w-full p-6">
        <h2 className="font-Poppins text-xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="font-Poppins text-gray-800 mb-6">{text}</p>
        <button
          onClick={handleLoginRedirect}
          className="font-Poppins w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NeedToLogin;

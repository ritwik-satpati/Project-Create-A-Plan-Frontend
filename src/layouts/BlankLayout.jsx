import React from "react";

const BlankLayout = ({ children }) => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white">
      <div className="w-full sm:w-full md:w-full lg:w-[720px] h-full bg-white flex justify-center items-center">
        <div className="h-full w-full bg-zinc-50 p-2 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;

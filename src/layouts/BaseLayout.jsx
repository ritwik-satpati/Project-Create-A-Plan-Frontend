import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoPerson,
  IoPersonOutline,
  IoBookmarksOutline,
  IoBookmarks,
  IoPeople,
  IoPeopleOutline,
} from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";

const BaseLayout = ({ children, menu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const handlePlans = () => {
    navigate("/");
  };

  const handleShared = () => {
    // navigate("/shared");
    toast.warning("Feature coming soon ...");
  };

  const handleBookmark = () => {
    navigate("/bookmarks");
  };

  const handleAccount = () => {
    if (!user) {
      navigate(`/login?ref=${encodeURIComponent(location.pathname)}`);
    } else {
      navigate("/account");
    }
  };

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white">
      <div className="w-full sm:w-full md:w-full lg:w-[720px] h-full bg-white  flex flex-col justify-between">
        <div className="h-full bg-zinc-50 overflow-auto p-2">{children}</div>
        <div className="flex items-center justify-center w-full h-[70px] border-t-2 border-blue-100 bg-white">
          <div className="w-full h-full items-center flex justify-between space-x-2 px-2">
            <button
              className={`${
                menu === "plans"
                  ? `bg-blue-200 border-t-4 border-blue-800 text-blue-900 pb-1`
                  : `hover:bg-blue-200 hover:text-blue-900 text-blue-800`
              } w-full h-full flex flex-col items-center justify-center space-y-0.5 p-0.5`}
              onClick={handlePlans}
            >
              <div className="text-xl mt-1">
                {menu === "plans" ? <IoHome /> : <IoHomeOutline />}
              </div>
              <div
                className={`${
                  menu === "plans" ? `font-medium` : `font-normal`
                } font-Poppins text-center text-sm lg:text-base`}
              >
                Plans
              </div>
            </button>

            <button
              className={`${
                menu === "shared"
                  ? `bg-blue-200 border-t-4 border-blue-800 text-blue-900 pb-1`
                  : `hover:bg-blue-200 hover:text-blue-900 text-blue-800`
              } w-full h-full flex flex-col items-center justify-center space-y-0.5 p-0.5`}
              onClick={handleShared}
            >
              <div className="text-xl mt-1">
                {menu === "shared" ? <IoPeople /> : <IoPeopleOutline />}
              </div>
              <div
                className={`${
                  menu === "shared" ? `font-medium` : `font-normal`
                } font-Poppins text-center text-sm lg:text-base`}
              >
                Shared
              </div>
            </button>

            <button
              className={`h-full flex flex-col items-center justify-center space-y-0.5 p-0.5`}
              onClick={handleCreate}
            >
              <div className=" aspect-square rounded-sm flex flex-col items-center justify-center space-y-0.5 p-1 text-white bg-blue-800 hover:bg-blue-900">
                <div className="text-xl mt-1">
                  <RiAddBoxLine />
                </div>
                <div
                  className={`font-normal font-Poppins text-center text-sm lg:text-base`}
                >
                  Create
                </div>
              </div>
            </button>

            <button
              className={`${
                menu === "bookmarks"
                  ? `bg-blue-200 border-t-4 border-blue-800 text-blue-900 pb-1`
                  : `hover:bg-blue-200 hover:text-blue-900 text-blue-800`
              } w-full h-full flex flex-col items-center justify-center space-y-0.5 p-0.5`}
              onClick={handleBookmark}
            >
              <div className="text-xl mt-1">
                {menu === "bookmarks" ? (
                  <IoBookmarks />
                ) : (
                  <IoBookmarksOutline />
                )}
              </div>
              <div
                className={`${
                  menu === "bookmarks" ? `font-medium` : `font-normal`
                } font-Poppins text-center text-sm lg:text-base`}
              >
                Bookmarks
              </div>
            </button>

            <button
              className={`${
                menu === "account"
                  ? `bg-blue-200 border-t-4 border-blue-800 text-blue-900 pb-1`
                  : `hover:bg-blue-200 hover:text-blue-900 text-blue-800`
              } w-full h-full flex flex-col items-center justify-center space-y-0.5 p-0.5`}
              onClick={handleAccount}
            >
              <div className="text-xl mt-1">
                {menu === "account" ? <IoPerson /> : <IoPersonOutline />}
              </div>
              <div
                className={`${
                  menu === "account" ? `font-medium` : `font-normal`
                } font-Poppins text-center text-sm lg:text-base`}
              >
                Account
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;

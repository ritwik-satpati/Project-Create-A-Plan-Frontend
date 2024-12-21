import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/auth.api";
import {
  logoutUserFail,
  logoutUserRequest,
  logoutUserSuccess,
} from "../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { BiEdit, BiSolidEdit } from "react-icons/bi";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [logoutApiCall, { isLoading: isLogoutUserLoading }] =
    useLogoutMutation();

  const handleLogout = async () => {
    try {
      dispatch(logoutUserRequest());
      const res = await logoutApiCall().unwrap({});
      toast.success(res?.message);
      dispatch(logoutUserSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutUserFail());
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleUpcomingFeature = () => {
    toast.warning("Feature coming soon ...");
  };

  return (
    <>
      <div className="overflow-hidden space-y-5">
        <div className="space-y-1">
          <div className="font-Poppins text-2xl font-bold text-slate-800">
            My Account
          </div>
          <div className="font-Poppins text-base font-medium text-slate-500">
            Account information about the user
          </div>
        </div>
        <div className="border-y border-gray-200 p-0 font-Poppins">
          <dl className="divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Name</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ONE Account Id
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?._id}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Public Name</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">User Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?._id}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Email Address</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Phone number</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?.phone || "NA"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Gender</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?.gender || "NA"}
              </dd>
            </div>
            <div className="hidden py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="flex items-center justify-start space-x-2 text-sm font-medium text-gray-500">
                <p>Address</p>
                <div
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleUpcomingFeature}
                >
                  <BiSolidEdit />
                </div>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account?.address || "NA"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            onClick={handleLogout}
            className="font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;

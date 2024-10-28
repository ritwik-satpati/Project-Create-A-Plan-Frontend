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

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

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
        <div className="border-y border-gray-200 px-4 py-5 sm:p-0 font-Poppins">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.phone || "NA"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.gender || "NA"}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.address || "NA"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            onClick={handleLogout}
            className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;

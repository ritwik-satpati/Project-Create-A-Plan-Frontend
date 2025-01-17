import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dialog from "./Dialog";
import {
  useForgetPassowrdMutation,
  useResetPassowrdMutation,
} from "../redux/api/auth.api";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryString = window.location.search;

  const query = new URLSearchParams(location.search);
  const refQueryValue = query.get("ref");
  const emailQueryValue = query.get("email");
  const uidQueryValue = query.get("uid");
  const tokenQueryValue = query.get("token");

  const [forgetPassowrdApiCall, { isLoading: forgetPassowrdApiIsLoading }] =
    useForgetPassowrdMutation();
  const [resetPassowrdApiCall, { isLoading: resetPassowrdApiIsLoading }] =
    useResetPassowrdMutation();

  const [page, setPage] = useState("send-mail");
  const [email, setEmail] = useState(emailQueryValue || "");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Update the "email" query parameter in the URL
    const query = new URLSearchParams(window.location.search);
    query.set("email", newEmail); // Use the new email value
    window.history.pushState({}, "", `?${query.toString()}`);
  };

  const handleChangeEmail = () => {
    query.delete("uid");
    // query.delete("email");
    query.delete("token");

    setIsMailSent(false);
    navigate(`/forget-password?${query}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uidQueryValue && emailQueryValue && tokenQueryValue) {
      handleChangePassword(e);
    } else {
      handleSendMail(e);
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill the Email fields!");
    } else {
      try {
        const res = await forgetPassowrdApiCall({
          email,
          queryString,
        }).unwrap();
        toast.success(res?.message);
        setIsMailSent(true);
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !newConfirmPassword) {
      toast.error("Please fill in all * the required fields!");
    } else if (newPassword != newConfirmPassword) {
      toast.error("New Password and Confirm Password are not same!");
    } else {
      query.delete("uid");
      query.delete("token");
      const queryString = `${query}`;

      try {
        const res = await resetPassowrdApiCall({
          uidQueryValue,
          tokenQueryValue,
          newPassword,
          queryString,
        }).unwrap();
        toast.success(res?.message);

        handleLogin();
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      }
    }
  };

  const handleLogin = () => {
    query.delete("uid");
    // query.delete("email");
    query.delete("token");

    navigate(`/login?${query}`);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="font-Poppins mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Email
                  <span className="text-red-600"> *</span>
                </label>
                {emailQueryValue && uidQueryValue && tokenQueryValue && (
                  <div className="text-sm">
                    <div
                      className="font-Poppins font-semibold text-blue-800 hover:text-blue-900 cursor-pointer"
                      onClick={handleChangeEmail}
                    >
                      Change Email
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="relative font-Poppins appearance-none outline-none block w-full rounded-sm border-0 pl-1.5 pr-8 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                  disabled={
                    emailQueryValue && uidQueryValue && tokenQueryValue && true
                  }
                />
              </div>
            </div>
            {emailQueryValue && uidQueryValue && tokenQueryValue && (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="newPassword"
                      className="font-Poppins block font-medium leading-6 text-gray-800"
                    >
                      New Password
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>
                  <div className="mt-1 relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={isPasswordVisible ? "text" : "password"}
                      // required
                      autoComplete="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="relative font-Poppins appearance-none outline-none block w-full rounded-sm border-0 pl-1.5 pr-8 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                    />
                    <div
                      className="absolute top-0 right-0 px-1.5 h-full flex items-center text-xl cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="newPassword"
                      className="font-Poppins block font-medium leading-6 text-gray-800"
                    >
                      Confirm Password
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>
                  <div className="mt-1 relative">
                    <input
                      id="newConfirmPassword"
                      name="newConfirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      // required
                      autoComplete="password"
                      value={newConfirmPassword}
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                      className="relative font-Poppins appearance-none outline-none block w-full rounded-sm border-0 pl-1.5 pr-8 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                    />
                    <div
                      className="absolute top-0 right-0 px-1.5 h-full flex items-center text-xl cursor-pointer"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                  <div className="pt-0.5 font-Poppins text-xs">
                    {!newConfirmPassword || !newPassword ? (
                      <p className="text-red-600">
                        Confirm Password can not be blank!
                      </p>
                    ) : newConfirmPassword === newPassword ? (
                      <p className="text-green-600">
                        Confirm Password is matched!
                      </p>
                    ) : (
                      <p className="text-red-600">
                        Confirm Password is not matched!
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="pt-2">
              {resetPassowrdApiIsLoading || forgetPassowrdApiIsLoading ? (
                <button
                  disabled
                  className="cursor-default font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  {emailQueryValue && uidQueryValue && tokenQueryValue ? (
                    <p>Changing Password ...</p>
                  ) : (
                    <p>Sending Email ...</p>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="cursor-pointer font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  {emailQueryValue && uidQueryValue && tokenQueryValue ? (
                    <p>Change Password</p>
                  ) : (
                    <p>Send Email</p>
                  )}
                </button>
              )}
              <div
                className="pt-2 text-sm font-Poppins font-semibold cursor-pointer"
                onClick={handleLogin}
              >
                Remember your password ?{" "}
                <span className="text-blue-800 hover:text-blue-900">
                  Login Now
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isMailSent && (
        <Dialog
          isOpen={isMailSent}
          title="Account Activation Required"
          message={`An email has been sent to your email address: ${email}. Please check your inbox to change your account password!`}
          canClose={false}
          buttonsCount={1}
          button1Text={"Change Email"}
          button1OnClick={handleChangeEmail}
          button1Colour="blue-500"
        />
      )}
    </>
  );
};

export default ForgetPassword;

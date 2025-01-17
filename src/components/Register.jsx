import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/api/auth.api";
import {
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
} from "../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { supportedMailDomain } from "../constants/supportedMailDomain";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Dialog from "./Dialog";
import { FaCircleInfo } from "react-icons/fa6";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryString = window.location.search;

  const query = new URLSearchParams(location.search);
  const refQueryValue = query.get("ref");
  const emailQueryValue = query.get("email");

  const [registerApiCall, { isLoading }] = useRegisterMutation();

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(emailQueryValue || "");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [isShowEmailList, setIsShowEmailList] = useState(false);

  useEffect(() => {
    if (user) {
      if (refQueryValue) {
        navigate(`${refQueryValue}`);
      } else {
        navigate("/account");
      }
    }
  }, [navigate, user]);

  const supportedMailDomainString = supportedMailDomain.join(",\n");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Update the "email" query parameter in the URL
    const query = new URLSearchParams(window.location.search);
    query.set("email", newEmail); // Use the new email value
    window.history.pushState({}, "", `?${query.toString()}`);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all * the required fields!");
    } else {
      const domain = email.substring(email.indexOf("@"));

      if (supportedMailDomain.includes(domain)) {
        try {
          dispatch(registerUserRequest());
          const res = await registerApiCall({
            name,
            email,
            password,
            queryString,
          }).unwrap();
          toast.success(res?.message);
          dispatch(registerUserSuccess());
          setIsMailSent(true);
        } catch (err) {
          dispatch(registerUserFail());
          toast.error(err?.data?.message || "Something went wrong");
        }
      } else {
        toast.error(
          "Unsupported Mail Domain. Check Supported Mail Domains List!"
        );
        setIsShowEmailList(true);
      }
    }
  };

  const handleLogin = () => {
    navigate(`/login${queryString}`);
  };

  const handleAbout = () => {
    navigate(`/about${queryString}`);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="font-Poppins mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
            Register as a new user
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="email"
                className="font-Poppins block font-medium leading-6 text-gray-800"
              >
                Name
                <span className="text-red-600"> *</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={handleNameChange}
                  className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-Poppins font-medium leading-6 text-gray-800 flex items-center justify-start space-x-2"
              >
                <p>
                  Email address
                  <span className="text-red-600"> *</span>
                </p>
                <div
                  className="cursor-pointer text-xs pt-0.5"
                  onClick={() => setIsShowEmailList(true)}
                >
                  <FaCircleInfo />
                </div>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-Poppins block font-medium leading-6 text-gray-800"
                >
                  Password
                  <span className="text-red-600"> *</span>
                </label>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
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

            <div className="pt-2">
              {isLoading ? (
                <button
                  disabled
                  className="cursor-default font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  Signing up ...
                </button>
              ) : (
                <button
                  type="submit"
                  className="cursor-pointer font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  Sign up
                </button>
              )}
              <div
                className="pt-3 text-sm font-Poppins font-semibold cursor-pointer"
                onClick={handleLogin}
              >
                Already have an account ?{" "}
                <span className="text-blue-800 hover:text-blue-900">
                  Login Now
                </span>
              </div>
              <div
                className="pt-2 text-sm font-Poppins font-semibold cursor-pointer"
                onClick={handleAbout}
              >
                Are you a developer ?{" "}
                <span className="text-blue-800 hover:text-blue-900">
                  Contribute your skills
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isShowEmailList && (
        <Dialog
          isOpen={isShowEmailList}
          title="Email Domain can be used"
          message={supportedMailDomainString}
          canClose={true}
          handleClose={() => setIsShowEmailList(false)}
        />
      )}

      {isMailSent && (
        <Dialog
          isOpen={isMailSent}
          title="Account Activation Required"
          message={`An email has been sent to your email address: ${email}. Please check your inbox to activate your account!`}
          canClose={false}
          buttonsCount={0}
        />
      )}
    </>
  );
};

export default Register;

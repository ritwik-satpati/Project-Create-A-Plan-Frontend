import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/api/auth.api";
import {
  loginUserFail,
  loginUserRequest,
  loginUserSuccess,
} from "../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { supportedMailDomain } from "../constants/supportedMailDomain";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryString = window.location.search;

  const query = new URLSearchParams(location.search);
  const refQueryValue = query.get("ref");

  const [loginApiCall, { isLoading }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (refQueryValue) {
        navigate(`${refQueryValue}`);
      } else {
        navigate("/account");
      }
    }
  }, [navigate, user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all the required fields!");
    } else {
      try {
        dispatch(loginUserRequest());
        const res = await loginApiCall({ email, password }).unwrap();
        toast.success(res?.message);
        dispatch(loginUserSuccess({ ...res.data.user }));
        if (refQueryValue) {
          navigate(`${refQueryValue}`);
        } else {
          navigate("/");
        }
      } catch (err) {
        dispatch(loginUserFail());
        toast.error(err?.data?.message || "Something went wrong");
      }
    }
  };

  const handleRegister = () => {
    navigate(`/register${queryString}`);
  };

  const handleForgotPassword = () => {
    toast.warn("Feature coming soon ...");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="font-Poppins mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="font-Poppins block font-medium leading-6 text-gray-800"
              >
                Email address
                <span className="text-red-600"> *</span>
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
                <div className="text-sm">
                  <div
                    className="font-Poppins font-semibold text-blue-800 hover:text-blue-900 cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </div>
                </div>
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
              <button
                type="submit"
                onClick={handleLogin}
                className="font-Poppins flex w-full justify-center rounded-sm bg-blue-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                Sign in
              </button>
              <div
                className="pt-2 text-sm font-Poppins font-semibold cursor-pointer"
                onClick={handleRegister}
              >
                Have no account ?{" "}
                <span className="text-blue-800 hover:text-blue-900">
                  Create Account
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

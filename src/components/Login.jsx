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

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
  };

  const handleRegister = () => {
    toast.warn("Create Account is currently disable!");
    // navigate("/register");
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
                  className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
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
                </label>
                <div className="text-sm">
                  <div
                    className="font-Poppins font-semibold text-indigo-700 hover:text-indigo-800 cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="font-Poppins appearance-none outline-none block w-full rounded-sm border-0 px-1.5 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                onClick={handleLogin}
                className="font-Poppins flex w-full justify-center rounded-sm bg-indigo-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
              >
                Sign in
              </button>
              <div
                className="pt-2 text-sm font-Poppins font-semibold cursor-pointer"
                onClick={handleRegister}
              >
                Have no account ?{" "}
                <span className="text-indigo-700 hover:text-indigo-800">
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

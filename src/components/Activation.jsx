import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useActivationMutation } from "../redux/api/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  activeUserFail,
  activeUserRequest,
  activeUserSuccess,
} from "../redux/slices/auth.slice";

const Activation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activationToken } = useParams();

  const queryString = window.location.search;

  const query = new URLSearchParams(location.search);
  const refQueryValue = query.get("ref");

  const { user } = useSelector((state) => state.auth);

  const [activationApiCall, { isLoading, data, error }] =
    useActivationMutation();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(`${refQueryValue}`);
      toast.success("User is logged-in successfully");
    }
  }, [user, navigate]);

  useEffect(() => {
    const activateUser = async () => {
      try {
        dispatch(activeUserRequest());
        const res = await activationApiCall(activationToken).unwrap();
        toast.success(res?.message);
        dispatch(activeUserSuccess({ ...res.data.user }));
      } catch (err) {
        setIsError(true);
        toast.error(
          err?.data?.message || "Activation failed. Please try again."
        );
        dispatch(activeUserFail());
      }
    };

    activateUser();
  }, [activationApiCall, activationToken, dispatch]);

  const handleLogin = () => {
    if (queryString === null) {
      navigate(`/login`);
    } else {
      navigate(`/login${queryString}`);
    }
  };

  const handleRegister = () => {
    if (queryString === null) {
      navigate(`/register`);
    } else {
      navigate(`/register${queryString}`);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center align-middle font-Poppins">
      {isLoading ? (
        <div className="text-center">
          <p className=" text-xl">Your account is being creating ...</p>
          <p>Kindly wait for sometime</p>
        </div>
      ) : isError ? (
        <div className="text-center">
          <p className=" text-xl">Your token is expired!</p>
          <p>
            Kindly register as a new account{" "}
            <span
              className=" text-blue-700 underline cursor-pointer"
              onClick={handleRegister}
            >
              Click here
            </span>
          </p>
          <p>
            Kindly login to your account{" "}
            <span
              className=" text-blue-700 underline cursor-pointer"
              onClick={handleLogin}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className=" text-xl">
            Your account has been created suceessfully!
          </p>
          <p>
            Kindly login to your account, if you are not redirected{" "}
            <span
              className=" text-blue-700 underline cursor-pointer"
              onClick={handleLogin}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Activation;

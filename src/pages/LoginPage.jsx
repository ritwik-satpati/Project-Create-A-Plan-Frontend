import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../components/Login";
import MetaData from "../utils/MetaData";

const LoginPage = () => {
  return (
    <>
      <MetaData page="Login" keywords="Login, Auth" />

      <BaseLayout menu="account">
        <Login />
      </BaseLayout>
    </>
  );
};

export default LoginPage;

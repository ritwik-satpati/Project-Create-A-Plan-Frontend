import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <>
      <BaseLayout menu="account">
        <Login />
      </BaseLayout>
    </>
  );
};

export default LoginPage;

import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Register from "../components/Register";
import MetaData from "../utils/MetaData";

const RegisterPage = () => {
  return (
    <>
      <MetaData page="Register" keywords="Register, Auth" />

      <BaseLayout menu="account">
        <Register />
      </BaseLayout>
    </>
  );
};

export default RegisterPage;

import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import MetaData from "../utils/MetaData";
import ForgetPassword from "../components/ForgetPassword";

const ForgetPasswordPage = () => {
  return (
    <>
      <MetaData page="Forget Password" keywords="ForgetPassword, Auth" />

      <BlankLayout>
        <ForgetPassword />
      </BlankLayout>
    </>
  );
};

export default ForgetPasswordPage;

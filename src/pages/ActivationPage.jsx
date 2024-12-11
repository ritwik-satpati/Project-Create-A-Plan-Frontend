import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import MetaData from "../utils/MetaData";
import Activation from "../components/Activation";

const ActivationPage = () => {
  return (
    <>
      <MetaData page="Active Account" keywords="Active, Auth" />

      <BlankLayout>
        <Activation />
      </BlankLayout>
    </>
  );
};

export default ActivationPage;

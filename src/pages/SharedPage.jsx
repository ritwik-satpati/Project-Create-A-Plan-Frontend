import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import MetaData from "../utils/MetaData";

const SharedPage = () => {
  return (
    <>
      <MetaData page="Shared" keywords="Shared, Plans" />

      <BaseLayout menu="shared" />
    </>
  );
};

export default SharedPage;

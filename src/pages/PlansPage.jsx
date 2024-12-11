import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Plans from "../components/Plans";
import MetaData from "../utils/MetaData";

const PlansPage = () => {
  return (
    <>
      <MetaData page="Plans" keywords="Plans" />

      <BaseLayout menu="plans">
        <Plans />
      </BaseLayout>
    </>
  );
};

export default PlansPage;

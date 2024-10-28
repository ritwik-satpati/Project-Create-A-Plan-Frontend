import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Plans from "../components/Plans";

const PlansPage = () => {
  return (
    <>
      <BaseLayout menu="plans">
        <Plans />
      </BaseLayout>
    </>
  );
};

export default PlansPage;

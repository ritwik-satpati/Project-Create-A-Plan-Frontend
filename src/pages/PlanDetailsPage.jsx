import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import PlanDetails from "../components/PlanDetails";
import MetaData from "../utils/MetaData";

const PlanDetailsPage = () => {
  return (
    <>
      <MetaData page="Plan" keywords="Plan" />

      <BaseLayout menu="plans">
        <PlanDetails />
      </BaseLayout>
    </>
  );
};

export default PlanDetailsPage;

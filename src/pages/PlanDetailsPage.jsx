import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import PlanDetails from "../components/PlanDetails";
import BlankLayout from "../layouts/BlankLayout";

const PlanDetailsPage = () => {
  return (
    <>
      <BaseLayout menu="plans">
        <PlanDetails />
      </BaseLayout>
    </>
  );
};

export default PlanDetailsPage;

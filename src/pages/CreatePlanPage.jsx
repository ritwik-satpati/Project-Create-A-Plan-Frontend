import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import CreateEditPlan from "../components/CreateEditPlan";
import MetaData from "../utils/MetaData";

const CreatePlanPage = () => {
  return (
    <>
      <MetaData page="Create" keywords="Create" />

      <BlankLayout menu="create">
        <CreateEditPlan pageType="create" />
      </BlankLayout>
    </>
  );
};

export default CreatePlanPage;

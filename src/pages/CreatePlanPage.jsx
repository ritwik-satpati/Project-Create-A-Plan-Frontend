import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import CreateEditPlan from "../components/CreateEditPlan";

const CreatePlanPage = () => {
  return (
    <>
      <BlankLayout menu="create">
        <CreateEditPlan pageType="create" />
      </BlankLayout>
    </>
  );
};

export default CreatePlanPage;

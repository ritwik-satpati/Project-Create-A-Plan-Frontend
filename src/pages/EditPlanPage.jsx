import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import CreateEditPlan from "../components/CreateEditPlan";

const EditPlanPage = () => {
  return (
    <>
      <BlankLayout menu="create">
        <CreateEditPlan pageType="edit" />
      </BlankLayout>
    </>
  );
};

export default EditPlanPage;

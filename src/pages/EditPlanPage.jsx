import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import CreateEditPlan from "../components/CreateEditPlan";
import MetaData from "../utils/MetaData";

const EditPlanPage = () => {
  return (
    <>
      <MetaData page="Edit Plan" keywords="Plan, Edit" />

      <BlankLayout menu="create">
        <CreateEditPlan pageType="edit" />
      </BlankLayout>
    </>
  );
};

export default EditPlanPage;

import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import EditItinerary from "../components/EditItinerary";

const EditItineraryPage = () => {
  return (
    <>
      <BlankLayout menu="create">
        <EditItinerary />
      </BlankLayout>
    </>
  );
};

export default EditItineraryPage;

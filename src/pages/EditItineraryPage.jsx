import React from "react";
import BlankLayout from "../layouts/BlankLayout";
import EditItinerary from "../components/EditItinerary";
import MetaData from "../utils/MetaData";

const EditItineraryPage = () => {
  return (
    <>
      <MetaData page="Edit Itinerary" keywords="Itinerary, Edit" />

      <BlankLayout menu="create">
        <EditItinerary />
      </BlankLayout>
    </>
  );
};

export default EditItineraryPage;

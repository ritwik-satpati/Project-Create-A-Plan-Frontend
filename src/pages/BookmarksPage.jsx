import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Bookmarks from "../components/Bookmarks";
import MetaData from "../utils/MetaData";

const BookmarksPage = () => {
  return (
    <>
      <MetaData page="Bookmarks" keywords="Bookmarks, Plans" />

      <BaseLayout menu="bookmarks">
        <Bookmarks />
      </BaseLayout>
    </>
  );
};

export default BookmarksPage;

import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Bookmarks from "../components/Bookmarks";

const BookmarksPage = () => {
  return (
    <>
      <BaseLayout menu="bookmarks">
        <Bookmarks />
      </BaseLayout>
    </>
  );
};

export default BookmarksPage;

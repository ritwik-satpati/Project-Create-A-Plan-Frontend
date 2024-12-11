import React from "react";
import BaseLayout from "../layouts/BaseLayout.jsx";
import About from "../components/About.jsx";
import MetaData from "../utils/MetaData.jsx";

const AboutPage = () => {
  return (
    <>
      <MetaData page="About" keywords="About" />

      <BaseLayout>
        <About />
      </BaseLayout>
    </>
  );
};

export default AboutPage;

import React from "react";
import { Helmet } from "react-helmet";
import Logo from "/Logo.png";

const MetaData = ({
  page,
  desc = "A JavaScript based project for Creating Plans & Itinerary for trips.",
  link = "https://zealous-sand-02e672400.4.azurestaticapps.net/",
  image = Logo,
  keywords,
}) => {
  let title = "Create A Plan";
  if (page) {
    title = `Create A Plan - ${page}`;
  }
  // console.log(title);

  let url = window.location.href || link;
  // console.log(url);

  let defaultKeywords = "Plans, Itinerary, Travel, Trip, Create A Plan";
  if (keywords) {
    keywords = defaultKeywords + ", " + keywords;
  } else {
    keywords = defaultKeywords;
  }
  // console.log(keywords.toLowerCase());

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="canonical" href={link} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords.toLowerCase()} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    </>
  );
};

export default MetaData;

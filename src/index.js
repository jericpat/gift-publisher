import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
// import * as data from './data.json';
import { metadataEmpty, metadataSingle, metadataDouble } from "./data/metadata";

// Automatically mount the app if an element with id='ResourceEditor' exists
const element = document.getElementById("ResourceEditor");
if (element) {
  const config = {
    authorizedApi: "/api/authorize",
    lfsServerUrl: "https://giftless-gift.herokuapp.com",
    dataset: metadataSingle, //for test purpose, suppose to be provided by portal
    metastoreApi: "/api/dataset",
  };

  ReactDOM.render(
    <React.StrictMode>
      <App config={config} />
    </React.StrictMode>,
    element
  );
}

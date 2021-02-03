import React from "react";
import ReactDOM from "react-dom";
import './assets/main.css'
import App from "./App";
import * as data from './data.json';

// Automatically mount the app if an element with id='ResourceEditor' exists
const element = document.getElementById("ResourceEditor");
if (element) {
  const config = {
    authorizedApi: "/api/authorize",
    lfsServerUrl: "https://giftless-gift.herokuapp.com", 
    dataset: data.default,
    metastoreApi: '/api/dataset'
  };

  ReactDOM.render(
    <React.StrictMode>
      <App config={config} />
    </React.StrictMode>,
    element
  );
}

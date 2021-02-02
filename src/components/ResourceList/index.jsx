import React from "react";
import PropTypes from "prop-types";

import "./ResourceList.css";

const ResourceList = ({ dataset }) => {
  console.log(dataset);
  return <div>Hey</div>
}

ResourceList.propTypes = {
  dataset: PropTypes.object.isRequired,
};

export default ResourceList;

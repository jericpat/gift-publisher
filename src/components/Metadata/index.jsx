import React from "react";
import PropTypes from "prop-types";

import "./Metadata.css";
import { encodeData, formatData } from "datapub";

const Metadata = ({ metadata, handleChange }) => {
  return (
    <>
      <h3 className="metadata-name">{metadata.path}</h3>
      <div className="metadata-form">
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="title">
            Title
          </label>
          <input
            className="metadata-input__input"
            type="text"
            name="title"
            id="title"
            value={metadata.title}
            onChange={handleChange}
          />
        </div>
      
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="encoding">
            Encoding
          </label>
          <select
            className="metadata-input__input"
            name="encoding"
            id="encoding"
            value={metadata.encoding || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            {encodeData.map((item) => (
              <option key={`format-${item.value}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="format">
            Format
          </label>
          <select
            className="metadata-input__input"
            name="format"
            id="format"
            value={(metadata.format || "").toLowerCase()}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="csv">
              CSV
            </option>
          </select>
        </div>
        <div className="metadata-input">
          <label className="metadata-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="metadata-input__textarea"
            type="text"
            name="description"
            id="description"
            value={metadata.description || ""}
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>
      </div>
    </>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Metadata;

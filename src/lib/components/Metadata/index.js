import React from "react";
import PropTypes from "prop-types";

import { encodeData, formatData } from "datapub";

const Metadata = ({ metadata, handleChange }) => {
  console.log(metadata);
  return (
    <>
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
            onChange={handleChange(e, metadata.hash)}
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
            onChange={handleChange(e, metadata.hash)}
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
            onChange={handleChange(e, metadata.hash)}
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
            onChange={handleChange(e, metadata.hash)}
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

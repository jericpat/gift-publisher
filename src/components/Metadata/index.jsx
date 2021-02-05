import React from "react";
import PropTypes from "prop-types";
import { encodeData } from "datapub";

const Metadata = ({ dataset, handleChange }) => {

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
            value={dataset.title}
            onChange={(e) => { handleChange(e) }}
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
            value={dataset.encoding || ""}
            onChange={(e) => { handleChange(e) }}
            required
          >
            <option value="utf_8">
              UTF-8
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
          >
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
            value={dataset.description || ""}
            onChange={(e) => { handleChange(e) }}
            rows={4}
          ></textarea>
        </div>
      </div>
    </>
  );
};

Metadata.propTypes = {
  dataset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Metadata;

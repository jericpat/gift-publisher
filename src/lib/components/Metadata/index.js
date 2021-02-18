import { React } from "react";
import PropTypes from "prop-types";
import { encodeData } from "datapub-nocss";
import countries from "../../db/countries.json"

const Metadata = ({ dataset, handleChange }) => {

  return (
    <>
      <h2>Mandatory fields are marked with an asterisks(<span className="ast-important" >*</span>)</h2>
      <div className="metadata-input">
        <input
          className="metadata-input__input"
          type="text"
          name="title"
          id="title"
          value={dataset.title}
          onChange={(e) => { handleChange(e) }}
        />
        <label className="metadata-label" htmlFor="title">
          <span className="ast-important" >*</span>Title of the dataset
        </label>
      </div>

      <div className="metadata-input">
        <textarea
          className="metadata-input__textarea"
          type="text"
          name="description"
          id="description"
          value={dataset.description || ""}
          onChange={(e) => { handleChange(e) }}
          rows={5}
        ></textarea>
        <label className="metadata-label" htmlFor="description">
          <span className="ast-important" >*</span>Description of the dataset
      </label>
      </div>

      <div className="metadata-form">
        <div>
          <div className="metadata-input">
            <select
              className="metadata-input__input"
              name="continent"
              id="continent"
              value={dataset.continent || ""}
              onChange={(e) => { handleChange(e) }}
              required
            >
              <option value="">
                Select
            </option>
              <option value="Europe">
                Europe
            </option>
              <option value="Africa">
                Africa
            </option>
              <option value="Asia">
                Asia
            </option>
              <option value="North America">
                North America
            </option>
              <option value="South America">
                South America
            </option>
              <option value="Australia">
                Australia
            </option>
            </select>
            <label className="metadata-label" htmlFor="continent">
              Continent
          </label>
          </div>
          <div className="metadata-input">
            <select
              className="metadata-input__input"
              name="country"
              id="country"
              value={dataset.country || ""}
              onChange={(e) => { handleChange(e) }}
              required
            >
              <option value="">
                Select
            </option>
              {countries.map((item) => (
                <option key={`format-${item.text}`} value={item.text}>
                  {item.text}
                </option>
              ))}
            </select>
            <label className="metadata-label" htmlFor="encoding">
              Country
          </label>
          </div>
        </div>
        <div className="metadata-input">
          <input
            className="metadata-input__input"
            type="text"
            name="tags"
            id="tags"
            placeholder="Finance, Economic, Argentina"
            value={dataset.tags}
            onChange={(e) => { handleChange(e) }}
          />
          <label className="metadata-label" htmlFor="tags">
            Tags
          </label>
        </div>
      </div>

      <div className="metadata-form">
        <div className="metadata-input">
          <input
            className="metadata-input__input"
            type="text"
            name="region"
            id="region"
            value={dataset.region}
            onChange={(e) => { handleChange(e) }}
          />
          <label className="metadata-label" htmlFor="region">
            Region
        </label>
        </div>
        <div className="metadata-input">
          <input
            className="metadata-input__input"
            type="text"
            name="author_website"
            id="author_website"
            value={dataset.author_website}
            onChange={(e) => { handleChange(e) }}
          />
          <label className="metadata-label" htmlFor="author_website">
            Author's Website
        </label>
        </div>
      </div>

      <div className="metadata-form">
        <div className="metadata-input">
          <input
            className="metadata-input__input"
            type="text"
            name="city"
            id="city"
            value={dataset.city}
            onChange={(e) => { handleChange(e) }}
          />
          <label className="metadata-label" htmlFor="city">
            City
        </label>
        </div>
        <div className="metadata-input">
          <input
            className="metadata-input__input"
            type="text"
            name="author_email"
            id="author_email"
            value={dataset.author_email}
            onChange={(e) => { handleChange(e) }}
          />
          <label className="metadata-label" htmlFor="author_email">
            Author's Email Address
        </label>
        </div>
      </div>
      <br />

      <div className="metadata-form">
        <div>
          <h1><b>Fiscal Period</b></h1>
          <div className="metadata-input">

            <input
              className="metadata-input__input"
              type="date"
              name="start_date"
              id="start_date"
              value={dataset.start_date}
              onChange={(e) => { handleChange(e) }}
            />
            <label className="metadata-label" htmlFor="start_date">
              <span className="ast-important" >*</span>Starting date (month-day-year)
            </label>
          </div>
          <div className="metadata-input">

            <input
              className="metadata-input__input"
              type="date"
              name="end_date"
              id="end_date"
              value={dataset.end_date}
              onChange={(e) => { handleChange(e) }}
            />
            <label className="metadata-label" htmlFor="end_date">
              <span className="ast-important" >*</span>Ending date (month-day-year)
            </label>
          </div>

        </div>
        <div >
          <h1><b>Encoding and file format</b></h1>
          <div>
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
            <label className="metadata-label" htmlFor="encoding">
              File encoding: If you're unsure about this setting, please use UTF-8
          </label>
          </div>
          <div>
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
          <label className="metadata-label" htmlFor="format">
            File format
          </label>
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import InputFile from "../InputFile";

const Choose = ({ onChangeHandler }) => {
  const [uploadOption, setUploadOption] = useState(false);

  return (
    <div className="upload-choose">
      {uploadOption ? (
        <>
          {uploadOption === "file" && (
            <InputFile onChangeHandler={onChangeHandler} />
          )}
        </>
      ) : (
        <div>
          <button className="choose-btn" onClick={() => setUploadOption("file")}>Choose a file to Upload </button>
        </div>
      )}
    </div>
  );
};

Choose.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
};

export default Choose;

import React from "react";
import { Client } from "giftless-client";
import * as data from "frictionless.js";
import ProgressBar from "../ProgressBar";
import { onFormatBytes, isValidURL } from "../../utils";
import Choose from "../Choose";
import toArray from "stream-to-array";
import "./Upload.css";
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: props.datasetId,
      organizationId: props.organizationId,
      dataset: props.dataset,
      selectedFile: null,
      fileSize: 0,
      formattedSize: "0 KB",
      start: "",
      loaded: 0,
      success: false,
      error: false,
      fileExists: false,
      loading: false,
      timeRemaining: 0,
      hashInProgress: false,
      hashLoaded: 0,
      uploadInProgress: false,
      uploadedFileType: null,
    };
  }

  onChangeHandler = async (event) => {
    let { formattedSize, selectedFile } = this.state;
    let path = "";
    if (event.target.type == "file" && event.target.files.length > 0) {
      selectedFile = event.target.files[0];
      path = `data/${selectedFile.name}`; //path property in data package resource
      this.setState({ uploadedFileType: "file" });
    } else {
      selectedFile = event.target.value;
      if (!isValidURL(selectedFile)) {
        this.setErrorState("Invalid URL! Please ensure entered URL is correct");
        return;
      }
      this.setState({ uploadedFileType: "url" });
      path = selectedFile;
    }

    const { validFile, errorMsg, file } = await this.validFileSelected(
      selectedFile,
      event.target.type
    );

    if (!validFile) {
      this.setErrorState(errorMsg);
      return;
    }

    formattedSize = onFormatBytes(file.size || 0);

    let self = this;
    const hash = await file.hash("sha256", (progress) => {
      self.onHashProgress(progress);
    });

    Object.assign(file.descriptor, { hash });

    //check if file has the same schema
    if (!this.hasSameSchema(file._descriptor)) {
      this.setErrorState(
        "Schema of uploaded resource does not match existing one!"
      );
      return;
    }

    //check if file already exists in resource
    if (this.hasSameHash(file._descriptor)) {
      this.setErrorState("Possible duplicate, the resource already exists!");
      return;
    }

    //get sample
    let sample_stream = await file.rows({ size: 460 });
    let sample = (await toArray(sample_stream)).slice(0, 30);
    //get column names for table
    const column_names = sample[0]; //first row is the column names
    const tablePreviewColumns = column_names.map((item) => {
      return {
        Header: item,
        accessor: item,
      };
    });

    //prepare sample for use in table preview component
    let tablePreviewSample = [];
    sample.slice(1, 11).forEach((item) => {
      let temp_obj = {};
      item.forEach((field, i) => {
        temp_obj[column_names[i]] = field;
      });
      tablePreviewSample.push(temp_obj);
    });

    this.props.metadataHandler(
      Object.assign(file.descriptor, {
        sample,
        tablePreviewSample,
        tablePreviewColumns,
        path,
      })
    );

    this.setState({
      selectedFile,
      loaded: 0,
      success: false,
      fileExists: false,
      error: false,
      formattedSize,
    });

    await this.onClickHandler();
  };

  validFileSelected = (selectedFile, fileType) => {
    return new Promise(async (resolve, reject) => {
      if (fileType == "url") {
        const fileExt = selectedFile.split(".").pop();
        if (fileExt != "csv") {
          resolve({
            validFile: false,
            errorMsg:
              "File Type not supported! Please ensure specified url links to a CSV file",
            file: undefined,
          });
          return;
        }
        fetch(selectedFile)
          .then(async (resp) => {
            let file;
            try {
              file = data.open(selectedFile);
              await file.addSchema();
              resolve({
                validFile: true,
                errorMsg: "",
                file,
              });
            } catch (error) {
              console.log(error);
              resolve({
                validFile: false,
                errorMsg: "An error occurred when trying to download the file!",
                file,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            resolve({
              validFile: false,
              errorMsg: "An error occured when trying to download the file!",
            });
          });
      } else {
        const fileExt = selectedFile.type.split("/").pop();

        if (fileExt != "csv") {
          resolve({
            validFile: false,
            errorMsg: "File Type not supported! Please upload a CSV file",
            file: {},
          });
          return;
        }
        if (selectedFile.size == 0) {
          resolve({
            validFile: false,
            errorMsg:
              "CSV file is empty! Please upload a CSV file with contents",
            file: {},
          });
          return;
        }

        try {
          const file = data.open(selectedFile);
          await file.addSchema();
          resolve({ validFile: true, errorMsg: "", file });
        } catch (error) {
          console.log(error);
          resolve({
            validFile: false,
            errorMsg: "An error occurred when trying to load the file!",
            file: {},
          });
        }
      }
    });
  };

  setErrorState(errorMsg) {
    this.setState({ error: true, loading: false });
    this.props.handleUploadStatus({
      loading: false,
      success: false,
      error: true,
      errorMsg,
    });
  }

  onHashProgress = (progress) => {
    if (progress == 100) {
      this.setState({ hashInProgress: false });
    } else {
      this.setState({ hashLoaded: progress, hashInProgress: true });
    }
  };

  onUploadProgress = (progressEvent) => {
    const loaded = Number(
      ((progressEvent.loaded / progressEvent.total) * 100).toFixed()
    );
    this.onTimeRemaining(progressEvent.loaded);
    this.setState({
      loaded,
      uploadInProgress: true,
    });
  };

  onTimeRemaining = (progressLoaded) => {
    const end = new Date().getTime();
    const duration = (end - this.state.start) / 1000;
    const bps = progressLoaded / duration;
    const kbps = bps / 1024;
    const timeRemaining = (this.state.fileSize - progressLoaded) / kbps;
    this.setState({
      timeRemaining: timeRemaining / 1000,
    });
  };

  hasSameSchema = (resource) => {
    if (
      Object.keys(this.state.dataset).includes("resources") &&
      this.state.dataset.resources.length > 0
    ) {
      const newFields = resource.schema.fields.map((field) => {
        return field.name;
      });
      const oldFields = this.state.dataset.resources[0].schema.fields.map(
        (field) => {
          return field.name;
        }
      );
      return JSON.stringify(newFields) === JSON.stringify(oldFields);
    } else {
      return true;
    }
  };

  hasSameHash(newResource) {
    if (
      Object.keys(this.state.dataset).includes("resources") &&
      this.state.dataset.resources.length > 0
    ) {
      const { resources } = this.state.dataset;
      const sameHashes = resources.map((resource) => {
        return resource.hash == newResource.hash;
      });
      return sameHashes.includes(true);
    } else {
      return false;
    }
  }

  onClickHandler = async () => {
    const { selectedFile, uploadedFileType } = this.state;
    if (uploadedFileType == "url") {
      this.setState({
        success: true,
        loading: false,
        loaded: 100,
      });

      this.props.handleUploadStatus({
        loading: false,
        success: true,
      });
    } else {
      const start = new Date().getTime();
      const { organizationId, lfsServerUrl } = this.props;
      const client = new Client(lfsServerUrl);

      const resource = data.open(selectedFile);
      this.setState({
        fileSize: resource.size,
        start,
        loading: true,
      });

      this.props.handleUploadStatus({
        loading: true,
        error: false,
        success: false,
      });
      client
        .upload(
          resource,
          organizationId,
          this.state.datasetId,
          this.onUploadProgress
        )
        .then((response) => {
          this.setState({
            success: true,
            loading: false,
            fileExists: !response,
            loaded: 100,
          });

          this.props.handleUploadStatus({
            loading: false,
            success: true,
          });
        })
        .catch((error) => {
          console.error("Upload failed with error: " + error);
          this.setState({ error: true, loading: false });
          this.props.handleUploadStatus({
            loading: false,
            success: false,
            error: true,
            errorMsg: `Upload failed with error: ${error.message}`,
          });
        });
    }
  };

  render() {
    const {
      success,
      fileExists,
      error,
      selectedFile,
      formattedSize,
      hashInProgress,
      uploadInProgress,
      uploadedFileType,
    } = this.state;
    return (
      <div>
        <Choose
          onChangeHandler={this.onChangeHandler}
        />
        {uploadedFileType == "url" ? (
          <div>
            <p className="upload-file-name">Retrieving file from url...</p>
          </div>
        ) : (
          hashInProgress && (
            <div>
              <>
                <div>
                  <p className="upload-file-name">Computing file hash...</p>
                </div>
                <ProgressBar
                  progress={Math.round(this.state.hashLoaded)}
                  size={100}
                  strokeWidth={5}
                  circleOneStroke="#d9edfe"
                  circleTwoStroke={"#7ea9e1"}
                />
              </>
            </div>
          )
        )}
        {uploadInProgress && (
          <div>
            <>
              <div>
                <p className="upload-file-name">
                  Uploading {selectedFile.name}...
                </p>
                <p className="upload-file-name">Size: {formattedSize}</p>
              </div>
              <ProgressBar
                progress={this.state.loaded}
                size={100}
                strokeWidth={5}
                circleOneStroke="#d9edfe"
                circleTwoStroke={"#7ea9e1"}
                // timeRemaining={timeRemaining}
              />
              <h2>
                {success &&
                  !fileExists &&
                  !error &&
                  "File uploaded successfully"}
                {error && "Upload failed"}
              </h2>
            </>
          </div>
        )}
      </div>
    );
  }
}

export default Upload;

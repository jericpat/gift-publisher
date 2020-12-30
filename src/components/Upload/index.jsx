import React from "react";
import * as data from "frictionless.js";
import ProgressBar from "../ProgressBar";
import { onFormatBytes } from "../../utils";
import { Choose } from "datapub";
import toArray from "stream-to-array";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: props.datasetId,
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
      hashLoaded: 0
    };
  }

  onChangeHandler = async (event) => {
    let { formattedSize, selectedFile } = this.state;

    if (event.target.files.length > 0) {
      selectedFile = event.target.files[0];
      const file = data.open(selectedFile);
      try {
        await file.addSchema();
      } catch (e) {
        console.warn(e);
      }
      formattedSize = onFormatBytes(file.size);
      let self = this;
      const hash = await file.hash("sha256", (progress) => {
        self.onHashProgress(progress);
      });

      //get sample
      let sample_stream = await file.rows({ size: 460 });
      let sample_array = await toArray(sample_stream);

      //get column names for table
      const column_names = sample_array[0]; //first row is the column names
      const columns = column_names.map((item) => {
        return {
          Header: item,
          accessor: item,
        };
      });

      //prepare sample for use in table preview component
      let sample = []
      sample_array.slice(1, 5).forEach((item) => {
        let temp_obj = {}
        item.forEach((field, i) => {
          temp_obj[column_names[i]] = field
        })
        sample.push(temp_obj)
      });

      this.props.metadataHandler(Object.assign(file.descriptor, { hash, sample, columns }));

    }

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

  onHashProgress = (progress) => {
    if (progress === 100) {
      this.setState({ hashInProgress: false });
    } else {
      this.setState({ hashLoaded: progress, hashInProgress: true });
    }
  };

  onUploadProgress = (progressEvent) => {
    this.onTimeRemaining(progressEvent.loaded);
    this.setState({
      loaded: (progressEvent.loaded / progressEvent.total) * 100,
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

  onClickHandler = async () => {
    const start = new Date().getTime();
    const { selectedFile } = this.state;
    const { client } = this.props;

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

    // Use client to upload file to the storage and track the progress
    // client
    //   .pushBlob(resource, this.onUploadProgress)
    //   .then((response) => {
    //     this.setState({
    //       success: true,
    //       loading: false,
    //       fileExists: ! response,
    //       loaded: 100
    //     });

    //Temporarily set upload success to true so table preview can show in demo
    this.props.handleUploadStatus({
      loading: false,
      success: true,
    });
    
    // })
    // .catch((error) => {
    //   console.error("Upload failed with error: " + error);
    //   this.setState({ error: true, loading: false });
    //   this.props.handleUploadStatus({
    //     loading: false,
    //     success: false,
    //     error: true,
    //   });
    // });
  };

  render() {
    const {
      success,
      fileExists,
      error,
      timeRemaining,
      selectedFile,
      formattedSize,
      hashInProgress
    } = this.state;
    return (
      <div className="upload-area">
        <Choose
          onChangeHandler={this.onChangeHandler}
          onChangeUrl={(event) => console.log("Get url:", event.target.value)}
        />
        <div className="upload-area__info">
          {hashInProgress && (
            <>
              <ul className="upload-list">
                <li className="list-item">
                  <div className="upload-list-item">
                    <div>
                      <p className="upload-file-name">Computing file hash...</p>
                    </div>
                    <div>
                      <ProgressBar
                        progress={Math.round(this.state.hashLoaded)}
                        size={100}
                        strokeWidth={5}
                        circleOneStroke="#d9edfe"
                        circleTwoStroke={"#7ea9e1"}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="upload-area__info">
          {selectedFile && (
            <>
              <ul className="upload-list">
                <li className="list-item">
                  <div className="upload-list-item">
                    <div>
                      <p className="upload-file-name">Uploading {selectedFile.name}</p>
                      <p className="upload-file-size">{formattedSize}</p>
                    </div>
                    <div>
                      <ProgressBar
                        progress={Math.round(this.state.loaded)}
                        size={100}
                        strokeWidth={5}
                        circleOneStroke="#d9edfe"
                        circleTwoStroke={"#7ea9e1"}
                        timeRemaining={timeRemaining}
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <h2 className="upload-message">
                {success &&
                  !fileExists &&
                  !error &&
                  "File uploaded successfully"}
                {fileExists && "File uploaded successfully"}
                {error && "Upload failed"}
              </h2>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;

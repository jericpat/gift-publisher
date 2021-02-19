import React from "react";
import axios from "axios";
import TypeProcessor from "os-types/src/index";
import fileDownload from "js-file-download";
import PropTypes from "prop-types";
import Upload from "./components/Upload";
import TablePreview from "./components/TablePreview";
import TableSchema from "./components/TableSchema";
import ResourceList from "./components/ResourceList";
import Metadata from "./components/Metadata";
import "./App.css";
import ReactLogo from "./progressBar.svg";

export class DatasetEditor extends React.Component {
  constructor(props) {
    super(props);
    const dataset = props.config.dataset;
    dataset.encoding = "utf_8";
    dataset.format = "csv";
    dataset.tags = [];
    if (
      !("sample" in dataset) &&
      "resources" in dataset &&
      dataset["resources"].length > 0
    ) {
      dataset["sample"] = dataset["resources"][0]["sample"];
    } else {
      dataset["sample"] = [];
    }
    this.state = {
      dataset,
      resource: {}, //This will hold the uploaded resource metadata
      datasetId: dataset.id,
      ui: {
        fileOrLink: "",
        uploadComplete: false,
        success: false,
        error: false,
        loading: false,
        errorMsg: "",
      },
      client: null,
      isResourceEdit: false,
      currentStep: props.config.skipUpload ? 4 : 0,
      richTypeFilled: false,
      saveButtonText: "Save",
    };
    this.metadataHandler = this.metadataHandler.bind(this);
    this.handleRichTypeCount = this.handleRichTypeCount.bind(this);
  }

  metadataHandler(resource) {
    let {
      dataset,
      resource: updatedResource,
    } = this.mapResourceToDatapackageResource(resource);
    this.setState({
      dataset,
      resource: updatedResource,
    });
  }

  mapResourceToDatapackageResource(fileResource) {
    let dataset = { ...this.state.dataset };
    let resource = {};

    resource["bytes"] = fileResource.size;
    resource["hash"] = fileResource.hash;
    resource["format"] = fileResource.format;
    resource["schema"] = fileResource.schema;
    resource["encoding"] = fileResource.encoding;
    resource["mediatype"] = fileResource.type;
    resource["name"] = fileResource.name;
    resource["dialect"] = fileResource.dialect;
    resource["path"] = fileResource.path;

    if (Object.keys(dataset).includes("resources")) {
      dataset.resources.push(resource);
    } else {
      dataset["resources"] = [resource];
    }
    resource["sample"] = fileResource.sample;
    resource["columns"] = fileResource.columns;

    if (dataset["sample"].length == 0) {
      dataset["sample"] = fileResource.sample;
    }

    return { dataset, resource };
  }

  //set state of rich type field. If all rich type fields have been filled,
  // then activate the next button in the Table Schema screen
  handleRichTypeCount = (unfilledRichTypes) => {
    if (unfilledRichTypes == 0) {
      this.setState({
        richTypeFilled: true,
      });
    }
  };

  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const dataset = { ...this.state.dataset };

    if (["tags", "years_included"].includes(name)) {
      const vals = value.split(",");
      dataset[name] = vals.map((val) => val.trim());
    } else if (["disaggregation", "budget_stage"].includes(name)) {
      let currentVals = dataset[name] || [];
      if (!target.checked) {
        currentVals = currentVals.filter((val) => val != value); //remove value
        dataset[name] = currentVals;
      } else {
        if (!currentVals.includes(value)) {
          //only add value if it is unique
          currentVals.push(value);
          dataset[name] = currentVals;
        }
      }
    } else {
      dataset[name] = value;
    }
    this.setState({
      dataset,
    });
  };

  mapDatasetToFiscalFormat = (resource) => {
    const dataset = { ...this.state.dataset };

    resource.schema.fields.forEach((f) => {
      f.type = f.columnType;
      delete f.columnType; //os-types requires type to be of rich type and will not accept the property colunmType
    });
    let fdp = new TypeProcessor().fieldsToModel(resource["schema"]["fields"]);

    if (!Object.keys(dataset).includes("model")) {
      dataset.model = fdp.model;
    }
    resource.schema.fields = Object.values(fdp.schema.fields);

    dataset.resources.map((res) => {
      if (res.hash == resource.hash) {
        return resource;
      } else {
        return res;
      }
    });
    this.setState({
      dataset,
    });
  };

  downloadDatapackage = async () => {
    fileDownload(JSON.stringify(this.state.dataset), "datapackage.json");
  };

  deleteResource = (hash) => {
    const { dataset } = { ...this.state };
    if (window.confirm("Are you sure you want to delete this resource?")) {
      const temp_dataset = { ...dataset };
      if (temp_dataset.resources.length == 1) {
        temp_dataset.resources = [];
      } else {
        const newResource = temp_dataset.resources.filter(
          (resource) => resource.hash != hash
        );
        temp_dataset.resources = newResource;
      }
      axios({
        method: "post",
        url: `/api/dataset/${temp_dataset.name}`,
        data: {
          metadata: temp_dataset,
          description: temp_dataset.description,
        },
      }).then(
        (response) => {
          this.setState({ temp_dataset, resource: {} });
          alert("Resource has been removed sucessfully");
        },
        (error) => {
          console.log(error);
          alert("Error when removing resource!");
        }
      );
    }
  };

  setLoading = (isLoading) => {
    this.setState({
      ui: { ...this.state.ui, loading: isLoading },
    });
  };

  handleUploadStatus = (status) => {
    const { ui } = this.state;
    const newUiState = {
      ...ui,
      success: status.success,
      error: status.error,
      loading: status.loading,
      errorMsg: status.errorMsg,
    };
    this.setState({ ui: newUiState });
    if (status.success && !status.loading) {
      this.nextScreen();
    } else if (!status.success && status.error) {
      const dataset = { ...this.state.dataset };
      if ("resources" in dataset && dataset["resources"].length > 0) {
        dataset.resources.pop();
      }
      this.setState({ dataset });
      this.prevScreen();
    }

    //clears error message after 6 seconds
    setTimeout(() => {
      this.setState({ ui: { ...this.state.ui, errorMsg: "" } });
    }, 10000);
  };

  onChangeResourceId = (resourceId) => {
    this.setState({ resourceId });
  };

  nextScreen = () => {
    let currentStep = this.state.currentStep;
    if (currentStep == 3) {
      this.mapDatasetToFiscalFormat({ ...this.state.resource }); //generate model and fiscal schema as soon as richtypes have been updated.
    }
    let newStep = currentStep + 1;
    this.setState({ currentStep: newStep });
  };

  prevScreen = () => {
    let newStep = this.state.currentStep - 1;
    this.setState({ currentStep: newStep });
  };

  handleSaveDataset = async () => {
    this.setState({ saveButtonText: "Saving..." });

    axios({
      method: "post",
      url: `/api/dataset/${this.state.dataset.name}`,
      data: {
        metadata: this.state.dataset,
        description: this.state.dataset.description,
      },
    }).then(
      (response) => {
        this.setState({ saveButtonText: "Save" });
        alert("Uploaded Sucessfully");
        this.setState({ currentStep: 0 });
      },
      (error) => {
        console.log(error);
        alert("Error on upload dataset!");
      }
    );
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1 className="errorMsg">{this.state.ui.errorMsg}</h1>
        </div>
        {this.state.currentStep > 0 && (
          <img src={ReactLogo} width="50%" className="Img" />
        )}
        <form className="upload-wrapper">
          {this.state.currentStep == 0 && (
            <>
              <ResourceList
                dataset={this.state.dataset}
                addResourceScreen={this.nextScreen}
                deleteResource={this.deleteResource}
              />
            </>
          )}

          {this.state.currentStep == 1 && (
            <div>
              <div className="upload-header">
                <h1 className="upload-header__title_h1">
                  Provide your data file
                </h1>
                <h2 className="upload-header__title_h2">
                  Supported format: CSV
                </h2>
              </div>

              <Upload
                client={this.state.client}
                resource={this.state.resource}
                metadataHandler={this.metadataHandler}
                datasetId={this.state.datasetId}
                handleUploadStatus={this.handleUploadStatus}
                organizationId={"gift-data"}
                authToken={this.props.config.authToken}
                lfsServerUrl={this.props.config.lfsServerUrl}
                dataset={this.state.dataset}
              />
            </div>
          )}

          <div className="upload-edit-area">
            {this.state.resource.sample && this.state.currentStep == 2 && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">
                    Preview of your dataset
                  </h1>
                </div>
                <TablePreview
                  columns={this.state.resource.columns}
                  data={this.state.resource.sample}
                />
              </>
            )}
            {this.state.resource.schema && this.state.currentStep == 3 && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">
                    Describe your dataset
                  </h1>
                </div>
                <TableSchema
                  dataset={this.state.dataset}
                  schema={this.state.resource.schema}
                  data={this.state.resource.sample || []}
                  handleRichType={this.handleRichTypeCount}
                />
              </>
            )}
            {this.state.currentStep == 4 && !this.state.savedDataset && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">Describe Metadata</h1>
                </div>
                <Metadata
                  dataset={this.state.dataset}
                  handleChange={this.handleChangeMetadata}
                />
              </>
            )}
          </div>
        </form>

        <div className="resource-edit-actions">
          {this.state.currentStep == 4 &&
            !this.state.isResourceEdit &&
            this.state.resource && (
              <button className="btn-save" onClick={this.handleSaveDataset}>
                {this.state.saveButtonText}
              </button>
            )}
          {this.state.currentStep == 4 &&
            !this.state.isResourceEdit &&
            this.state.resource && (
              <button
                className="btn-download"
                onClick={this.downloadDatapackage}
              >
                Download Package
              </button>
            )}

          {this.state.ui.success &&
            this.state.currentStep > 1 &&
            this.state.currentStep < 4 &&
            this.state.currentStep !== 3 && (
              <button className="btn" onClick={this.nextScreen}>
                Next
              </button>
            )}

          {this.state.currentStep == 3 ? (
            this.state.richTypeFilled ? (
              <button className="btn" onClick={this.nextScreen}>
                Next
              </button>
            ) : (
              <button disabled={true} className="btn">
                Next
              </button>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

/**
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */
DatasetEditor.defaultProps = {
  config: {
    authorizedApi: "/api/authorize/",
    lfsServerUrl: "https://localhost:6000",
    dataset: {},
    metastoreApi: "/api/dataset/",
  },
};

DatasetEditor.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DatasetEditor;

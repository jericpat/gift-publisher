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

export default class DatasetEditor extends React.Component {
  constructor(props) {
    super(props);
    const dataset = props.config.dataset;
    dataset.encoding = "utf_8";
    dataset.format = "csv";

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
      tablePreviewSample: resource.tablePreviewSample,
      tablePreviewColumns: resource.tablePreviewColumns,
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
    resource["mediatype"] = "text/csv"
    resource["name"] = fileResource.name;
    resource["dialect"] = fileResource.dialect;
    resource["path"] = fileResource.path;
    resource["hashcopy"] = fileResource.hashCopy;

    if (Object.keys(dataset).includes("resources")) {
      dataset.resources.push(resource);
    } else {
      dataset["resources"] = [resource];
    }
    resource["sample"] = fileResource.sample;
    return { dataset, resource };
  }

  //set state of rich type field. If all rich type fields have been filled,
  // then activate the next button in the Table Schema screen
  handleRichTypeCount = (unfilledRichTypes) => {
    if (unfilledRichTypes <= 0) {
      this.setState({
        richTypeFilled: true,
      });
    } else {
      this.setState({
        richTypeFilled: false,
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
      const values = vals.map((val) => val.trim());
      dataset[name] = Array.from(new Set(values));
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
    let model;
    let schema;
    if (dataset.resources.length > 1) {
      //There's an existing resource, get schema and model
      model = dataset.resources[0].model;
      schema = dataset.resources[0].schema;
      resource.schema = schema;
      resource.model = model;
    } else {
      //first resource, generate schema and model
      resource.schema.fields.forEach((f) => {
        f.type = f.columnType;
        delete f.columnType; //os-types requires type to be of rich type and will not accept the property columnType
      });
      let fdp = new TypeProcessor().fieldsToModel(resource["schema"]["fields"]);
      resource.schema.fields = Object.values(fdp.schema.fields);
      resource.model = fdp.model;
    }

    const resources = dataset.resources.map((res) => {
      if (res.hash == resource.hash) {
        return resource;
      } else {
        return res;
      }
    });

    this.setState({
      dataset: { ...dataset, resources },
    });
  };

  downloadDatapackage = async () => {
    fileDownload(JSON.stringify(this.state.dataset), "datapackage.json");
  };

  deleteResource = (hash) => {
    const { dataset } = { ...this.state };
    if (window.confirm("Are you sure you want to delete this resource?")) {
      const temp_dataset = { ...dataset };
      let path;
      if (temp_dataset.resources.length == 1) {
        path = temp_dataset.resources[0].path;
        temp_dataset.resources = [];
      } else {
        const newResource = temp_dataset.resources.filter((resource) => {
          if (resource.hash == hash) {
            path = resource.path;
          }
          return resource.hash != hash;
        });
        temp_dataset.resources = newResource;
      }
      axios({
        method: "delete",
        url: `/api/dataset/${temp_dataset.name}`,
        data: {
          metadata: temp_dataset,
          path,
        },
      }).then((response) => {
        this.setState({ dataset: temp_dataset, resource: {} });
        alert("The resource has been removed successfully.");
      }).catch((error) => {
        console.log(error);
        alert("Error when removing the resource!");
      })
        .then((response) => {
          this.setState({ dataset: temp_dataset, resource: {} });
          alert("Resource has been removed successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("Error when removing resource!");
        });
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
      this.prevScreen();
    }

    //clears error message after 15 seconds
    setTimeout(() => {
      this.setState({ ui: { ...this.state.ui, errorMsg: "" } });
    }, 15000);
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
    }).then((response) => {
      this.setState({ saveButtonText: "Save" });
      alert("Uploaded successfully.");
      this.setState({ currentStep: 0 });
    }).catch((error) => {
      console.log(error);
      alert("An Error occurred when uploading the dataset!");
    })
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1 className="errorMsg">{this.state.ui.errorMsg}</h1>
        </div>
        <form
          className="upload-wrapper"
          onSubmit={(event) => {
            event.preventDefault();
            return this.handleSaveDataset();
          }}
        >
          {this.state.currentStep == 0 && (
            <div>
              <ResourceList
                dataset={this.state.dataset}
                addResourceScreen={this.nextScreen}
                deleteResource={this.deleteResource}
              />
             </div>
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
              <div>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">
                    Preview of your dataset
                  </h1>
                </div>
                <TablePreview
                  columns={this.state.tablePreviewColumns}
                  data={this.state.tablePreviewSample}
                />
              </div>
            )}
            {this.state.resource.schema && this.state.currentStep == 3 && (
              <div>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">
                    Describe your dataset
                  </h1>
                </div>
                <TableSchema
                  dataset={this.state.dataset}
                  schema={this.state.resource.schema}
                  data={this.state.tablePreviewSample || []}
                  handleRichType={this.handleRichTypeCount}
                />
              </div>
            )}
            {this.state.currentStep == 4 && (
              <div>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">Describe Metadata</h1>
                </div>
                <Metadata
                  dataset={this.state.dataset}
                  handleChange={this.handleChangeMetadata}
                />
              </div>
            )}
            <div>
              {this.state.currentStep == 4 &&
                !this.state.isResourceEdit &&
                this.state.resource && (
                  <button className="btn-save" type="submit">
                    {this.state.saveButtonText}
                  </button>
                )}
              {this.state.currentStep == 4 &&
                !this.state.isResourceEdit &&
                this.state.resource && (
                  <button
                    type="button"
                    className="btn-download"
                    onClick={this.downloadDatapackage}
                  >
                    Download Package
                  </button>
                )}
            </div>
          </div>
        </form>

        <div className="resource-edit-actions">
          {this.state.ui.success && this.state.currentStep == 2 && (
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


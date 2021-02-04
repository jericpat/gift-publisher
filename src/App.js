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
      },
      client: null,
      isResourceEdit: false,
      currentStep: 0,
      richTypeFilled: false,
      saveButtonText: "Save",
    };
    this.metadataHandler = this.metadataHandler.bind(this);
    this.handleRichTypeCount = this.handleRichTypeCount.bind(this);
  }

  metadataHandler(resource) {
    let dataset = this.mapResourceToDatapackageResource(resource);
    this.setState({
      dataset,
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
    resource["path"] = `data/${fileResource.name}`;
    resource["title"] = fileResource["name"].split(".")[0];

    if (Object.keys(dataset).includes("resources")) {
      dataset.resources.push(resource);
    } else {
      dataset["resources"] = [resource];
    }

    //Add sample and column before saving to resource state.
    // This is used in resource preview
    resource["sample"] = fileResource.sample;
    resource["columns"] = fileResource.columns;
    this.setState({
      resource,
    });

    return dataset;
  }

  //set state of rich type field. If all rich type fields have been filled,
  // then activate the next button in the Table Schema screen
  handleRichTypeCount(unfilledRichTypes) {
    if (unfilledRichTypes == 0) {
      this.setState({
        richTypeFilled: true,
      });
    }
  }

  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const dataset = { ...this.state.dataset };
    dataset[name] = value;

    this.setState({
      dataset,
    });
  };

  mapDatasetToFiscalFormat = (resource) => {
    resource.schema.fields.forEach((f) => {
      f.type = f.columnType;
      delete f.columnType; //os-types requires type to be of rich type and will not accept the property colunmType
    });
    let fdp = new TypeProcessor().fieldsToModel(resource["schema"]["fields"]);
    resource.schema.fields = Object.values(fdp.schema.fields);

    const dataset = { ...this.state.dataset };
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
    this.mapDatasetToFiscalFormat({ ...this.state.resource });
    fileDownload(JSON.stringify(this.state.dataset), "datapackage.json");
  };

  deleteResource = (resourceName) => {
    const { dataset } = { ...this.state };
    if (window.confirm("Are you sure to delete this resource?")) {
      const newResource = dataset.resources.filter(
        (resource) => resource.name != resourceName
      );
      dataset.resources = newResource;
      this.setState({
        dataset,
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
    };
    this.nextScreen();
    this.setState({ ui: newUiState });
  };

  onChangeResourceId = (resourceId) => {
    this.setState({ resourceId });
  };

  nextScreen = () => {
    let currentStep = this.state.currentStep;
    if (currentStep == 3) {
      //TODO: check if all rich type has been added
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
      url: `/api/dataset/${this.state.datasetId}`,
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
    const { success, loading } = this.state.ui;
    return (
      <div className="App">
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
                  Supported formats: csv, xlsx, xls
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
            {this.state.ui.success && this.state.currentStep == 2 && (
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
                  schema={this.state.resource.schema}
                  data={this.state.resource.sample || []}
                  handleRichType={this.handleRichTypeCount}
                />
              </>
            )}

            {this.state.currentStep == 4 && !this.state.savedDataset && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">Provide Metadata</h1>
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
              <button className="btn" onClick={this.handleSaveDataset}>
                {this.state.saveButtonText}
              </button>
            )}
          {this.state.currentStep == 4 &&
            !this.state.isResourceEdit &&
            this.state.resource && (
              <button className="btn" onClick={this.downloadDatapackage}>
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

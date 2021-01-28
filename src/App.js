import React from "react";
import axios from 'axios';
import TypeProcessor from "os-types/src/index";
import fileDownload from "js-file-download";
import PropTypes from "prop-types";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import { v4 as uuidv4 } from "uuid";
import Upload from "./components/Upload";
import TablePreview from "./components/TablePreview";
import TableSchema from "./components/TableSchema";

import Metadata from "./components/Metadata";
import "./App.css";
import { removeHyphen } from "../../utils";
import ReactLogo from "./progressBar.svg";

export class DatasetEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: this.props.config.dataset,
      resource: this.props.config.dataset.resources[0] || {},
      datasetId: this.props.config.dataset.id,
      ui: {
        fileOrLink: "",
        uploadComplete: false,
        success: false,
        error: false,
        loading: false,
      },
      client: null,
      isResourceEdit: false,
      currentStep: 1,
      richTypeFilled: false,
    };
    this.metadataHandler = this.metadataHandler.bind(this);
    this.handleRichTypeCount = this.handleRichTypeCount.bind(this);
  }

  async componentDidMount() {
    const { config } = this.props;
    const {
      authToken,
      api,
      lfsServerUrl,
      organizationId,
      datasetId,
      resourceId,
    } = config;
  }

  metadataHandler(resource) {
    let datapackage = this.mapResourceToDatapackageResource(resource);
    this.setState({
      resource: {
        ...resource,
        title: resource.name,
      },
      datapackage: datapackage,
    });
  }

  mapResourceToDatapackageResource(fileResource) {
    let datapackage = { ...this.state.dataset };
    let resource = {}

    resource["bytes"] = fileResource.size;
    resource["hash"] = fileResource.hash;
    resource["format"] = fileResource.format;
    resource["schema"] = fileResource.schema;
    resource["encoding"] = fileResource.encoding;
    resource["mediatype"] = fileResource.type;
    resource["name"] = fileResource.name;
    resource["dialect"] = fileResource.dialect;

    datapackage["resources"] = [resource];
    datapackage["title"] = fileResource.name;
    datapackage["name"] = fileResource.name;

    return datapackage;
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
    let resourceCopy = { ...this.state.resource };
    let datapackageCopy = { ...this.state.dataset };

    if (["format", "encoding"].includes(name)) {
      //changes shopuld be made to datapackage resource
      datapackageCopy.resources[0][name] = value;
    } else {
      datapackageCopy[name] = value;
    }
    resourceCopy[name] = value;

    this.setState({
      resource: resourceCopy,
      datapackage: datapackageCopy,
    });
  };

  handleSubmitMetadata = async () => {
    const { resource, client } = this.state;
    await this.createResource(resource);
    const isResourceCreate = true;
    if (isResourceCreate) {
      const datasetMetadata = await client.action("package_show", {
        id: this.state.datasetId,
      });
      let result = datasetMetadata.result;

      if (result.state === "draft") {
        result.state = "active";
        await client.action("package_update", result);
      }
    }

    // Redirect to dataset page
    return (window.location.href = `/dataset/${this.state.datasetId}`);
  };

  downloadDatapackage = async () => {
    let datapackage = { ...this.state.dataset };
    let resource = { ...datapackage.resources[0] };
    resource.schema.fields.forEach((f) => {
      f.type = f.columnType;
      delete f.columnType; //os-types requires type to be of rich type and will not accept the property colunmType
    });
    let fdp = new TypeProcessor().fieldsToModel(resource["schema"]["fields"]);
    resource.schema = fdp.schema;
    datapackage.model = fdp.model;
    datapackage.resources[0] = resource;

    this.setState({
      datapackage: datapackage,
    });

    fileDownload(JSON.stringify(datapackage), "datapackage.json");
  };

  createResource = async (resource) => {
    const { client } = this.state;
    const { config } = this.props;
    const { organizationId, datasetId, resourceId } = config;

    const ckanResource = frictionlessCkanMapper.resourceFrictionlessToCkan(
      resource
    );

    //create a valid format from sample
    let data = { ...ckanResource.sample };
    //delete sample because is an invalid format
    delete ckanResource.sample;
    //generate an unique id for bq_table_name property
    let bqTableName = removeHyphen(
      ckanResource.bq_table_name ? ckanResource.bq_table_name : uuidv4()
    );
    // create a copy from ckanResource to add package_id, name, url, sha256,size, lfs_prefix, url, url_type
    // without this properties ckan-blob-storage doesn't work properly
    let ckanResourceCopy = {
      ...ckanResource,
      package_id: this.state.datasetId,
      name: bqTableName,
      title: resource.title,
      sha256: resource.hash,
      size: resource.size,
      lfs_prefix: `${organizationId}/${datasetId}`,
      url: resource.name,
      url_type: "upload",
      bq_table_name: bqTableName,
      sample: data,
    };

    //Check if the user is editing resource, call resource_update and redirect to the dataset page
    if (resourceId) {
      ckanResourceCopy = {
        ...ckanResourceCopy,
        id: resourceId,
      };
      await client.action("resource_update", ckanResourceCopy);
      return (window.location.href = `/dataset/${datasetId}`);
    }
    await client
      .action("resource_create", ckanResourceCopy)
      .then((response) => {
        this.onChangeResourceId(response.result.id);
      });
  };

  deleteResource = async () => {
    const { resource, client, datasetId } = this.state;
    if (window.confirm("Are you sure to delete this resource?")) {
      await client.action("resource_delete", { id: resource.id });

      return (window.location.href = `/dataset/${datasetId}`);
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

    this.setState({ ui: newUiState });
  };

  onChangeResourceId = (resourceId) => {
    this.setState({ resourceId });
  };

  onSchemaSelected = async (resourceId) => {
    this.setLoading(true);
    const { sample, schema } = await this.getSchemaWithSample(resourceId);
    this.setLoading(false);

    this.setState({
      resource: Object.assign(this.state.resource, { schema, sample }),
    });
  };

  getSchemaWithSample = async (resourceId) => {
    const { client } = this.state;

    const resourceSchema = await client.action("resource_schema_show", {
      id: resourceId,
    });
    const resourceSample = await client.action("resource_sample_show", {
      id: resourceId,
    });

    const sample = [];

    const schema = resourceSchema.result || { fields: [] };

    try {
      // push the values to an array
      for (const property in resourceSample.result) {
        sample.push(resourceSample.result[property]);
      }
    } catch (e) {
      console.error(e);
      //generate empty values not to break the tableschema component
    }

    return { schema, sample };
  };

  setResource = async (resourceId) => {
    const { client } = this.state;

    const { result } = await client.action("resource_show", { id: resourceId });

    let resourceCopy = {
      ...result,
      ...(await this.getSchemaWithSample(resourceId)),
    };

    return this.setState({
      client,
      resourceId,
      resource: resourceCopy,
      isResourceEdit: true,
    });
  };

  nextScreen = () => {
    let currentStep = this.state.currentStep;
    if (currentStep == 2) {
      //TODO: check if all rich type has been added
    }
    let newStep = currentStep + 1;
    this.setState({ currentStep: newStep });
  };

  prevScreen = () => {
    let newStep = this.state.currentStep - 1;
    this.setState({ currentStep: newStep });
  };

  handleUpload = async () => {
    axios({
      method: 'post',
      url: `${this.props.config.metastoreApi+this.state.datasetId}`,
      data: {
        metadata: this.state.datapackage,
        description: this.state.datapackage.description
      }
    })
    .then(response => alert('Uploaded Sucessfully'), 
          error => alert('Error on upload dataset'));
  };

  render() {
    const { success, loading } = this.state.ui;
    console.log(this.state.dataset.name)
    return (
      <div className="App">
        <img src={ReactLogo} width="50%" className="Img" />
        <form
          className="upload-wrapper"
          onSubmit={(event) => {
            event.preventDefault();
            if (this.state.isResourceEdit) {
              return this.createResource(this.state.resource);
            }
            return this.handleSubmitMetadata();
          }}
        >
          {(!this.state.ui.success && this.state.currentStep==1)&& (
            <>
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
                onChangeResourceId={this.onChangeResourceId}
                organizationId={'gift-data'}
                authToken={this.props.config.authToken}
                lfsServerUrl={this.props.config.lfsServerUrl}
              />
            </>
            
          )}

          <div className="upload-edit-area">
            {this.state.ui.success && this.state.currentStep == 1 && (
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
            {this.state.resource.schema && this.state.currentStep == 2 && (
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

            {this.state.currentStep == 3 && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">Provide Metadata</h1>
                </div>
                <Metadata
                  metadata={this.state.resource}
                  handleChange={this.handleChangeMetadata}
                />
              </>
            )}
          </div>
        </form>
        <div className="resource-edit-actions">
          {this.state.currentStep == 3 &&
            !this.state.isResourceEdit &&
            this.state.ui.success && (
              <button className="btn" onClick={this.handleUpload}>
                Save
              </button>
            )}
          {this.state.currentStep == 3 &&
            !this.state.isResourceEdit &&
            this.state.resource && (
              <button className="btn" onClick={this.downloadDatapackage}>
                Download Package
              </button>
            )}

          {this.state.ui.success &&
            this.state.currentStep > 0 &&
            this.state.currentStep < 3 &&
            this.state.currentStep !== 2 && (
              <button className="btn" onClick={this.nextScreen}>
                Next
              </button>
            )}

          {this.state.currentStep == 2 ? (
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

          {
            (this.state.currentStep == 1 && Object.keys(this.state.resource).length !=0) 
            && 
            (
            <button className="btn" onClick={this.nextScreen}>
              Next
            </button>
          )  
          }
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
    metastoreApi: '/api/dataset/'
  },
};

DatasetEditor.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DatasetEditor;

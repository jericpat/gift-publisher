import React from "react";
import PropTypes from "prop-types";
import frictionlessCkanMapper from "frictionless-ckan-mapper-js";
import { v4 as uuidv4 } from "uuid";
import { TableSchema } from "datapub";
import Upload from "./components/Upload";
import CustomTable from "./components/tablePreview";
import Metadata from "./components/Metadata";
import "./App.css";
import { removeHyphen } from "./utils";
import ReactLogo from "./progressBar.svg";

export class ResourceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: this.props.config.datasetId,
      resourceId: "",
      resource: this.props.resource || {},
      ui: {
        fileOrLink: "",
        uploadComplete: undefined,
        success: false,
        error: false,
        loading: false,
      },
      client: null,
      isResourceEdit: false,
      currentStep: 1,
      datapackage: {
        name: "",
        title: "",
        profile: "",
        licenses: [],
        sources: [],
        resources: [
          {
            id: "",
            name: "",
            path: "",
            title: "",
            description: "",
            format: "",
            mediatype: "",
            encoding: "",
            bytes: 0,
            hash: "",
            schema: "",
            sources: "",
            licences: "",
          },
        ],
        revision: undefined,
        created: "",
        keywords: [],
        contributors: [],
      },
    };
    this.metadataHandler = this.metadataHandler.bind(this);
  }

  async componentDidMount() {
    const { config } = this.props;
    const {
      authToken,
      api,
      lfs,
      organizationId,
      datasetId,
      resourceId,
    } = config;

    // const client = new Client(
    //   `${authToken}`,
    //   `${organizationId}`,
    //   `${datasetId}`,
    //   `${api}`,
    //   `${lfs}`
    // );

    // // get dataset
    // const { result } = await client.action("package_show", {
    //   id: datasetId,
    // });

    // const resources = result.resources || [];

    // this.setState({ client, resources });

    // //Check if the user is editing resource
    // if (resourceId) {
    //   this.setResource(resourceId);
    // }
  }

  metadataHandler(resource) {
    let datapackage = this.mapResourceToDatapackageResource(resource);
    this.setState({
      resource: {
        ...resource,
        title: resource.name,
      },
      datapackage: datapackage
    });
  }

  mapResourceToDatapackageResource(fileResource) {
    let datapackage = { ...this.state.datapackage };
    let resource = { ...datapackage["resources"][0] };

    resource["bytes"] = fileResource.size;
    resource["hash"] = fileResource.hash;
    resource["format"] = fileResource.format;
    resource["schema"] = fileResource.schema;
    resource["encoding"] = fileResource.encoding;
    resource["mediatype"] = fileResource.type;
    resource["name"] = fileResource.name;

    datapackage["resources"][0] = resource;
    return datapackage;
  }

  handleChangeMetadata = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let resourceCopy = this.state.resource;
    resourceCopy[name] = value;

    this.setState({
      resource: resourceCopy,
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
    let newStep = this.state.currentStep + 1;
    this.setState({ currentStep: newStep });
  };

  prevScreen = () => {
    let newStep = this.state.currentStep - 1;
    this.setState({ currentStep: newStep });
  };

  handleUpload = () => {
    alert("Uploaded Successfully");
  };

  render() {
    const { success, loading } = this.state.ui;
    return (
      <div className="App">
        <img src={ReactLogo} width="50%" className="Img" />
        <form className="upload-wrapper">
          {this.state.currentStep == 1 && (
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
              />
            </>
          )}

          <div className="upload-edit-area">
            {this.state.resource.schema && this.state.currentStep == 2 && (
              <>
                <div className="upload-header">
                  <h1 className="upload-header__title_h1">
                    Preview of your dataset
                  </h1>
                </div>
                <CustomTable
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
                />
              </>
            )}

            {this.state.currentStep == 4 && (
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
          {this.state.currentStep == 1 ? (
            <button disabled={!success || loading} className="btn">
              Back
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-delete"
              onClick={this.prevScreen}
            >
              Back
            </button>
          )}
          {this.state.currentStep == 4 && !this.state.isResourceEdit && (
            <button className="btn" onClick={this.handleUpload}>
              Save and Publish
            </button>
          )}

          {this.state.currentStep == 4 ? (
            ""
          ) : (
            <button className="btn" onClick={this.nextScreen}>
              Next
            </button>
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
ResourceEditor.defaultProps = {
  config: {
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:5000",
    lfs: "http://localhost:5001", // Feel free to modify this
    organizationId: "myorg",
    datasetId: "data-test-2",
  },
};

ResourceEditor.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ResourceEditor;

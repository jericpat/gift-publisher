"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResourceEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("os-types/src/index"));

var _jsFileDownload = _interopRequireDefault(require("js-file-download"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frictionlessCkanMapperJs = _interopRequireDefault(require("frictionless-ckan-mapper-js"));

var _uuid = require("uuid");

var _Upload = _interopRequireDefault(require("../Upload"));

var _TablePreview = _interopRequireDefault(require("../TablePreview"));

var _TableSchema = _interopRequireDefault(require("../TableSchema"));

var _Metadata = _interopRequireDefault(require("../Metadata"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResourceEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(ResourceEditor, _React$Component);

  var _super = _createSuper(ResourceEditor);

  function ResourceEditor(props) {
    var _this;

    _classCallCheck(this, ResourceEditor);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChangeMetadata", function (event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;

      var resourceCopy = _objectSpread({}, _this.state.resource);

      var datapackageCopy = _objectSpread({}, _this.state.datapackage);

      if (["format", "encoding"].includes(name)) {
        //changes shopuld be made to datapackage resource
        datapackageCopy.resources[0][name] = value;
      } else {
        datapackageCopy[name] = value;
      }

      resourceCopy[name] = value;

      _this.setState({
        resource: resourceCopy,
        datapackage: datapackageCopy
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitMetadata", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$state, resource, client, isResourceCreate, datasetMetadata, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state = _this.state, resource = _this$state.resource, client = _this$state.client;
              _context.next = 3;
              return _this.createResource(resource);

            case 3:
              isResourceCreate = true;

              if (!isResourceCreate) {
                _context.next = 13;
                break;
              }

              _context.next = 7;
              return client.action("package_show", {
                id: _this.state.datasetId
              });

            case 7:
              datasetMetadata = _context.sent;
              result = datasetMetadata.result;

              if (!(result.state === "draft")) {
                _context.next = 13;
                break;
              }

              result.state = "active";
              _context.next = 13;
              return client.action("package_update", result);

            case 13:
              return _context.abrupt("return", window.location.href = "/dataset/".concat(_this.state.datasetId));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "downloadDatapackage", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var datapackage, resource, fdp;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              datapackage = _objectSpread({}, _this.state.datapackage);
              resource = _objectSpread({}, datapackage.resources[0]);
              resource.schema.fields.forEach(function (f) {
                f.type = f.columnType;
                delete f.columnType; //os-types requires type to be of rich type and will not accept the property colunmType
              });
              fdp = new _index.default().fieldsToModel(resource["schema"]["fields"]);
              resource.schema = fdp.schema;
              datapackage.model = fdp.model;
              datapackage.resources[0] = resource;

              _this.setState({
                datapackage: datapackage
              });

              (0, _jsFileDownload.default)(JSON.stringify(datapackage), "datapackage.json");

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "createResource", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resource) {
        var client, config, organizationId, datasetId, resourceId, ckanResource, data, bqTableName, ckanResourceCopy;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = _this.state.client;
                config = _this.props.config;
                organizationId = config.organizationId, datasetId = config.datasetId, resourceId = config.resourceId;
                ckanResource = _frictionlessCkanMapperJs.default.resourceFrictionlessToCkan(resource); //create a valid format from sample

                data = _objectSpread({}, ckanResource.sample); //delete sample because is an invalid format

                delete ckanResource.sample; //generate an unique id for bq_table_name property

                bqTableName = (0, _utils.removeHyphen)(ckanResource.bq_table_name ? ckanResource.bq_table_name : (0, _uuid.v4)()); // create a copy from ckanResource to add package_id, name, url, sha256,size, lfs_prefix, url, url_type
                // without this properties ckan-blob-storage doesn't work properly

                ckanResourceCopy = _objectSpread(_objectSpread({}, ckanResource), {}, {
                  package_id: _this.state.datasetId,
                  name: bqTableName,
                  title: resource.title,
                  sha256: resource.hash,
                  size: resource.size,
                  lfs_prefix: "".concat(organizationId, "/").concat(datasetId),
                  url: resource.name,
                  url_type: "upload",
                  bq_table_name: bqTableName,
                  sample: data
                }); //Check if the user is editing resource, call resource_update and redirect to the dataset page

                if (!resourceId) {
                  _context3.next = 13;
                  break;
                }

                ckanResourceCopy = _objectSpread(_objectSpread({}, ckanResourceCopy), {}, {
                  id: resourceId
                });
                _context3.next = 12;
                return client.action("resource_update", ckanResourceCopy);

              case 12:
                return _context3.abrupt("return", window.location.href = "/dataset/".concat(datasetId));

              case 13:
                _context3.next = 15;
                return client.action("resource_create", ckanResourceCopy).then(function (response) {
                  _this.onChangeResourceId(response.result.id);
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "deleteResource", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$state2, resource, client, datasetId;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$state2 = _this.state, resource = _this$state2.resource, client = _this$state2.client, datasetId = _this$state2.datasetId;

              if (!window.confirm("Are you sure to delete this resource?")) {
                _context4.next = 5;
                break;
              }

              _context4.next = 4;
              return client.action("resource_delete", {
                id: resource.id
              });

            case 4:
              return _context4.abrupt("return", window.location.href = "/dataset/".concat(datasetId));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(_assertThisInitialized(_this), "setLoading", function (isLoading) {
      _this.setState({
        ui: _objectSpread(_objectSpread({}, _this.state.ui), {}, {
          loading: isLoading
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleUploadStatus", function (status) {
      var ui = _this.state.ui;

      var newUiState = _objectSpread(_objectSpread({}, ui), {}, {
        success: status.success,
        error: status.error,
        loading: status.loading
      });

      _this.setState({
        ui: newUiState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeResourceId", function (resourceId) {
      _this.setState({
        resourceId: resourceId
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSchemaSelected", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resourceId) {
        var _yield$_this$getSchem, sample, schema;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.setLoading(true);

                _context5.next = 3;
                return _this.getSchemaWithSample(resourceId);

              case 3:
                _yield$_this$getSchem = _context5.sent;
                sample = _yield$_this$getSchem.sample;
                schema = _yield$_this$getSchem.schema;

                _this.setLoading(false);

                _this.setState({
                  resource: Object.assign(_this.state.resource, {
                    schema: schema,
                    sample: sample
                  })
                });

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "getSchemaWithSample", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resourceId) {
        var client, resourceSchema, resourceSample, sample, schema, property;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                client = _this.state.client;
                _context6.next = 3;
                return client.action("resource_schema_show", {
                  id: resourceId
                });

              case 3:
                resourceSchema = _context6.sent;
                _context6.next = 6;
                return client.action("resource_sample_show", {
                  id: resourceId
                });

              case 6:
                resourceSample = _context6.sent;
                sample = [];
                schema = resourceSchema.result || {
                  fields: []
                };

                try {
                  // push the values to an array
                  for (property in resourceSample.result) {
                    sample.push(resourceSample.result[property]);
                  }
                } catch (e) {
                  console.error(e); //generate empty values not to break the tableschema component
                }

                return _context6.abrupt("return", {
                  schema: schema,
                  sample: sample
                });

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x3) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "setResource", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resourceId) {
        var client, _yield$client$action, result, resourceCopy;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                client = _this.state.client;
                _context7.next = 3;
                return client.action("resource_show", {
                  id: resourceId
                });

              case 3:
                _yield$client$action = _context7.sent;
                result = _yield$client$action.result;
                _context7.t0 = _objectSpread;
                _context7.t1 = _objectSpread({}, result);
                _context7.next = 9;
                return _this.getSchemaWithSample(resourceId);

              case 9:
                _context7.t2 = _context7.sent;
                resourceCopy = (0, _context7.t0)(_context7.t1, _context7.t2);
                return _context7.abrupt("return", _this.setState({
                  client: client,
                  resourceId: resourceId,
                  resource: resourceCopy,
                  isResourceEdit: true
                }));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x4) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "nextScreen", function () {
      var currentStep = _this.state.currentStep;

      if (currentStep == 2) {//TODO: check if all rich type has been added
      }

      var newStep = currentStep + 1;

      _this.setState({
        currentStep: newStep
      });
    });

    _defineProperty(_assertThisInitialized(_this), "prevScreen", function () {
      var newStep = _this.state.currentStep - 1;

      _this.setState({
        currentStep: newStep
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              (0, _axios.default)({
                method: 'post',
                url: "/api/dataset/".concat(_this.state.datasetId),
                data: {
                  metadata: _this.state.datapackage,
                  description: _this.state.datapackage.description
                }
              }).then(function (response) {
                return alert('Uploaded Sucessfully');
              }, function (error) {
                return alert('Error on upload dataset');
              });

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));

    _this.state = {
      datasetId: _this.props.config.datasetId,
      resourceId: "",
      resource: _this.props.resource || {},
      ui: {
        fileOrLink: "",
        uploadComplete: false,
        success: false,
        error: false,
        loading: false
      },
      client: null,
      isResourceEdit: false,
      currentStep: 1,
      richTypeFilled: false,
      datapackage: {
        "@context": "http://schemas.frictionlessdata.io/fiscal-data-package.jsonld",
        author: "",
        bytes: undefined,
        description: "",
        model: {},
        name: "",
        profile: "data-package",
        revision: undefined,
        title: ""
      }
    };
    _this.metadataHandler = _this.metadataHandler.bind(_assertThisInitialized(_this));
    _this.handleRichTypeCount = _this.handleRichTypeCount.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResourceEditor, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var config, authToken, api, lfs, organizationId, datasetId, resourceId;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                config = this.props.config;
                authToken = config.authToken, api = config.api, lfs = config.lfs, organizationId = config.organizationId, datasetId = config.datasetId, resourceId = config.resourceId;

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "metadataHandler",
    value: function metadataHandler(resource) {
      var datapackage = this.mapResourceToDatapackageResource(resource);
      this.setState({
        resource: _objectSpread(_objectSpread({}, resource), {}, {
          title: resource.name
        }),
        datapackage: datapackage
      });
    }
  }, {
    key: "mapResourceToDatapackageResource",
    value: function mapResourceToDatapackageResource(fileResource) {
      var datapackage = _objectSpread({}, this.state.datapackage);

      var resource = {};
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
    } //set state of rich type field. If all rich type fields have been filled,
    // then activate the next button in the Table Schema screen

  }, {
    key: "handleRichTypeCount",
    value: function handleRichTypeCount(unfilledRichTypes) {
      if (unfilledRichTypes == 0) {
        this.setState({
          richTypeFilled: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state$ui = this.state.ui,
          success = _this$state$ui.success,
          loading = _this$state$ui.loading;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "App"
      }, /*#__PURE__*/_react.default.createElement("form", {
        className: "upload-wrapper",
        onSubmit: function onSubmit(event) {
          event.preventDefault();

          if (_this2.state.isResourceEdit) {
            return _this2.createResource(_this2.state.resource);
          }

          return _this2.handleSubmitMetadata();
        }
      }, !this.state.ui.success && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h1", {
        className: "upload-header__title_h1"
      }, "Provide your data file"), /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-header__title_h2"
      }, "Supported formats: csv, xlsx, xls")), /*#__PURE__*/_react.default.createElement(_Upload.default, {
        client: this.state.client,
        resource: this.state.resource,
        metadataHandler: this.metadataHandler,
        datasetId: this.state.datasetId,
        handleUploadStatus: this.handleUploadStatus,
        onChangeResourceId: this.onChangeResourceId,
        organizationId: this.props.config.organizationId,
        authToken: this.props.config.authToken,
        lfs: this.props.config.lfs
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-edit-area"
      }, this.state.ui.success && this.state.currentStep == 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h1", {
        className: "upload-header__title_h1"
      }, "Preview of your dataset")), /*#__PURE__*/_react.default.createElement(_TablePreview.default, {
        columns: this.state.resource.columns,
        data: this.state.resource.sample
      })), this.state.resource.schema && this.state.currentStep == 2 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h1", {
        className: "upload-header__title_h1"
      }, "Describe your dataset")), /*#__PURE__*/_react.default.createElement(_TableSchema.default, {
        schema: this.state.resource.schema,
        data: this.state.resource.sample || [],
        handleRichType: this.handleRichTypeCount
      })), this.state.currentStep == 3 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h1", {
        className: "upload-header__title_h1"
      }, "Provide Metadata")), /*#__PURE__*/_react.default.createElement(_Metadata.default, {
        metadata: this.state.resource,
        handleChange: this.handleChangeMetadata
      })))), /*#__PURE__*/_react.default.createElement("div", {
        className: "resource-edit-actions"
      }, this.state.currentStep == 3 && !this.state.isResourceEdit && this.state.ui.success && /*#__PURE__*/_react.default.createElement("button", {
        className: "btn",
        onClick: this.handleUpload
      }, "Save"), this.state.currentStep == 3 && !this.state.isResourceEdit && this.state.resource && /*#__PURE__*/_react.default.createElement("button", {
        className: "btn",
        onClick: this.downloadDatapackage
      }, "Download Package"), this.state.ui.success && this.state.currentStep > 0 && this.state.currentStep < 3 && this.state.currentStep !== 2 && /*#__PURE__*/_react.default.createElement("button", {
        className: "btn",
        onClick: this.nextScreen
      }, "Next"), this.state.currentStep == 2 ? this.state.richTypeFilled ? /*#__PURE__*/_react.default.createElement("button", {
        className: "btn",
        onClick: this.nextScreen
      }, "Next") : /*#__PURE__*/_react.default.createElement("button", {
        disabled: true,
        className: "btn"
      }, "Next") : ""));
    }
  }]);

  return ResourceEditor;
}(_react.default.Component);
/**
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */


exports.ResourceEditor = ResourceEditor;
ResourceEditor.defaultProps = {
  config: {
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:5000",
    lfs: "https://giftless-gift.herokuapp.com/",
    // Feel free to modify this
    organizationId: "gift-data",
    datasetId: "data-test-2"
  }
};
ResourceEditor.propTypes = {
  config: _propTypes.default.object.isRequired
};
var _default = ResourceEditor;
exports.default = _default;
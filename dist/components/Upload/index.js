"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _giftlessClient = require("giftless-client");

var data = _interopRequireWildcard(require("frictionless.js"));

var _ProgressBar = _interopRequireDefault(require("../ProgressBar"));

var _utils = require("../../utils");

var _datapubNocss = require("datapub-nocss");

var _streamToArray = _interopRequireDefault(require("stream-to-array"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var Upload = /*#__PURE__*/function (_React$Component) {
  _inherits(Upload, _React$Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this;

    _classCallCheck(this, Upload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChangeHandler", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var _this$state, formattedSize, selectedFile, path, _yield$_this$validFil, validFile, errorMsg, file, self, hash, sample_stream, sample_array, column_names, columns, sample;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, formattedSize = _this$state.formattedSize, selectedFile = _this$state.selectedFile;
                path = "";

                if (!(event.target.type == "file" && event.target.files.length > 0)) {
                  _context.next = 8;
                  break;
                }

                selectedFile = event.target.files[0];
                path = "data/".concat(selectedFile.name);

                _this.setState({
                  uploadedFileType: "file"
                });

                _context.next = 14;
                break;

              case 8:
                selectedFile = event.target.value;

                if ((0, _utils.isValidURL)(selectedFile)) {
                  _context.next = 12;
                  break;
                }

                _this.setErrorState("Invalid URL! Please ensure entered URL is correct");

                return _context.abrupt("return");

              case 12:
                _this.setState({
                  uploadedFileType: "url"
                });

                path = selectedFile;

              case 14:
                _context.next = 16;
                return _this.validFileSelected(selectedFile, event.target.type);

              case 16:
                _yield$_this$validFil = _context.sent;
                validFile = _yield$_this$validFil.validFile;
                errorMsg = _yield$_this$validFil.errorMsg;
                file = _yield$_this$validFil.file;

                if (validFile) {
                  _context.next = 23;
                  break;
                }

                _this.setErrorState(errorMsg);

                return _context.abrupt("return");

              case 23:
                formattedSize = (0, _utils.onFormatBytes)(file.size);
                self = _assertThisInitialized(_this);
                _context.next = 27;
                return file.hash("sha256", function (progress) {
                  self.onHashProgress(progress);
                });

              case 27:
                hash = _context.sent;
                Object.assign(file.descriptor, {
                  hash: hash
                }); //check if file has the same schema

                if (_this.hasSameSchema(file._descriptor)) {
                  _context.next = 32;
                  break;
                }

                _this.setErrorState("Schema of uploaded resource does not match existing one!");

                return _context.abrupt("return");

              case 32:
                if (!_this.hasSameHash(file._descriptor)) {
                  _context.next = 35;
                  break;
                }

                _this.setErrorState("Possible duplicate, the resource already exists!");

                return _context.abrupt("return");

              case 35:
                _context.next = 37;
                return file.rows({
                  size: 460
                });

              case 37:
                sample_stream = _context.sent;
                _context.next = 40;
                return (0, _streamToArray.default)(sample_stream);

              case 40:
                sample_array = _context.sent;
                //get column names for table
                column_names = sample_array[0]; //first row is the column names

                columns = column_names.map(function (item) {
                  return {
                    Header: item,
                    accessor: item
                  };
                }); //prepare sample for use in table preview component

                sample = [];
                sample_array.slice(1, 11).forEach(function (item) {
                  var temp_obj = {};
                  item.forEach(function (field, i) {
                    temp_obj[column_names[i]] = field;
                  });
                  sample.push(temp_obj);
                });

                _this.props.metadataHandler(Object.assign(file.descriptor, {
                  sample: sample,
                  columns: columns,
                  path: path
                }));

                _this.setState({
                  selectedFile: selectedFile,
                  loaded: 0,
                  success: false,
                  fileExists: false,
                  error: false,
                  formattedSize: formattedSize
                });

                _context.next = 49;
                return _this.onClickHandler();

              case 49:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "validFileSelected", function (selectedFile, fileType) {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          var fileExt, _fileExt, file;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(fileType == "url")) {
                    _context3.next = 8;
                    break;
                  }

                  fileExt = selectedFile.split(".").pop();

                  if (!(fileExt != "csv")) {
                    _context3.next = 5;
                    break;
                  }

                  resolve({
                    validFile: false,
                    errorMsg: "File Type not supported! Please upload a CSV file",
                    file: undefined
                  });
                  return _context3.abrupt("return");

                case 5:
                  fetch(selectedFile).then( /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resp) {
                      var file;
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.prev = 0;
                              file = data.open(selectedFile);
                              _context2.next = 4;
                              return file.addSchema();

                            case 4:
                              resolve({
                                validFile: true,
                                errorMsg: "",
                                file: file
                              });
                              _context2.next = 11;
                              break;

                            case 7:
                              _context2.prev = 7;
                              _context2.t0 = _context2["catch"](0);
                              console.log(_context2.t0);
                              resolve({
                                validFile: false,
                                errorMsg: "An error occured when trying to load the file!",
                                file: file
                              });

                            case 11:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, null, [[0, 7]]);
                    }));

                    return function (_x4) {
                      return _ref3.apply(this, arguments);
                    };
                  }()).catch(function (error) {
                    console.log(error);
                    resolve({
                      validFile: false,
                      errorMsg: "An error occured when trying to load the file!"
                    });
                  });
                  _context3.next = 26;
                  break;

                case 8:
                  _fileExt = selectedFile.type.split("/").pop();

                  if (!(_fileExt != "csv")) {
                    _context3.next = 12;
                    break;
                  }

                  resolve({
                    validFile: false,
                    errorMsg: "File Type not supported! Please upload a CSV file",
                    file: {}
                  });
                  return _context3.abrupt("return");

                case 12:
                  if (!(selectedFile.size == 0)) {
                    _context3.next = 15;
                    break;
                  }

                  resolve({
                    validFile: false,
                    errorMsg: "CSV file is empty! Please upload a CSV file with contents",
                    file: {}
                  });
                  return _context3.abrupt("return");

                case 15:
                  _context3.prev = 15;
                  file = data.open(selectedFile);
                  _context3.next = 19;
                  return file.addSchema();

                case 19:
                  resolve({
                    validFile: true,
                    errorMsg: "",
                    file: file
                  });
                  _context3.next = 26;
                  break;

                case 22:
                  _context3.prev = 22;
                  _context3.t0 = _context3["catch"](15);
                  console.log(_context3.t0);
                  resolve({
                    validFile: false,
                    errorMsg: "An error occured when trying to load the file!",
                    file: {}
                  });

                case 26:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[15, 22]]);
        }));

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    });

    _defineProperty(_assertThisInitialized(_this), "onHashProgress", function (progress) {
      if (progress == 100) {
        _this.setState({
          hashInProgress: false
        });
      } else {
        _this.setState({
          hashLoaded: progress,
          hashInProgress: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onUploadProgress", function (progressEvent) {
      var loaded = Number((progressEvent.loaded / progressEvent.total * 100).toFixed());

      _this.onTimeRemaining(progressEvent.loaded);

      _this.setState({
        loaded: loaded,
        uploadInProgress: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeRemaining", function (progressLoaded) {
      var end = new Date().getTime();
      var duration = (end - _this.state.start) / 1000;
      var bps = progressLoaded / duration;
      var kbps = bps / 1024;
      var timeRemaining = (_this.state.fileSize - progressLoaded) / kbps;

      _this.setState({
        timeRemaining: timeRemaining / 1000
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hasSameSchema", function (resource) {
      if (Object.keys(_this.state.dataset).includes("resources") && _this.state.dataset.resources.length > 0) {
        var newFields = resource.schema.fields.map(function (field) {
          return field.name;
        });

        var oldFields = _this.state.dataset.resources[0].schema.fields.map(function (field) {
          return field.name;
        });

        return JSON.stringify(newFields) === JSON.stringify(oldFields);
      } else {
        return true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$state2, selectedFile, uploadedFileType, start, _this$props, organizationId, lfsServerUrl, client, resource;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$state2 = _this.state, selectedFile = _this$state2.selectedFile, uploadedFileType = _this$state2.uploadedFileType;

              if (uploadedFileType == "url") {
                _this.setState({
                  success: true,
                  loading: false,
                  loaded: 100
                });

                _this.props.handleUploadStatus({
                  loading: false,
                  success: true
                });
              } else {
                start = new Date().getTime();
                _this$props = _this.props, organizationId = _this$props.organizationId, lfsServerUrl = _this$props.lfsServerUrl;
                client = new _giftlessClient.Client(lfsServerUrl);
                resource = data.open(selectedFile);

                _this.setState({
                  fileSize: resource.size,
                  start: start,
                  loading: true
                });

                _this.props.handleUploadStatus({
                  loading: true,
                  error: false,
                  success: false
                });

                client.upload(resource, organizationId, _this.state.datasetId, _this.onUploadProgress).then(function (response) {
                  _this.setState({
                    success: true,
                    loading: false,
                    fileExists: !response,
                    loaded: 100
                  });

                  _this.props.handleUploadStatus({
                    loading: false,
                    success: true
                  });
                }).catch(function (error) {
                  console.error("Upload failed with error: " + error);

                  _this.setState({
                    error: true,
                    loading: false
                  });

                  _this.props.handleUploadStatus({
                    loading: false,
                    success: false,
                    error: true,
                    errorMsg: "Upload failed with error: ".concat(error.message)
                  });
                });
              }

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _this.state = {
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
      uploadedFileType: null
    };
    return _this;
  }

  _createClass(Upload, [{
    key: "setErrorState",
    value: function setErrorState(errorMsg) {
      this.setState({
        error: true,
        loading: false
      });
      this.props.handleUploadStatus({
        loading: false,
        success: false,
        error: true,
        errorMsg: errorMsg
      });
    }
  }, {
    key: "hasSameHash",
    value: function hasSameHash(newResource) {
      if (Object.keys(this.state.dataset).includes("resources") && this.state.dataset.resources.length > 0) {
        var resources = this.state.dataset.resources;
        var sameHashes = resources.map(function (resource) {
          return resource.hash == newResource.hash;
        });
        return sameHashes.includes(true);
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          success = _this$state3.success,
          fileExists = _this$state3.fileExists,
          error = _this$state3.error,
          timeRemaining = _this$state3.timeRemaining,
          selectedFile = _this$state3.selectedFile,
          formattedSize = _this$state3.formattedSize,
          hashInProgress = _this$state3.hashInProgress,
          uploadInProgress = _this$state3.uploadInProgress;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_datapubNocss.Choose, {
        onChangeHandler: this.onChangeHandler,
        onChangeUrl: this.onChangeHandler
      }), hashInProgress && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, "Computing file hash...")), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
        progress: Math.round(this.state.hashLoaded),
        size: 100,
        strokeWidth: 5,
        circleOneStroke: "#d9edfe",
        circleTwoStroke: "#7ea9e1"
      }))), uploadInProgress && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, "Uploading ", selectedFile.name, "..."), /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, "Size: ", formattedSize)), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
        progress: this.state.loaded,
        size: 100,
        strokeWidth: 5,
        circleOneStroke: "#d9edfe",
        circleTwoStroke: "#7ea9e1" // timeRemaining={timeRemaining}

      }), /*#__PURE__*/_react.default.createElement("h2", null, success && !fileExists && !error && "File uploaded successfully", fileExists && "File uploaded successfully", error && "Upload failed"))));
    }
  }]);

  return Upload;
}(_react.default.Component);

var _default = Upload;
exports.default = _default;
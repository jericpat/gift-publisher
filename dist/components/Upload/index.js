"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var data = _interopRequireWildcard(require("frictionless.js"));

var _ProgressBar = _interopRequireDefault(require("../ProgressBar"));

var _utils = require("../../utils");

var _datapub = require("datapub");

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
        var _this$state, formattedSize, selectedFile, file, self, hash, sample_stream, sample_array, column_names, columns, sample;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, formattedSize = _this$state.formattedSize, selectedFile = _this$state.selectedFile;

                if (!(event.target.files.length > 0)) {
                  _context.next = 28;
                  break;
                }

                selectedFile = event.target.files[0];
                file = data.open(selectedFile);
                _context.prev = 4;
                _context.next = 7;
                return file.addSchema();

              case 7:
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](4);
                console.warn(_context.t0);

              case 12:
                formattedSize = (0, _utils.onFormatBytes)(file.size);
                self = _assertThisInitialized(_this);
                _context.next = 16;
                return file.hash("sha256", function (progress) {
                  self.onHashProgress(progress);
                });

              case 16:
                hash = _context.sent;
                _context.next = 19;
                return file.rows({
                  size: 460
                });

              case 19:
                sample_stream = _context.sent;
                _context.next = 22;
                return (0, _streamToArray.default)(sample_stream);

              case 22:
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
                sample_array.slice(1, 5).forEach(function (item) {
                  var temp_obj = {};
                  item.forEach(function (field, i) {
                    temp_obj[column_names[i]] = field;
                  });
                  sample.push(temp_obj);
                });

                _this.props.metadataHandler(Object.assign(file.descriptor, {
                  hash: hash,
                  sample: sample,
                  columns: columns
                }));

              case 28:
                _this.setState({
                  selectedFile: selectedFile,
                  loaded: 0,
                  success: false,
                  fileExists: false,
                  error: false,
                  formattedSize: formattedSize
                });

                _context.next = 31;
                return _this.onClickHandler();

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onHashProgress", function (progress) {
      if (progress === 100) {
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
      _this.onTimeRemaining(progressEvent.loaded);

      _this.setState({
        loaded: progressEvent.loaded / progressEvent.total * 100
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

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var start, selectedFile, client, resource;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              start = new Date().getTime();
              selectedFile = _this.state.selectedFile;
              client = _this.props.client;
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
              }); // Use client to upload file to the storage and track the progress
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


              _this.props.handleUploadStatus({
                loading: false,
                success: true
              }); // })
              // .catch((error) => {
              //   console.error("Upload failed with error: " + error);
              //   this.setState({ error: true, loading: false });
              //   this.props.handleUploadStatus({
              //     loading: false,
              //     success: false,
              //     error: true,
              //   });
              // });


            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
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
    return _this;
  }

  _createClass(Upload, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          success = _this$state2.success,
          fileExists = _this$state2.fileExists,
          error = _this$state2.error,
          timeRemaining = _this$state2.timeRemaining,
          selectedFile = _this$state2.selectedFile,
          formattedSize = _this$state2.formattedSize,
          hashInProgress = _this$state2.hashInProgress;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-area"
      }, /*#__PURE__*/_react.default.createElement(_datapub.Choose, {
        onChangeHandler: this.onChangeHandler,
        onChangeUrl: function onChangeUrl(event) {
          return console.log("Get url:", event.target.value);
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-area__info"
      }, hashInProgress && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("ul", {
        className: "upload-list"
      }, /*#__PURE__*/_react.default.createElement("li", {
        className: "list-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-list-item"
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, "Computing file hash...")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
        progress: Math.round(this.state.hashLoaded),
        size: 100,
        strokeWidth: 5,
        circleOneStroke: "#d9edfe",
        circleTwoStroke: "#7ea9e1"
      }))))))), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-area__info"
      }, selectedFile && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("ul", {
        className: "upload-list"
      }, /*#__PURE__*/_react.default.createElement("li", {
        className: "list-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-list-item"
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, "Uploading ", selectedFile.name), /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-size"
      }, formattedSize)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
        progress: Math.round(this.state.loaded),
        size: 100,
        strokeWidth: 5,
        circleOneStroke: "#d9edfe",
        circleTwoStroke: "#7ea9e1",
        timeRemaining: timeRemaining
      }))))), /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-message"
      }, success && !fileExists && !error && "File uploaded successfully", fileExists && "File uploaded successfully", error && "Upload failed"))));
    }
  }]);

  return Upload;
}(_react.default.Component);

var _default = Upload;
exports.default = _default;
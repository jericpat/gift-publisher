"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _datapubNocss = require("datapub-nocss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metadata = function Metadata(_ref) {
  var dataset = _ref.dataset,
      handleChange = _ref.handleChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "title"
  }, "Title"), /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "title",
    id: "title",
    value: dataset.title,
    onChange: function onChange(e) {
      handleChange(e);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "encoding"
  }, "Encoding"), /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "encoding",
    id: "encoding",
    value: dataset.encoding || "",
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "utf_8"
  }, "UTF-8"), _datapubNocss.encodeData.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: "format-".concat(item.value),
      value: item.value
    }, item.label);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "format"
  }, "Format"), /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "format",
    id: "format"
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "csv"
  }, "CSV"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "description"
  }, "Description"), /*#__PURE__*/_react.default.createElement("textarea", {
    className: "metadata-input__textarea",
    type: "text",
    name: "description",
    id: "description",
    value: dataset.description || "",
    onChange: function onChange(e) {
      handleChange(e);
    },
    rows: 4
  }))));
};

Metadata.propTypes = {
  dataset: _propTypes.default.object.isRequired,
  handleChange: _propTypes.default.func.isRequired
};
var _default = Metadata;
exports.default = _default;
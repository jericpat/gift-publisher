"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ResourceList = function ResourceList(_ref) {
  var dataset = _ref.dataset,
      deleteResource = _ref.deleteResource,
      addResourceScreen = _ref.addResourceScreen;
  var hasResources = Object.keys(dataset).includes("resources");

  if (!hasResources) {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "No Resource Available")), /*#__PURE__*/_react.default.createElement("div", {
      className: "resource-edit-actions"
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: "btn",
      onClick: function onClick() {
        addResourceScreen();
      }
    }, "Add Resource")));
  }

  var resources = _toConsumableArray(dataset.resources);

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "justify-center"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Available resources in the dataset"), /*#__PURE__*/_react.default.createElement("table", {
    className: "min-w-full divide-y divide-gray-200"
  }, /*#__PURE__*/_react.default.createElement("tbody", {
    className: "bg-white divide-y divide-gray-200"
  }, resources.map(function (resource, i) {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: "".concat(i, "-index")
    }, /*#__PURE__*/_react.default.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "ml-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "text-sm font-medium text-gray-900"
    }, resource.title || resource.name)))), /*#__PURE__*/_react.default.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "ml-4"
    }, /*#__PURE__*/_react.default.createElement("button", {
      id: "rmBtn".concat(i),
      type: "button",
      className: "btn-delete",
      onClick: function onClick() {
        deleteResource(resource.hash);
      }
    }, "Remove")))));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "resource-edit-actions"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      addResourceScreen();
    }
  }, "Add Resource")))));
};

ResourceList.propTypes = {
  dataset: _propTypes.default.object.isRequired,
  deleteResource: _propTypes.default.func.isRequired,
  addResourceScreen: _propTypes.default.func.isRequired
};
var _default = ResourceList;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _datapubNocss = require("datapub-nocss");

var _countries = _interopRequireDefault(require("../../db/countries.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Tags from '@yaireo/tagify/dist/react.tagify'
// import "@yaireo/tagify/dist/tagify.css"
var Metadata = function Metadata(_ref) {
  var dataset = _ref.dataset,
      handleChange = _ref.handleChange;
  var tagifySettings = {
    whitelist: ["Finance", "Tabular", "Economics", "Trade", "Fiscal"],
    maxTags: 6,
    backspace: "edit",
    addTagOnBlur: false,
    dropdown: {
      enabled: 0
    }
  };

  var handleTagChange = function handleTagChange(values) {
    values = JSON.parse(values);
    values = values.map(function (value) {
      return Object.values(value)[0];
    });
    var customEvent = {
      target: {
        value: values,
        name: "tags"
      }
    };
    handleChange(customEvent);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h2", null, "Mandatory fields are marked with an asterisks(", /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), ")"), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "title",
    id: "title",
    value: dataset.title,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "title"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), "Title of the dataset")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "metadata-input__textarea",
    type: "text",
    name: "description",
    id: "description",
    value: dataset.description || "",
    onChange: function onChange(e) {
      handleChange(e);
    },
    rows: 5
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "description"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), "Description of the dataset")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "continent",
    id: "continent",
    value: dataset.continent || "",
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Europe"
  }, "Europe"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Africa"
  }, "Africa"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Asia"
  }, "Asia"), /*#__PURE__*/_react.default.createElement("option", {
    value: "North America"
  }, "North America"), /*#__PURE__*/_react.default.createElement("option", {
    value: "South America"
  }, "South America"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Australia"
  }, "Australia")), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "continent"
  }, "Continent")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "country",
    id: "country",
    value: dataset.country || "",
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select"), _countries.default.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: "format-".concat(item.text),
      value: item.text
    }, item.text);
  })), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "encoding"
  }, "Country"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement(Tags, {
    mode: "textarea",
    className: "tags",
    name: "tags",
    settings: tagifySettings,
    value: "tags" in dataset ? dataset.tags.toString() : "",
    onChange: function onChange(e) {
      return e.persist(), handleTagChange(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "tags"
  }, "Tags"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "region",
    id: "region",
    value: dataset.region,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "region"
  }, "Region")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "author_website",
    id: "author_website",
    value: dataset.author_website,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "author_website"
  }, "Author's Website"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "city",
    id: "city",
    value: dataset.city,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "city"
  }, "City")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "author_email",
    id: "author_email",
    value: dataset.author_email,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "author_email"
  }, "Author's Email Address"))), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, /*#__PURE__*/_react.default.createElement("b", null, "Fiscal Period")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "date",
    name: "start_date",
    id: "start_date",
    value: dataset.start_date,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "start_date"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), "Starting date (month-day-year)")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "date",
    name: "end_date",
    id: "end_date",
    value: dataset.end_date,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "end_date"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), "Ending date (month-day-year)"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, /*#__PURE__*/_react.default.createElement("b", null, "Encoding and file format")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
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
  })), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "encoding"
  }, "File encoding: If you're unsure about this setting, please use UTF-8")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "format",
    id: "format"
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "csv"
  }, "CSV"))), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "format"
  }, "File format"))));
};

Metadata.propTypes = {
  dataset: _propTypes.default.object.isRequired,
  handleChange: _propTypes.default.func.isRequired
};
var _default = Metadata;
exports.default = _default;
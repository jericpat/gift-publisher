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

var Metadata = function Metadata(_ref) {
  var dataset = _ref.dataset,
      handleChange = _ref.handleChange;

  var isCheck = function isCheck(val, field) {
    return dataset[field] && dataset[field].includes(val);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h3", {
    className: "metadata-section-title"
  }, "Mandatory fields are marked with an asterisk (", /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), ")."), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "General")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "title",
    id: "title",
    placeholder: "example_file.csv",
    value: dataset.title,
    required: true,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "title"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Title of the dataset")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "metadata-input__textarea",
    type: "text",
    name: "description",
    id: "description",
    placeholder: "Enter a description for your dataset",
    value: dataset.description || '',
    onChange: function onChange(e) {
      handleChange(e);
    },
    rows: 5,
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "description"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Description of the dataset")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "url",
    name: "image",
    id: "image",
    placeholder: "https://mylogo.png",
    value: dataset.image,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "title"
  }, "Logo Url")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "metadata-input__textarea",
    type: "text",
    name: "tags",
    id: "tags",
    required: true,
    placeholder: "Finance, Budget",
    value: dataset.tags || '',
    onChange: function onChange(e) {
      handleChange(e);
    },
    rows: 2
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "tooltiptext"
  }, "Only letters are allowed: tags are single words separated by a comma"), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "tags"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), "Tags"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form-grp3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "govt_level",
    id: "govt_level",
    value: dataset.govt_level || '',
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Municipal"
  }, "Municipal"), /*#__PURE__*/_react.default.createElement("option", {
    value: "National"
  }, "National"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Provincial"
  }, "Provincial"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Regional"
  }, "Regional"), /*#__PURE__*/_react.default.createElement("option", {
    value: "State-level"
  }, "State-level")), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "govt_level"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Level of government")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck("State own enterprises", "disaggregation"),
    id: "dgg_state",
    name: "disaggregation",
    value: "State own enterprises",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "dgg_state"
  }, " State own enterprises")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Public investments', 'disaggregation'),
    id: "dgg_pub_inv",
    name: "disaggregation",
    value: "Public investments",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "dgg_pub_inv"
  }, " Public investments")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Public programs', 'disaggregation'),
    id: "dgg_pub_prog",
    name: "disaggregation",
    value: "Public programs",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "dgg_pub_prog"
  }, " Public programs")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Line item', 'disaggregation'),
    id: "dgg_line",
    name: "disaggregation",
    value: "Line item",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "dgg_line"
  }, " Line item")), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label-checkbox"
  }, "Disaggregation")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Quarterly reports', 'budget_stage'),
    id: "budget_qt",
    name: "budget_stage",
    value: "Quarterly reports",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "budget_qt"
  }, " Quarterly reports")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Year-end', 'budget_stage'),
    id: "budget_yr",
    name: "budget_stage",
    value: "Year-end",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "budget_yr"
  }, " Year-end")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Proposed', 'budget_stage'),
    id: "budget_prop",
    name: "budget_stage",
    value: "Proposed",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "budget_prop"
  }, " Proposed")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input__input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: isCheck('Enacted', 'budget_stage'),
    id: "budget_st",
    name: "budget_stage",
    value: "Enacted",
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "budget_st"
  }, " Enacted")), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label-checkbox"
  }, "Budget Stage"))), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Owner")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "url",
    name: "author_website",
    id: "author_website",
    value: dataset.author_website,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "author_website"
  }, "Author's website")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "email",
    name: "author_email",
    id: "author_email",
    value: dataset.author_email,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "author_email"
  }, "Author's email address"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "pub_institutional_name",
    id: "pub_institutional_name",
    value: dataset.pub_institutional_name,
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "pub_institutional_name"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Publisher's institutional name")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Location")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "continent",
    id: "continent",
    value: dataset.continent || '',
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
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Continent")), /*#__PURE__*/_react.default.createElement("div", {
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
  }, "Region"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "country",
    id: "country",
    value: dataset.country || '',
    onChange: function onChange(e) {
      handleChange(e);
    }
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
  }, "Country")), /*#__PURE__*/_react.default.createElement("div", {
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
  }, "City"))), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Time")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "periodicity",
    id: "periodicity",
    value: dataset.periodicity || '',
    onChange: function onChange(e) {
      handleChange(e);
    },
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Yearly"
  }, "Yearly"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Biannual"
  }, "Biannual"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Quarterly"
  }, "Quarterly"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Monthly"
  }, "Monthly"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Daily"
  }, "Daily")), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "periodicity"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Periodicity")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    className: "metadata-input__textarea",
    type: "text",
    name: "years_included",
    id: "years_included",
    placeholder: "2015, 2016, 2017, 2005",
    value: dataset.years_included || '',
    onChange: function onChange(e) {
      handleChange(e);
    },
    rows: 1
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "years_included"
  }, ' ', "Years included"))), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Fiscal Period")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "date",
    name: "start_date",
    id: "start_date",
    value: dataset.start_date,
    required: true,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "start_date"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Starting date (month/day/year)")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "date",
    name: "end_date",
    id: "end_date",
    value: dataset.end_date,
    required: true,
    onChange: function onChange(e) {
      handleChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "end_date"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " Ending date (month/day/year)"))), /*#__PURE__*/_react.default.createElement("h1", {
    className: "metadata-section-title"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Encoding and file format")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-form"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "encoding",
    id: "encoding",
    value: dataset.encoding || '',
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
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ast-important"
  }, "*"), " File encoding: If you are unsure about this setting, please use UTF-8")), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "format",
    id: "format"
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "csv"
  }, "CSV")), /*#__PURE__*/_react.default.createElement("label", {
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
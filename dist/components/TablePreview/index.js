"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTable = require("react-table");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TablePreview = function TablePreview(_ref) {
  var columns = _ref.columns,
      data = _ref.data;

  var _useTable = (0, _reactTable.useTable)({
    columns: columns,
    data: data.slice(0, 5)
  }),
      getTableProps = _useTable.getTableProps,
      headerGroups = _useTable.headerGroups,
      rows = _useTable.rows,
      prepareRow = _useTable.prepareRow;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/_react.default.createElement(_Table.default, getTableProps(), /*#__PURE__*/_react.default.createElement(_TableHead.default, null, headerGroups.map(function (headerGroup) {
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, headerGroup.getHeaderGroupProps(), headerGroup.headers.map(function (column) {
      return /*#__PURE__*/_react.default.createElement(_TableCell.default, column.getHeaderProps(), column.render("Header"));
    }));
  })), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, rows.map(function (row, i) {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, row.getRowProps(), row.cells.map(function (cell) {
      return /*#__PURE__*/_react.default.createElement(_TableCell.default, cell.getCellProps(), cell.render("Cell"));
    }));
  }))));
};

var _default = TablePreview;
exports.default = _default;
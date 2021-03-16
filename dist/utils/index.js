"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidURL = exports.onFormatBytes = exports.removeHyphen = void 0;

var onFormatBytes = function onFormatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (bytes === 0) return "0 Bytes";
  var k = 1000;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.onFormatBytes = onFormatBytes;

var removeHyphen = function removeHyphen(id) {
  return id.replace(/-/g, "");
};

exports.removeHyphen = removeHyphen;

var isValidURL = function isValidURL(val) {
  var res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res !== null;
};

exports.isValidURL = isValidURL;
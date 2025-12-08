"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common.js");

var renderSpinner = function renderSpinner(wichSpinner) {
  var spinnerEl = wichSpinner === 'search' ? _common.spinnerSearchEl : _common.spinnerJobDetailsEl;
  spinnerEl.classList.toggle('hidden');
};

var _default = renderSpinner;
exports["default"] = _default;
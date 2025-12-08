"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common.js");

var renderError = function renderError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'something went wrong!';
  _common.errorTextEl.textContent = message;

  _common.errorEl.classList.remove('hidden');

  requestAnimationFrame(function () {
    _common.errorEl.classList.add('error__visible');

    _common.errorEl.classList.remove('opacity-0', '-translate-y-30');
  });
  setTimeout(function () {
    _common.errorEl.classList.add('opacity-0', '-translate-y-30');

    _common.errorEl.classList.remove('error--visible');

    setTimeout(function () {
      _common.errorEl.classList.add('hidden');
    }, 300);
  }, _common.DEFAULT_DISPLAY_TIME);
  return;
};

var _default = renderError;
exports["default"] = _default;
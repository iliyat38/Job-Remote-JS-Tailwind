"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common.js");

var _jobList = _interopRequireDefault(require("./jobList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderPagingBtn = function renderPagingBtn() {
  if (_common.state.currentPage >= 2) {
    _common.paginationBtnBackEl.classList.remove('invisible');
  } else {
    _common.paginationBtnBackEl.classList.add('invisible');
  }

  if (_common.state.searchJobItems.length - _common.state.currentPage * _common.ITEM_SIZE_PER_PAGE <= 0) {
    _common.paginationBtnNextEl.classList.add('invisible');
  } else {
    _common.paginationBtnNextEl.classList.remove('invisible');
  }

  _common.paginationNumberNextEl.textContent = _common.state.currentPage + 1;
  _common.paginationNumberBackEl.textContent = _common.state.currentPage - 1;

  _common.paginationBtnBackEl.blur();

  _common.paginationBtnNextEl.blur();
};

var pagingHandler = function pagingHandler(e) {
  var clickedPage = e.target.closest('.pagination__button');
  if (!clickedPage) return;
  var nextPage = clickedPage.className.includes('--next') ? true : false;
  nextPage ? _common.state.currentPage++ : _common.state.currentPage--;
  (0, _jobList["default"])();
  renderPagingBtn();
};

_common.paginationEl.addEventListener('click', pagingHandler);

var _default = renderPagingBtn;
exports["default"] = _default;
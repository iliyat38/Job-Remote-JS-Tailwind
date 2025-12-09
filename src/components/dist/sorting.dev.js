"use strict";

var _common = require("../common.js");

var _jobList = _interopRequireDefault(require("./jobList.js"));

var _Pagination = _interopRequireDefault(require("./Pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clickHandler = function clickHandler(e) {
  var clickedBtnEl = e.target.closest('.sorting__button');
  if (!clickedBtnEl) return;
  _common.state.currentPage = 1;
  (0, _Pagination["default"])();
  var recent = clickedBtnEl.className.includes('--recent') ? true : false;

  if (_common.jobListSearchEl.childElementCount > 0) {
    if (recent) {
      _common.state.searchJobItems.sort(function (a, b) {
        return a.daysAgo - b.daysAgo;
      });

      _common.sortingBtnRelevantEl.classList.remove('sorting__button--active');

      _common.sortingBtnRecentEl.classList.add('sorting__button--active');
    } else {
      _common.state.searchJobItems.sort(function (a, b) {
        return b.relevanceScore - a.relevanceScore;
      });

      _common.sortingBtnRecentEl.classList.remove('sorting__button--active');

      _common.sortingBtnRelevantEl.classList.add('sorting__button--active');
    }
  }

  (0, _jobList["default"])();
};

_common.sortingEl.addEventListener('click', clickHandler);
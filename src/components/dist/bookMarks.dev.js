"use strict";

var _common = require("../common.js");

var _jobList = _interopRequireDefault(require("./jobList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clickHandler = function clickHandler(e) {
  if (!e.target.className.includes('bookmark')) return;

  if (_common.state.bookmarkJobItems.some(function (bookmark) {
    return bookmark.id === _common.state.activeJobItem.id;
  })) {
    _common.state.bookmarkJobItems = _common.state.bookmarkJobItems.filter(function (bookmark) {
      return bookmark.id !== _common.state.activeJobItem.id;
    });
  } else {
    _common.state.bookmarkJobItems.push(_common.state.activeJobItem);
  } //local storage


  localStorage.setItem('bookmarksJobItems', JSON.stringify(_common.state.bookmarkJobItems));
  document.querySelector('.job-info__bookmark-icon').classList.toggle('bookmark-active');
  (0, _jobList["default"])('search');
};

var mouseEnterHandler = function mouseEnterHandler() {
  _common.jobListBookmarksEl.classList.remove("opacity-0", "scale-90", "invisible", "pointer-events-none");

  _common.jobListBookmarksEl.classList.add("opacity-100", "scale-100", "pointer-events-auto");

  (0, _jobList["default"])('bookmark');
};

var mouseLeaveHandler = function mouseLeaveHandler() {
  _common.jobListBookmarksEl.classList.add("opacity-0", "scale-90", "invisible", "pointer-events-none");

  _common.jobListBookmarksEl.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
};

_common.jobDetailsEl.addEventListener('click', clickHandler);

_common.bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);

_common.bookmarksBtnEl.addEventListener('mouseleave', mouseLeaveHandler);
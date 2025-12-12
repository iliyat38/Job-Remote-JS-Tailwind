"use strict";

var _common = require("../common.js");

var _jobList = _interopRequireDefault(require("./jobList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clickHandler = function clickHandler(e) {
  if (!e.target.className.includes('bookmark')) return;

  _common.state.bookmarkJobItems.push(_common.state.activeJobItem);

  console.log(_common.state.bookmarkJobItems);
  document.querySelector('.job-info__bookmark-icon').classList.toggle('bookmark-active');
};

var mouseEnterHandler = function mouseEnterHandler() {
  _common.jobListBookmarksEl.classList.remove("opacity-0", "scale-90", "invisible", "pointer-events-none");

  _common.jobListBookmarksEl.classList.add("opacity-100", "scale-100", "pointer-events-auto");
};

var mouseLeaveHandler = function mouseLeaveHandler() {
  _common.jobListBookmarksEl.classList.add("opacity-0", "scale-90", "invisible", "pointer-events-none");

  _common.jobListBookmarksEl.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
};

_common.jobDetailsEl.addEventListener('click', clickHandler);

_common.bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);

_common.bookmarksBtnEl.addEventListener('mouseleave', mouseLeaveHandler);
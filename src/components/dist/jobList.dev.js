"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common.js");

var _Spinner = _interopRequireDefault(require("./Spinner.js"));

var _jobDetails = _interopRequireDefault(require("./jobDetails.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderJobList = function renderJobList(jobItems) {
  jobItems.slice(0, 7).forEach(function (jobItem) {
    var colorIndex = _common.jobListSearchEl.children.length % _common.colors.length;
    var badgeColor = _common.colors[colorIndex];
    var jobItemHtml = "\n                    <li class=\"job-item bg-white cursor-pointer border-b border-[#ebeff1] last:border-b-0 hover:bg-[#f4f5f7] transition-all duration-200\">\n                        <a class=\"job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex\" href=\"".concat(jobItem.id, "\">\n                            <div\n                                class=\"job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold\"\n                                style=\"background-color: ").concat(badgeColor, "\"\n                                data-badge-color=\"").concat(badgeColor, "\">\n                                ").concat(jobItem.badgeLetters, "\n                            </div>\n                            <div class=\"job-item__middle\">\n                                <h3 class=\"third-heading text-[13px] font-semibold\">").concat(jobItem.title, "</h3>\n                                <p class=\"job-item__company text-xs mb-0.5 italic\">").concat(jobItem.company, "</p>\n                                <div class=\"job-item__extras grid grid-cols-[65px_72px_65px] gap-2.5\">\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-clock job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.duration, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-money-bill job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.salary, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-location-dot job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.location, "</p>\n                                </div>\n                            </div>\n                            <div class=\"job-item__right ml-auto flex flex-col items-end\">\n                                <i\n                                    class=\"fa-solid fa-bookmark job-item__bookmark-icon text-sm cursor-pointer text-[#d7dbe0] hover:text-[#9ca2a9] transition-all duration-200\"></i>\n                                <time\n                                    class=\"job-item__time text-[10px] mt-1 text-[#515459]\">").concat(jobItem.daysAgo, "d</time>\n                            </div>\n                        </a>\n                    </li>\n            ");

    _common.jobListSearchEl.insertAdjacentHTML('beforeend', jobItemHtml);
  });
};

var clickHandler = function clickHandler(e) {
  e.preventDefault();
  var jobItemEl = e.target.closest('.job-item');
  var badgeColor = jobItemEl.querySelector('.job-item__badge').dataset.badgeColor;
  _common.jobDetailsContentEl.innerHTML = '';
  (0, _Spinner["default"])('jobList');
  var jobId = jobItemEl.children[0].getAttribute('href');
  fetch("".concat(_common.BASE_API_URL, "/jobs/").concat(jobId)).then(function (res) {
    if (!res.ok) {
      console.error('failed to fetch job detail');
      return;
    }

    return res.json();
  }).then(function (data) {
    var jobItem = data.jobItem;
    (0, _Spinner["default"])('jobList');
    (0, _jobDetails["default"])(jobItem, badgeColor);
  })["catch"](function (err) {
    return console.error(err);
  });
};

_common.jobListSearchEl.addEventListener('click', clickHandler);

var _default = renderJobList;
exports["default"] = _default;
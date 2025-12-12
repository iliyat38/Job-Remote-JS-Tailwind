"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common.js");

var _Spinner = _interopRequireDefault(require("./Spinner.js"));

var _jobDetails = _interopRequireDefault(require("./jobDetails.js"));

var _Error = _interopRequireDefault(require("./Error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var renderJobList = function renderJobList() {
  var whichJobList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'search';
  var jobListEl = whichJobList === 'search' ? _common.jobListSearchEl : _common.jobListBookmarksEl;
  jobListEl.innerHTML = '';
  var jobItems;

  if (whichJobList === 'search') {
    jobItems = _common.state.searchJobItems.slice(_common.state.currentPage * _common.ITEM_SIZE_PER_PAGE - _common.ITEM_SIZE_PER_PAGE, _common.state.currentPage * _common.ITEM_SIZE_PER_PAGE);
  } else {
    jobItems = _common.state.bookmarkJobItems;
  }

  jobItems.forEach(function (jobItem) {
    var colorIndex = _common.jobListSearchEl.children.length % _common.colors.length;
    var badgeColor = _common.colors[colorIndex];
    var jobItemHtml = "\n                    <li class=\"job-item bg-white ".concat(_common.state.activeJobItem.id === jobItem.id ? 'job-item--active' : '', " cursor-pointer border-b border-[#ebeff1] last:border-b-0 hover:bg-[#f4f5f7] transition-all duration-200\">\n                        <a class=\"job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex\" href=\"").concat(jobItem.id, "\">\n                            <div\n                                class=\"job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold\"\n                                style=\"background-color: ").concat(badgeColor, "\"\n                                data-badge-color=\"").concat(badgeColor, "\">\n                                ").concat(jobItem.badgeLetters, "\n                            </div>\n                            <div class=\"job-item__middle\">\n                                <h3 class=\"third-heading text-[13px] font-semibold\">").concat(jobItem.title, "</h3>\n                                <p class=\"job-item__company text-xs mb-0.5 italic\">").concat(jobItem.company, "</p>\n                                <div class=\"job-item__extras grid grid-cols-[65px_72px_65px] gap-2.5\">\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-clock job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.duration, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-money-bill job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.salary, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-location-dot job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.location, "</p>\n                                </div>\n                            </div>\n                            <div class=\"job-item__right ml-auto flex flex-col items-end\">\n                                <i\n                                    class=\"fa-solid fa-bookmark job-item__bookmark-icon  ").concat(_common.state.bookmarkJobItems.some(function (b) {
      return b.id == jobItem.id;
    }) ? 'job-item__bookmark-icon--bookmarked' : 'text-[#d7dbe0]', " text-sm cursor-pointer  hover:text-[#9ca2a9] transition-all duration-200\"></i>\n                                <time\n                                    class=\"job-item__time text-[10px] mt-1 text-[#515459]\">").concat(jobItem.daysAgo, "d</time>\n                            </div>\n                        </a>\n                    </li>\n            ");
    jobListEl.insertAdjacentHTML('beforeend', jobItemHtml);
  });
};

var clickHandler = function clickHandler(e) {
  var jobItemEl, badgeColor, jobId, allJobItems, data, jobItem;
  return regeneratorRuntime.async(function clickHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          jobItemEl = e.target.closest('.job-item');

          if (jobItemEl) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          badgeColor = jobItemEl.querySelector('.job-item__badge').dataset.badgeColor; // localStorage.setItem('badgeColor', badgeColor);

          _common.state.badgeColor = badgeColor;
          _common.jobDetailsContentEl.innerHTML = '';
          (0, _Spinner["default"])('jobList');
          document.querySelectorAll('.job-item--active').forEach(function (item) {
            return item.classList.remove('job-item--active');
          });
          jobItemEl.classList.add('job-item--active');
          jobId = jobItemEl.children[0].getAttribute('href');
          allJobItems = [].concat(_toConsumableArray(_common.state.searchJobItems), _toConsumableArray(_common.state.bookmarkJobItems));
          _common.state.activeJobItem = allJobItems.find(function (item) {
            return item.id === +jobId;
          });
          history.pushState(null, '', "#".concat(jobId));
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap((0, _common.getData)("".concat(_common.BASE_API_URL, "/jobs/").concat(jobId)));

        case 17:
          data = _context.sent;
          jobItem = data.jobItem;
          (0, _Spinner["default"])('jobList');
          (0, _jobDetails["default"])(jobItem, badgeColor);
          _context.next = 28;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](14);
          (0, _Spinner["default"])('jobList');
          (0, _Error["default"])();
          console.log(_context.t0.message);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[14, 23]]);
};

_common.jobListSearchEl.addEventListener('click', clickHandler);

_common.jobListBookmarksEl.addEventListener('click', clickHandler);

var _default = renderJobList;
exports["default"] = _default;
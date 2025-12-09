"use strict";

var _common = require("../common.js");

var _Error = _interopRequireDefault(require("./Error.js"));

var _Spinner = _interopRequireDefault(require("./Spinner.js"));

var _jobList = _interopRequireDefault(require("./jobList.js"));

var _Pagination = _interopRequireDefault(require("./Pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Search component
var submitHandler = function submitHandler(e) {
  var searchText, forbiddenPattern, patternMatch, data, jobItems;
  return regeneratorRuntime.async(function submitHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          _common.jobListSearchEl.innerHTML = ""; //get input search text

          searchText = _common.searchInputEl.value; //reset sorting btn

          _common.sortingBtnRelevantEl.classList.add('sorting__button--active');

          _common.sortingBtnRecentEl.classList.remove('sorting__button--active'); //validation


          forbiddenPattern = /[0-9]/;
          patternMatch = forbiddenPattern.test(searchText);

          if (!patternMatch) {
            _context.next = 10;
            break;
          }

          (0, _Error["default"])("your search may not contain number");
          return _context.abrupt("return");

        case 10:
          _common.searchInputEl.blur();

          _common.state.currentPage = 1;
          (0, _Pagination["default"])();
          (0, _Spinner["default"])('search');
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap((0, _common.getData)("".concat(_common.BASE_API_URL, "/jobs?search=").concat(searchText)));

        case 17:
          data = _context.sent;
          //گرفتن jobItems
          jobItems = data.jobItems; //update state

          _common.state.searchJobItems = jobItems;
          (0, _Spinner["default"])('search');
          _common.numberEl.textContent = jobItems.length;
          (0, _jobList["default"])();

          _common.paginationBtnNextEl.classList.remove('invisible');

          _context.next = 31;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](14);
          (0, _Spinner["default"])('search');
          (0, _Error["default"])();
          console.log(_context.t0.message);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[14, 26]]);
};

_common.searchFormEl.addEventListener('submit', submitHandler);
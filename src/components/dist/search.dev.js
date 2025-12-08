"use strict";

var _common = require("../common.js");

var _Error = _interopRequireDefault(require("./Error.js"));

var _Spinner = _interopRequireDefault(require("./Spinner.js"));

var _jobList = _interopRequireDefault(require("./jobList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Search component
var submitHandler = function submitHandler(e) {
  e.preventDefault();
  _common.jobListSearchEl.innerHTML = ""; //get input search text

  var searchText = _common.searchInputEl.value; //validation

  var forbiddenPattern = /[0-9]/;
  var patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    (0, _Error["default"])("your search may not contain number");
    return;
  }

  _common.searchInputEl.blur();

  (0, _Spinner["default"])('search'); //fetch data from server

  fetch("".concat(_common.BASE_API_URL, "/jobs?search=").concat(searchText)).then(function (res) {
    if (!res.ok) {
      console.log('something went wrong');
    }

    return res.json();
  }).then(function (data) {
    // job items
    var jobItems = data.jobItems;
    _common.numberEl.textContent = jobItems.length;
    (0, _Spinner["default"])('search');
    (0, _jobList["default"])(jobItems);
  })["catch"](function (err) {
    return console.error(err);
  });
};

_common.searchFormEl.addEventListener('submit', submitHandler);
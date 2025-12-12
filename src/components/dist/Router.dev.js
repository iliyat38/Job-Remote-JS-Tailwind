"use strict";

var _common = require("../common.js");

var _Spinner = _interopRequireDefault(require("./Spinner.js"));

var _Error = _interopRequireDefault(require("./Error.js"));

var _jobDetails = _interopRequireDefault(require("./jobDetails.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadHandler = function loadHandler(e) {
  var id, data, jobItem;
  return regeneratorRuntime.async(function loadHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = window.location.hash.substring(1);

          if (!id) {
            _context.next = 19;
            break;
          }

          _common.jobDetailsContentEl.innerHTML = '';
          (0, _Spinner["default"])('jobDetail');
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _common.getData)("".concat(_common.BASE_API_URL, "/jobs/").concat(id)));

        case 7:
          data = _context.sent;
          jobItem = data.jobItem;
          _common.state.activeJobItem = jobItem;
          console.log("ROUTER RECEIVED:", _common.state.badgeColor);
          (0, _jobDetails["default"])(jobItem, _common.state.badgeColor);
          (0, _Spinner["default"])('jobDetail');
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          (0, _Error["default"])();
          console.log(_context.t0.message);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 15]]);
};

window.addEventListener('DOMContentLoaded', loadHandler);
window.addEventListener('hashchange', loadHandler);
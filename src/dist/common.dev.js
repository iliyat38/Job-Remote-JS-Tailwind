"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.getData = exports.colors = exports.spinnerJobDetailsEl = exports.spinnerSearchEl = exports.sortingBtnRecentEl = exports.sortingBtnRelevantEl = exports.sortingEl = exports.searchInputEl = exports.searchFormEl = exports.paginationNumberBackEl = exports.paginationNumberNextEl = exports.paginationBtnBackEl = exports.paginationBtnNextEl = exports.paginationEl = exports.numberEl = exports.jobListSearchEl = exports.jobListBookmarksEl = exports.jobDetailsContentEl = exports.jobDetailsEl = exports.errorTextEl = exports.errorEl = exports.bookmarksBtnEl = exports.ITEM_SIZE_PER_PAGE = exports.DEFAULT_DISPLAY_TIME = exports.BASE_API_URL = void 0;
//CONSTANTS
var BASE_API_URL = 'https://bytegrad.com/course-assets/js/2/api';
exports.BASE_API_URL = BASE_API_URL;
var DEFAULT_DISPLAY_TIME = 4000;
exports.DEFAULT_DISPLAY_TIME = DEFAULT_DISPLAY_TIME;
var ITEM_SIZE_PER_PAGE = 7; //SELECTORS

exports.ITEM_SIZE_PER_PAGE = ITEM_SIZE_PER_PAGE;
var bookmarksBtnEl = document.querySelector('.bookmarks-btn');
exports.bookmarksBtnEl = bookmarksBtnEl;
var errorEl = document.querySelector('.error');
exports.errorEl = errorEl;
var errorTextEl = document.querySelector('.error__text');
exports.errorTextEl = errorTextEl;
var jobDetailsEl = document.querySelector('.job-details');
exports.jobDetailsEl = jobDetailsEl;
var jobDetailsContentEl = document.querySelector(".job-details__content");
exports.jobDetailsContentEl = jobDetailsContentEl;
var jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
exports.jobListBookmarksEl = jobListBookmarksEl;
var jobListSearchEl = document.querySelector(".job-list--search");
exports.jobListSearchEl = jobListSearchEl;
var numberEl = document.querySelector(".count__number");
exports.numberEl = numberEl;
var paginationEl = document.querySelector(".pagination");
exports.paginationEl = paginationEl;
var paginationBtnNextEl = document.querySelector(".pagination__button--next");
exports.paginationBtnNextEl = paginationBtnNextEl;
var paginationBtnBackEl = document.querySelector(".pagination__button--back");
exports.paginationBtnBackEl = paginationBtnBackEl;
var paginationNumberNextEl = document.querySelector(".pagination__number--next");
exports.paginationNumberNextEl = paginationNumberNextEl;
var paginationNumberBackEl = document.querySelector(".pagination__number--back");
exports.paginationNumberBackEl = paginationNumberBackEl;
var searchFormEl = document.querySelector(".search");
exports.searchFormEl = searchFormEl;
var searchInputEl = document.querySelector(".search__input");
exports.searchInputEl = searchInputEl;
var sortingEl = document.querySelector(".sorting");
exports.sortingEl = sortingEl;
var sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
exports.sortingBtnRelevantEl = sortingBtnRelevantEl;
var sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
exports.sortingBtnRecentEl = sortingBtnRecentEl;
var spinnerSearchEl = document.querySelector(".spinner--search");
exports.spinnerSearchEl = spinnerSearchEl;
var spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
exports.spinnerJobDetailsEl = spinnerJobDetailsEl;
var colors = ['#8dd335', '#3D87F1', '#D2D631', '#D96A46']; //UTILITY FUNCTIONS

exports.colors = colors;

var getData = function getData(URL) {
  var response, data;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(URL));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;

          if (response.ok) {
            _context.next = 8;
            break;
          }

          throw new Error(data.description);

        case 8:
          return _context.abrupt("return", data);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getData = getData;
var state = {
  searchJobItems: [],
  currentPage: 1,
  badgeColor: '',
  activeJobItem: {},
  bookmarkJobItems: []
};
exports.state = state;
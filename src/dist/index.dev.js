"use strict";

// Global
var baseUrl = 'http://localhost:3000';
var bookmarksBtnEl = document.querySelector('.bookmarks-btn');
var errorEl = document.querySelector('.error');
var errorTextEl = document.querySelector('.error__text');
var jobDetailsEl = document.querySelector('.job-details');
var jobDetailsContentEl = document.querySelector(".job-details__content");
var jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
var jobListSearchEl = document.querySelector(".job-list--search");
var numberEl = document.querySelector(".count__number");
var paginationEl = document.querySelector(".pagination");
var paginationBtnNextEl = document.querySelector(".pagination__button--next");
var paginationBtnBackEl = document.querySelector(".pagination__button--back");
var paginationNumberNextEl = document.querySelector(".pagination__number--next");
var paginationNumberBackEl = document.querySelector(".pagination__number--back");
var searchFormEl = document.querySelector(".search");
var searchInputEl = document.querySelector(".search__input");
var sortingEl = document.querySelector(".sorting");
var sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
var sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
var spinnerSearchEl = document.querySelector(".spinner--search");
var spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
var colors = ['#8dd335', '#3D87F1', '#D2D631', '#D96A46']; //Hide & show func for error

function toggleError(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
  element.classList.remove('hidden');
  requestAnimationFrame(function () {
    element.classList.add('error__visible');
    element.classList.remove('opacity-0', '-translate-y-30');
  });
  setTimeout(function () {
    element.classList.add('opacity-0', '-translate-y-30');
    element.classList.remove('error--visible');
    setTimeout(function () {
      element.classList.add('hidden');
    }, 300);
  }, duration);
} // Search component


var submitHandler = function submitHandler(e) {
  e.preventDefault();
  jobListSearchEl.innerHTML = ""; //get input search text

  var searchText = searchInputEl.value; //validation

  var forbiddenPattern = /[0-9]/;
  var patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    errorTextEl.textContent = "your search may not contain number";
    toggleError(errorEl);
  }

  searchInputEl.blur();
  spinnerSearchEl.classList.remove('hidden'); //fetch data from server

  fetch("https://bytegrad.com/course-assets/js/2/api/jobs?search=".concat(searchText)).then(function (res) {
    if (!res.ok) {
      console.log('something went wrong');
    }

    return res.json();
  }).then(function (data) {
    // job items
    var jobItems = data.jobItems;
    numberEl.textContent = jobItems.length;
    spinnerSearchEl.classList.add('hidden');
    jobItems.slice(0, 7).forEach(function (jobItem) {
      var colorIndex = jobListSearchEl.children.length % colors.length;
      var badgeColor = colors[colorIndex];
      var jobItemHtml = "\n                    <li class=\"job-item bg-white cursor-pointer border-b border-[#ebeff1] last:border-b-0 hover:bg-[#f4f5f7] transition-all duration-200\">\n                        <a class=\"job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex\" href=\"#\">\n                            <div\n                                class=\"job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold\"\n                                style=\"background-color: ".concat(badgeColor, "\">\n                                ").concat(jobItem.badgeLetters, "\n                            </div>\n                            <div class=\"job-item__middle\">\n                                <h3 class=\"third-heading text-[13px] font-semibold\">").concat(jobItem.title, "</h3>\n                                <p class=\"job-item__company text-xs mb-0.5 italic\">").concat(jobItem.company, "</p>\n                                <div class=\"job-item__extras grid grid-cols-[65px_72px_65px] gap-2.5\">\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-clock job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.duration, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-money-bill job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.salary, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-location-dot job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.location, "</p>\n                                </div>\n                            </div>\n                            <div class=\"job-item__right ml-auto flex flex-col items-end\">\n                                <i\n                                    class=\"fa-solid fa-bookmark job-item__bookmark-icon text-sm cursor-pointer text-[#d7dbe0] hover:text-[#9ca2a9] transition-all duration-200\"></i>\n                                <time\n                                    class=\"job-item__time text-[10px] mt-1 text-[#515459]\">").concat(jobItem.daysAgo, "d</time>\n                            </div>\n                        </a>\n                    </li>\n            ");
      jobListSearchEl.insertAdjacentHTML('beforeend', jobItemHtml);
    });
  })["catch"](function (err) {
    return console.error(err);
  });
};

searchFormEl.addEventListener('submit', submitHandler);
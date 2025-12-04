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
      var jobItemHtml = "\n                    <li class=\"job-item bg-white cursor-pointer border-b border-[#ebeff1] last:border-b-0 hover:bg-[#f4f5f7] transition-all duration-200\">\n                        <a class=\"job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex\" href=\"".concat(jobItem.id, "\">\n                            <div\n                                class=\"job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold\"\n                                style=\"background-color: ").concat(badgeColor, "\"\n                                data-badge-color=\"").concat(badgeColor, "\">\n                                ").concat(jobItem.badgeLetters, "\n                            </div>\n                            <div class=\"job-item__middle\">\n                                <h3 class=\"third-heading text-[13px] font-semibold\">").concat(jobItem.title, "</h3>\n                                <p class=\"job-item__company text-xs mb-0.5 italic\">").concat(jobItem.company, "</p>\n                                <div class=\"job-item__extras grid grid-cols-[65px_72px_65px] gap-2.5\">\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-clock job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.duration, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-money-bill job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.salary, "</p>\n                                    <p class=\"job-item__extra text-[#4d5054] text-[11px]\"><i\n                                            class=\"fa-solid fa-location-dot job-item__extra-icon text-[#bec5ce] text-[10px] mr-px\"></i>\n                                        ").concat(jobItem.location, "</p>\n                                </div>\n                            </div>\n                            <div class=\"job-item__right ml-auto flex flex-col items-end\">\n                                <i\n                                    class=\"fa-solid fa-bookmark job-item__bookmark-icon text-sm cursor-pointer text-[#d7dbe0] hover:text-[#9ca2a9] transition-all duration-200\"></i>\n                                <time\n                                    class=\"job-item__time text-[10px] mt-1 text-[#515459]\">").concat(jobItem.daysAgo, "d</time>\n                            </div>\n                        </a>\n                    </li>\n            ");
      jobListSearchEl.insertAdjacentHTML('beforeend', jobItemHtml);
    });
  })["catch"](function (err) {
    return console.error(err);
  });
};

searchFormEl.addEventListener('submit', submitHandler);

var clickHandler = function clickHandler(e) {
  e.preventDefault();
  var jobItemEl = e.target.closest('.job-item');
  var badgeColor = jobItemEl.querySelector('.job-item__badge').dataset.badgeColor;
  jobDetailsContentEl.innerHTML = '';
  spinnerJobDetailsEl.classList.remove('hidden');
  var jobId = jobItemEl.children[0].getAttribute('href');
  console.log(jobId);
  fetch("https://bytegrad.com/course-assets/js/2/api/jobs/".concat(jobId)).then(function (res) {
    if (!res.ok) {
      console.error('failed to fetch job detail');
      return;
    }

    return res.json();
  }).then(function (data) {
    var jobItem = data.jobItem;
    spinnerJobDetailsEl.classList.add('hidden');
    var detail = "\n                    <img src=\"".concat(jobItem.coverImgURL, "\" alt=\"#\"\n                        class=\"job-details__cover-img absolute w-full h-44 z-0 top-0 object-cover rounded-tr-lg select-none\">\n\n                    <a class=\"apply-btn absolute flex items-center bg-[#2671dd] z-2 text-[#FFFFFFEB] text-[11px] py-1.5 px-2 rounded-sm top-3 right-3 cursor-pointer uppercase hover:bg-[#1d60bd] focus:bg-[#1d60bd] focus:text-[#FFFFFF] transition-all duration-200\"\n                        href=\"").concat(jobItem.companyURL, "\" target=\"_blank\">Apply\n                        <i\n                            class=\"fa-solid fa-square-arrow-up-right apply-btn__icon text-[#FFFFFFA6] text-[8px] ml-1 -mt-px\"></i></a>\n\n                    <section\n                        class=\"job-info relative z-1 mb-10 flex pt-30 gap-x-4 before:content-[''] before:absolute before:w-full before:h-44 before:top-0 before:left-0 before:bg-linear-to-t before:from-[rgba(0,0,0,0.7)] before:to=[rgba(0,0,0,0.15)] before:-z-1 before:rounded-tr-lg\">\n                        <div class=\"job-info__left pl-10.5\">\n                            <div\n                             style=\"background-color: ").concat(badgeColor, "\"\n                                class=\"job-info__badge w-15 h-17.5 rounded-sm flex items-center justify-center text-xl font-semibold mb-3.25\">\n                                ").concat(jobItem.badgeLetters, "</div>\n                            <div class=\"job-info__below-badge flex justify-between\">\n                                <time class=\"job-info__time text-xs translate-y-px text-[#4d5254]\">").concat(jobItem.daysAgo, "</time>\n                                <button class=\"job-info__bookmark-btn cursor-pointer hover:text-[#2671dd]\">\n                                    <i\n                                        class=\"fa-solid fa-bookmark job-info__bookmark-icon text-[#d7dbe0] text-lg hover:text-[#2671dd]\"></i>\n                                </button>\n                            </div>\n                        </div>\n                        <div class=\"job-info__right pr-10.5\">\n                            <h2 class=\"second-heading text-[23px] text-white font-medium\">").concat(jobItem.title, "</h2>\n                            <p class=\"job-info__company text-sm italic text-[#FFFFFFCC]\">").concat(jobItem.company, "</p>\n                            <p class=\"job-info__description text-sm mt-4.5 mb-3 leading-snug\">").concat(jobItem.description, "</p>\n                            <div class=\"job-info__extras flex gap-x-9\">\n                                <p class=\"job-info__extra\"><span class=\"job-info__extra-icon\"><i\n                                            class=\"fa-solid fa-clock\"></i></span>\n                                    ").concat(jobItem.duration, "</p>\n                                <p class=\"job-info__extra\"><span class=\"job-info__extra-icon\"><i\n                                            class=\"fa-solid fa-money-bill\"></i></span>\n                                    ").concat(jobItem.salary, "</p>\n                                <p class=\"job-info__extra\"><span class=\"job-info__extra-icon\"><i\n                                            class=\"fa-solid fa-location-dot\"></i></span>\n                                    ").concat(jobItem.location, "</p>\n                            </div>\n                        </div>\n                    </section>\n\n                    <div class=\"job-details__other\">\n                        <section class=\"qualifications flex px-10.5 mb-7.5\">\n                            <div class=\"qualifications__left mr-8.75\">\n                                <h4 class=\"fourth-heading text-base font-semibold capitalize\">Qualifications</h4>\n                                <p class=\"qualifications__sub-text text-[13px] w-39.25 mt-0.75\">Other qualifications may\n                                    apply\n                                </p>\n                            </div>\n                            <ul class=\"qualifications__list flex flex-wrap gap-1.5\">\n                            ").concat(jobItem.qualifications.map(function (qu) {
      return "<li\n                class=\"qualifications__item text-[13px] bg-[#e6ebee] rounded-xs py-1.5 px-2.5 text-[#494d4f]\">\n                ".concat(qu, "\n            </li>");
    }).join(''), "\n                            </ul>\n                        </section>\n\n                        <section class=\"reviews flex pl-10.5 pr-10.5\">\n                            <div class=\"reviews__left mr-8.75\">\n                                <h4 class=\"fourth-heading text-base font-semibold capitalize\">Company reviews</h4>\n                                <p class=\"reviews__sub-text text-[13px] w-39.25 mt-0.75\">Recent things people are saying\n                                </p>\n                            </div>\n                            <ul\n                                class=\"reviews__list flex-1 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-x-5 gap-y-5\">\n                                ").concat(jobItem.reviews.map(function (re) {
      return "                                <li\n                                    class=\"reviews__item text-[13px] italic text-[#494d4f] relative transform-3d before:content-['\u201C'] before:absolute before:text-5xl before:-top-3.5 before:-left-2.5 before:text-[#d2d7db] before:-translate-z-px\">\n                                  ".concat(re, "\n                                </li>");
    }).join(''), "\n\n                            </ul>\n                        </section>\n                    </div>\n\n                    <footer class=\"job-details__footer mx-10.5 mt-8.25 p-3.25 border border-[#dce2e8]\">\n                        <p class=\"job-details__footer-text\">If possible, please reference that you found the job on\n                            <span class=\"u-bold\">rmtDev</span>, we would really appreciate it!\n                        </p>\n                    </footer>");
    jobDetailsContentEl.innerHTML = detail;
  })["catch"](function (err) {
    return console.error(err);
  });
};

jobListSearchEl.addEventListener('click', clickHandler);
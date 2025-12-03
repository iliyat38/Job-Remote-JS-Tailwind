// Global
const baseUrl = 'http://localhost:3000';

const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector('.error');
const errorTextEl = document.querySelector('.error__text');
const jobDetailsEl = document.querySelector('.job-details');
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(".pagination__number--next");
const paginationNumberBackEl = document.querySelector(".pagination__number--back");
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");
const colors = ['#8dd335', '#3D87F1', '#D2D631', '#D96A46'];

//Hide & show func for error
function toggleError(element, duration = 3000) {
    element.classList.remove('hidden');

    requestAnimationFrame(() => {
        element.classList.add('error__visible');
        element.classList.remove('opacity-0', '-translate-y-30');
    })

    setTimeout(() => {
        element.classList.add('opacity-0', '-translate-y-30');
        element.classList.remove('error--visible');

        setTimeout(() => {
            element.classList.add('hidden');
        }, 300);
    }, duration);
}


// Search component
const submitHandler = e => {
    e.preventDefault();

    jobListSearchEl.innerHTML = "";
    //get input search text
    const searchText = searchInputEl.value;

    //validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorTextEl.textContent = "your search may not contain number";

        toggleError(errorEl);


    }
    searchInputEl.blur();
    spinnerSearchEl.classList.remove('hidden');

    //fetch data from server
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
        .then(res => {
            if (!res.ok) {
                console.log('something went wrong');
            }

            return res.json();
        })
        .then(data => {
            // job items
            const { jobItems } = data;
            numberEl.textContent = jobItems.length;
            spinnerSearchEl.classList.add('hidden');

            jobItems.slice(0, 7).forEach(jobItem => {
                const colorIndex = jobListSearchEl.children.length % colors.length;
                const badgeColor = colors[colorIndex];
                const jobItemHtml = `
                    <li class="job-item bg-white cursor-pointer border-b border-[#ebeff1] last:border-b-0 hover:bg-[#f4f5f7] transition-all duration-200">
                        <a class="job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex" href="#">
                            <div
                                class="job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold"
                                style="background-color: ${badgeColor}">
                                ${jobItem.badgeLetters}
                            </div>
                            <div class="job-item__middle">
                                <h3 class="third-heading text-[13px] font-semibold">${jobItem.title}</h3>
                                <p class="job-item__company text-xs mb-0.5 italic">${jobItem.company}</p>
                                <div class="job-item__extras grid grid-cols-[65px_72px_65px] gap-2.5">
                                    <p class="job-item__extra text-[#4d5054] text-[11px]"><i
                                            class="fa-solid fa-clock job-item__extra-icon text-[#bec5ce] text-[10px] mr-px"></i>
                                        ${jobItem.duration}</p>
                                    <p class="job-item__extra text-[#4d5054] text-[11px]"><i
                                            class="fa-solid fa-money-bill job-item__extra-icon text-[#bec5ce] text-[10px] mr-px"></i>
                                        ${jobItem.salary}</p>
                                    <p class="job-item__extra text-[#4d5054] text-[11px]"><i
                                            class="fa-solid fa-location-dot job-item__extra-icon text-[#bec5ce] text-[10px] mr-px"></i>
                                        ${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right ml-auto flex flex-col items-end">
                                <i
                                    class="fa-solid fa-bookmark job-item__bookmark-icon text-sm cursor-pointer text-[#d7dbe0] hover:text-[#9ca2a9] transition-all duration-200"></i>
                                <time
                                    class="job-item__time text-[10px] mt-1 text-[#515459]">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;
                jobListSearchEl.insertAdjacentHTML('beforeend', jobItemHtml);
            })

        })
        .catch(err => console.error(err));

};

searchFormEl.addEventListener('submit', submitHandler);

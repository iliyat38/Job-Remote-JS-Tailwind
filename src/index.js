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
                        <a class="job-item__link w-full h-full px-5 py-3.5 focus:bg-[#f4f5f7] flex" href="${jobItem.id}">
                            <div
                                class="job-item__badge text-sm h-11.5 w-9.5 rounded-md flex justify-center items-center mr-3.25 font-semibold"
                                style="background-color: ${badgeColor}"
                                data-badge-color="${badgeColor}">
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

const clickHandler = e => {
    e.preventDefault();

    const jobItemEl = e.target.closest('.job-item');

    const badgeColor = jobItemEl.querySelector('.job-item__badge').dataset.badgeColor;

    jobDetailsContentEl.innerHTML = '';
    spinnerJobDetailsEl.classList.remove('hidden');

    const jobId = jobItemEl.children[0].getAttribute('href');
    console.log(jobId);

    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs/${jobId}`)
        .then(res => {
            if (!res.ok) {
                console.error('failed to fetch job detail');
                return;
            }
            return res.json();
        })
        .then(data => {
            const { jobItem } = data;
            spinnerJobDetailsEl.classList.add('hidden');
            const detail = `
                    <img src="${jobItem.coverImgURL}" alt="#"
                        class="job-details__cover-img absolute w-full h-44 z-0 top-0 object-cover rounded-tr-lg select-none">

                    <a class="apply-btn absolute flex items-center bg-[#2671dd] z-2 text-[#FFFFFFEB] text-[11px] py-1.5 px-2 rounded-sm top-3 right-3 cursor-pointer uppercase hover:bg-[#1d60bd] focus:bg-[#1d60bd] focus:text-[#FFFFFF] transition-all duration-200"
                        href="${jobItem.companyURL}" target="_blank">Apply
                        <i
                            class="fa-solid fa-square-arrow-up-right apply-btn__icon text-[#FFFFFFA6] text-[8px] ml-1 -mt-px"></i></a>

                    <section
                        class="job-info relative z-1 mb-10 flex pt-30 gap-x-4 before:content-[''] before:absolute before:w-full before:h-44 before:top-0 before:left-0 before:bg-linear-to-t before:from-[rgba(0,0,0,0.7)] before:to=[rgba(0,0,0,0.15)] before:-z-1 before:rounded-tr-lg">
                        <div class="job-info__left pl-10.5">
                            <div
                             style="background-color: ${badgeColor}"
                                class="job-info__badge w-15 h-17.5 rounded-sm flex items-center justify-center text-xl font-semibold mb-3.25">
                                ${jobItem.badgeLetters}</div>
                            <div class="job-info__below-badge flex justify-between">
                                <time class="job-info__time text-xs translate-y-px text-[#4d5254]">${jobItem.daysAgo}</time>
                                <button class="job-info__bookmark-btn cursor-pointer hover:text-[#2671dd]">
                                    <i
                                        class="fa-solid fa-bookmark job-info__bookmark-icon text-[#d7dbe0] text-lg hover:text-[#2671dd]"></i>
                                </button>
                            </div>
                        </div>
                        <div class="job-info__right pr-10.5">
                            <h2 class="second-heading text-[23px] text-white font-medium">${jobItem.title}</h2>
                            <p class="job-info__company text-sm italic text-[#FFFFFFCC]">${jobItem.company}</p>
                            <p class="job-info__description text-sm mt-4.5 mb-3 leading-snug">${jobItem.description}</p>
                            <div class="job-info__extras flex gap-x-9">
                                <p class="job-info__extra"><span class="job-info__extra-icon"><i
                                            class="fa-solid fa-clock"></i></span>
                                    ${jobItem.duration}</p>
                                <p class="job-info__extra"><span class="job-info__extra-icon"><i
                                            class="fa-solid fa-money-bill"></i></span>
                                    ${jobItem.salary}</p>
                                <p class="job-info__extra"><span class="job-info__extra-icon"><i
                                            class="fa-solid fa-location-dot"></i></span>
                                    ${jobItem.location}</p>
                            </div>
                        </div>
                    </section>

                    <div class="job-details__other">
                        <section class="qualifications flex px-10.5 mb-7.5">
                            <div class="qualifications__left mr-8.75">
                                <h4 class="fourth-heading text-base font-semibold capitalize">Qualifications</h4>
                                <p class="qualifications__sub-text text-[13px] w-39.25 mt-0.75">Other qualifications may
                                    apply
                                </p>
                            </div>
                            <ul class="qualifications__list flex flex-wrap gap-1.5">
                            ${jobItem.qualifications.map(qu => `<li
                class="qualifications__item text-[13px] bg-[#e6ebee] rounded-xs py-1.5 px-2.5 text-[#494d4f]">
                ${qu}
            </li>`).join('')}
                            </ul>
                        </section>

                        <section class="reviews flex pl-10.5 pr-10.5">
                            <div class="reviews__left mr-8.75">
                                <h4 class="fourth-heading text-base font-semibold capitalize">Company reviews</h4>
                                <p class="reviews__sub-text text-[13px] w-39.25 mt-0.75">Recent things people are saying
                                </p>
                            </div>
                            <ul
                                class="reviews__list flex-1 grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-x-5 gap-y-5">
                                ${jobItem.reviews.map(re => `                                <li
                                    class="reviews__item text-[13px] italic text-[#494d4f] relative transform-3d before:content-['“'] before:absolute before:text-5xl before:-top-3.5 before:-left-2.5 before:text-[#d2d7db] before:-translate-z-px">
                                  ${re}
                                </li>`).join('')}

                            </ul>
                        </section>
                    </div>

                    <footer class="job-details__footer mx-10.5 mt-8.25 p-3.25 border border-[#dce2e8]">
                        <p class="job-details__footer-text">If possible, please reference that you found the job on
                            <span class="u-bold">rmtDev</span>, we would really appreciate it!
                        </p>
                    </footer>`;
            jobDetailsContentEl.innerHTML = detail;

        })
        .catch(err => console.error(err)
        )
}
jobListSearchEl.addEventListener('click', clickHandler);
import {
    jobListSearchEl,
    jobDetailsContentEl,
    spinnerJobDetailsEl,
    BASE_API_URL,
    colors
} from "../common.js"
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./jobDetails.js";

const renderJobList = jobItems => {

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
    });
}

const clickHandler = e => {
    e.preventDefault();

    const jobItemEl = e.target.closest('.job-item');

    const badgeColor = jobItemEl.querySelector('.job-item__badge').dataset.badgeColor;

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('jobList');

    const jobId = jobItemEl.children[0].getAttribute('href');

    fetch(`${BASE_API_URL}/jobs/${jobId}`)
        .then(res => {
            if (!res.ok) {
                console.error('failed to fetch job detail');
                return;
            }
            return res.json();
        })
        .then(data => {
            const { jobItem } = data;
            renderSpinner('jobList');

            renderJobDetailsHtml(jobItem, badgeColor);

        })
        .catch(err => console.error(err)
        )
}
jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;
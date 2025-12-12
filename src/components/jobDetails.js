import { jobDetailsContentEl } from '../common.js';

const renderJobDetailsHtml = (jobItem, badgeColor) => {
    const detail = `
                    <img src="../img/image.avif" alt="#"
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
                                <time class="job-info__time text-xs translate-y-px text-[#4d5254]">${jobItem.daysAgo}d</time>
                                <button class="job-info__bookmark-btn cursor-pointer hover:text-[#2671dd]">
                                    <i
                                        class="fa-solid fa-bookmark job-info__bookmark-icon text-[#d7dbe0] [&.bookmark-active]:text-[#2671dd] text-lg hover:text-[#2671dd]"></i>
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

                    <footer class="job-details__footer text-sm mx-10.5 mt-8.25 p-3.25 border border-[#dce2e8]">
                        <p class="job-details__footer-text">If possible, please reference that you found the job on
                            <span class="u-bold">rmtDev</span>, we would really appreciate it!
                        </p>
                    </footer>`;
    jobDetailsContentEl.innerHTML = detail;
};
export default renderJobDetailsHtml;
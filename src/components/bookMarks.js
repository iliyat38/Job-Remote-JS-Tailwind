import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './jobList.js';

const clickHandler = (e) => {

    if (!e.target.className.includes('bookmark')) return;
    state.bookmarkJobItems.push(state.activeJobItem);
    console.log(state.bookmarkJobItems);

    document.querySelector('.job-info__bookmark-icon').classList.toggle('bookmark-active');
};

const mouseEnterHandler = () => {
    jobListBookmarksEl.classList.remove("opacity-0", "scale-90", "invisible", "pointer-events-none");
    jobListBookmarksEl.classList.add("opacity-100", "scale-100", "pointer-events-auto");
}
const mouseLeaveHandler = () => {
    jobListBookmarksEl.classList.add("opacity-0", "scale-90", "invisible", "pointer-events-none");
    jobListBookmarksEl.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
}

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
bookmarksBtnEl.addEventListener('mouseleave', mouseLeaveHandler);
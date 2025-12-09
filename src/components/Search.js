import {
    jobListSearchEl,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    state,
    numberEl,
    colors,
    BASE_API_URL,
    getData,
    paginationBtnNextEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
} from "../common.js"

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./jobList.js";
import renderPagingBtn from "./Pagination.js";

// Search component
const submitHandler = async e => {
    e.preventDefault();

    jobListSearchEl.innerHTML = "";
    //get input search text
    const searchText = searchInputEl.value;

    //reset sorting btn
    sortingBtnRelevantEl.classList.add('sorting__button--active');
    sortingBtnRecentEl.classList.remove('sorting__button--active');

    //validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError("your search may not contain number")
        return;
    }
    searchInputEl.blur();
    state.currentPage = 1;
    renderPagingBtn();
    renderSpinner('search');

    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        //گرفتن jobItems
        const { jobItems } = data;

        //update state
        state.searchJobItems = jobItems;

        renderSpinner('search');

        numberEl.textContent = jobItems.length;

        renderJobList();
        paginationBtnNextEl.classList.remove('invisible');
    } catch (err) {
        renderSpinner('search');
        renderError();
        console.log(err.message);
    }

};

searchFormEl.addEventListener('submit', submitHandler);
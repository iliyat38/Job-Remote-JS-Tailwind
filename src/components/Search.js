import {
    jobListSearchEl,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    numberEl,
    colors,
    BASE_API_URL
} from "../common.js"

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./jobList.js";

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
        renderError("your search may not contain number")
        return;
    }
    searchInputEl.blur();
    renderSpinner('search');

    //fetch data from server
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
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
            renderSpinner('search');
            renderJobList(jobItems);

        })
        .catch(err => console.error(err));

};

searchFormEl.addEventListener('submit', submitHandler);
"use strict";

var _common = require("../common.js");

var storageJobItems = localStorage.getItem('bookmarksJobItems');

if (storageJobItems) {
  _common.state.bookmarkJobItems = JSON.parse(storageJobItems);
} // const storageBadgeColor = localStorage.getItem('badgeColor');
// if (storageBadgeColor) {
//     state.badgeColor = storageBadgeColor;
// }
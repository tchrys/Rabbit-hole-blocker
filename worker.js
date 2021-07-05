let url = location.href;
document.body.addEventListener('click', () => {
    requestAnimationFrame( () => {
     	url = location.href;
     	if (url.includes("watch")) {
    		applySuggestionsOnPageLoaded();
    		applyCommentsOnPageLoaded();
    	}
    });
}, true);

if (url.includes("watch")) {
	applySuggestionsOnPageLoaded();
	applyCommentsOnPageLoaded();
}

window.addEventListener('scroll', applyCommentsOnPageLoaded);


function applySuggestionsOnPageLoaded() {
	chrome.storage.sync.get("suggestionsDisabled", ({ suggestionsDisabled }) => {
		let x = document.getElementById("related");
		if (suggestionsDisabled) {
			if (x) {
				x.style.visibility = 'hidden';
			} else {
				waitUntil(suggestionsNotRendered, () => {
					let suggestionsSection = document.getElementById("related");
					suggestionsSection.style.visibility = "hidden";
				}, 1000);
			}
		} else {
			if (x) {
				x.style.visibility = "visible";
			}
		}
	});
}

function applyCommentsOnPageLoaded() {
	chrome.storage.sync.get("commentsDisabled", ({ commentsDisabled }) => {
		let x = document.getElementById("comments");
		if (x) {
			x.style.visibility = commentsDisabled ? 'hidden' : 'visible';
		}
	});
}

function waitUntil(boolFn, callback, delay) {
    "use strict";
    delay = (typeof (delay) === 'undefined' || isNaN(parseInt(delay, 10))) ? 100 : delay;
    setTimeout(function () {
        (boolFn()) ? waitUntil(boolFn, callback, delay) : callback();
    }, delay);
}

function suggestionsNotRendered() {
	return !document.getElementById("related"); 
}
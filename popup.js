let suggestionsInput = document.getElementById("suggestions");
let commentsInput = document.getElementById("comments");

applySuggestions();
applyComments();


function applySuggestions() {
	chrome.storage.sync.get("suggestionsDisabled", ({ suggestionsDisabled }) => {
		suggestionsInput.checked = suggestionsDisabled;
		let x = document.getElementById("related");
		if (x) {
			x.style.visibility = suggestionsDisabled ? "hidden" : "visible";
		}
	});
}

function applyComments() {
	chrome.storage.sync.get("commentsDisabled", ({ commentsDisabled }) => {
		commentsInput.checked = commentsDisabled;
		let x = document.getElementById("comments");
		if (x) {
			x.style.visibility = commentsDisabled ? "hidden" : "visible";
		}
	});	
}

suggestionsInput.addEventListener("click", onSuggestionChange);
commentsInput.addEventListener("click", onCommentChange);

async function onSuggestionChange() {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: changeSuggestion,
	});
}

async function onCommentChange() {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: changeComments,
	});
}

function changeSuggestion() {
	chrome.storage.sync.get("suggestionsDisabled", ({ suggestionsDisabled }) => {		
		suggestionsDisabled = !suggestionsDisabled;
		chrome.storage.sync.set({ suggestionsDisabled });
		let x = document.getElementById("related");
		if (x) {
			x.style.visibility = suggestionsDisabled ? "hidden" : "visible";
		}
	});
}

function changeComments() {
	chrome.storage.sync.get("commentsDisabled", ({ commentsDisabled }) => {		
		commentsDisabled = !commentsDisabled;
		chrome.storage.sync.set({ commentsDisabled });
		let x = document.getElementById("comments");
		if (x) {
			x.style.visibility = commentsDisabled ? "hidden" : "visible";
		}
	});
}
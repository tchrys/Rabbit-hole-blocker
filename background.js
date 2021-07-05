let suggestionsDisabled = false;
let commentsDisabled = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ suggestionsDisabled });
  chrome.storage.sync.set({ commentsDisabled });
});
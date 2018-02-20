const extensionUrl = chrome.extension.getURL('index.html');

const openExtension = () => {
  chrome.tabs.query({ title: '*Env-Guard*' }, function(tabsArray) {
    if (tabsArray && tabsArray.length > 0) {
      // checks if extension is already open
      chrome.tabs.update(
        tabsArray[0].id,
        { active: true, highlighted: true },
        tab => {
          chrome.windows.update(tab.windowId, { focused: true });
        }
      );
    } else {
      chrome.tabs.create({ url: extensionUrl, selected: true });
    }
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // sends a message to content.js only when the tab finished loading
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, tab);
  }
});

chrome.browserAction.onClicked.addListener(() => {
  openExtension();
});

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    openExtension();
  }
});

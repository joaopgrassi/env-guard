var extensionUrl = chrome.extension.getURL('index.html');

openExtension = function () {
  chrome.tabs.query({ title: '*Env-Guard*' }, function (tabsArray) {
    if (tabsArray && tabsArray.length > 0) {
      // checks if extension is already open
      chrome.tabs.update(tabsArray[0].id, { active: true, highlighted: true }, function (tab) {
        chrome.windows.update(tab.windowId, { focused: true });
      });
    } else {
      chrome.tabs.create({ 'url': extensionUrl, 'selected': true });
    }
  });
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // sends a message to content.js only when Title or Favicon have changed.
  if (changeInfo.title || changeInfo.favIconUrl) {
    chrome.tabs.sendMessage(tabId, changeInfo);
  }
});

chrome.browserAction.onClicked.addListener(function () {
  openExtension();
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    openExtension('install');
  }
});

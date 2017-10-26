var extensionUrl = chrome.extension.getURL('index.html');

openExtension = function () {
  chrome.tabs.query({ title: '*Env-Guard*' }, function (tabsArray) {
    if (tabsArray && tabsArray.length > 0) {
      // if extension is already open  set it as active, preventing from having multiple instances of it.
      chrome.tabs.update(tabsArray[0].id, { active: true, highlighted: true }, function (tab) {
        chrome.windows.update(tab.windowId, { focused: true });
      });
    } else {
      chrome.tabs.create({'url': extensionUrl, 'selected': true});
    }
  });
};

chrome.browserAction.onClicked.addListener(function(tab) {
  openExtension();
});

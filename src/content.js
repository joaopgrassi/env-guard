(function () {

  chrome.storage.sync.get('envGuard', function (storageItems) {
    if (storageItems.envGuard === undefined) {
      return;
    }

    var allRules = storageItems.envGuard;
    var rule = null;
    var applyRules;

    applyRules = function () {
      for (var i = 0; i < allRules.length; i++) {
        switch (allRules[i].operator) {
          case 'Starts with':
            if (location.href.startsWith(allRules[i].url) === true) {
              rule = allRules[i];
            }
            break;
          case 'Ends with':
            if (location.href.endsWith(allRules[i].url) === true) {
              rule = allRules[i];
            }
            break;
          case 'Regex':
            var regexp = new RegExp(allRules[i].url);
            if (regexp.test(location.href) === true) {
              rule = allRules[i];
            }
            break;
          case 'Contains':
            if (location.href.indexOf(allRules[i].url) !== -1) {
              rule = allRules[i];
            }
            break;
          case 'Exact':
            if (location.href === allRules[i].url) {
              rule = allRules[i];
            }
            break;
        }
      }

      // no rule, nothing we can do.
      if (rule === null) {
        return;
      }

      function changeTabIcon(iconPath) {
        var el = document.querySelectorAll('head link[rel*="icon"]');
        var icon = chrome.extension.getURL('/assets/' + iconPath);

        Array.prototype.forEach.call(el, function (node) {
          node.parentNode.removeChild(node);
        });

        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = icon;

        document.getElementsByTagName('head')[0].appendChild(link);
      }

      if (rule.title !== null) {
        if (document.title !== null) {
          document.title = rule.title;
        }
      }

      if (rule.icon !== null) {
        changeTabIcon(rule.icon.path);
      }
    };
    applyRules();
  });
})();

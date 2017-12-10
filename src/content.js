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
          case 'StartsWith':
            if (location.href.startsWith(allRules[i].url) === true) {
              rule = allRules[i];
            }
            break;
          case 'EndsWith':
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

      changeTabTitle(rule);
      changeTabIcon(rule);
      addSiteBanner(rule);

      // register callback for tab changes
      chrome.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
          if (message.title) {
            changeTabTitle(rule);
          } else if (message.favIconUrl) {
            changeTabIcon(rule);
          }
        }
      );
    };

    function changeTabTitle(rule) {
      if (rule.title === null) {
        return;
      }
      document.title = rule.title;
    }

    function changeTabIcon(rule) {
      if (rule.icon === null)
        return;

      var el = document.querySelectorAll('head link[rel*="icon"]');
      var icon = chrome.extension.getURL('/assets/' + rule.icon.path);

      Array.prototype.forEach.call(el, function (node) {
        node.parentNode.removeChild(node);
      });

      var link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = icon;

      document.getElementsByTagName('head')[0].appendChild(link);
    }

    function addSiteBanner(rule) {
      if (!rule.banner) {
        return;
      }

      var envGuardSpan = document.createElement("envGuardSpan");
      envGuardSpan.id = "envGuardSpan";
      envGuardSpan.style.fontSize = "23px";
      envGuardSpan.style.fontWeight = "bold";
      envGuardSpan.textContent = (rule.banner) ? rule.banner.text : "PRODUCTION";
      envGuardSpan.style.color = (rule.banner) ? rule.banner.textColor : "#FFF";
      var elemDiv = document.createElement('div');
      elemDiv.style.width = 'width:100%';
      elemDiv.style.height = 'height:10%';
      elemDiv.style.backgroundColor = (rule.banner) ? rule.banner.bgColor : "#EB1342";
      elemDiv.style.textAlign = 'center';
      elemDiv.appendChild(envGuardSpan);

      window.document.body.insertBefore(elemDiv, window.document.body.firstChild);
    }

    applyRules();
  });
})();

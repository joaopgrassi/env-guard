(() => {
  const rule = null;
  const envGuardBanner = 'envGuardBanner';

  /**
   * Applies the new title to Tab
   * @param rule
   */
  const changeTabTitle = rule => {
    if (!rule.title) {
      return;
    }
    document.title = rule.title;
  };

  /**
   * Applies the new favicon to Tab
   * @param rule
   */
  const changeTabIcon = rule => {
    if (!rule.icon) return;

    const el = document.querySelectorAll('head link[rel*="icon"]');
    const icon = chrome.extension.getURL('/assets/' + rule.icon.path);

    Array.prototype.forEach.call(el, node => {
      node.parentNode.removeChild(node);
    });

    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;

    document.getElementsByTagName('head')[0].appendChild(link);
  };

  /**
   * Adds the Banner to Tab
   * @param rule
   */
  const addSiteBanner = rule => {
    if (!rule.banner) {
      return;
    }
    if (document.getElementById(envGuardBanner)) {
      return;
    }

    const envGuardSpan = document.createElement('span');
    envGuardSpan.style.fontSize = '23px';
    envGuardSpan.style.fontWeight = 'bold';
    envGuardSpan.textContent = rule.banner ? rule.banner.text : 'PRODUCTION';
    envGuardSpan.style.color = rule.banner ? rule.banner.textColor : '#FFF';

    const elemDiv = document.createElement('div');
    elemDiv.id = envGuardBanner;
    elemDiv.style.width = '100%';
    elemDiv.style.height = '40px';
    elemDiv.style.backgroundColor = rule.banner
      ? rule.banner.bgColor
      : '#EB1342';
    elemDiv.style.textAlign = 'center';
    elemDiv.style.position = 'sticky';
    elemDiv.style.top = '0';
    elemDiv.style.left = '0';
    elemDiv.style.zIndex = '9999999999';
    elemDiv.appendChild(envGuardSpan);

    window.document.body.insertBefore(elemDiv, window.document.body.firstChild);
  };

  /**
   * Resets the favicon for sites that doesn't have a favicon itself.
   * After removing or changing a Rule for a site, the env-guard icon remained on chrome due to caching.
   * @param tab
   */
  const resetFavIcon = tab => {
    // if the favIconUrl of the tab contains chrome-extension we need to remove it.
    // This is a left over from the deleted/modified rule
    if (tab.favIconUrl.indexOf('chrome-extension') > -1) {
      const link = document.createElement('link');
      link.rel = 'shortcut icon';
      link.href =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIVBMVEX////+/v7+/v7+/v7+/v7+/v59fX1+fn5/f399fX3w8PHiH3LTAAAACXRSTlMAAgMEBQbExcYkn27pAAAAMElEQVR4AWPAAjghgIORiRUqABXmYGFBEeDiZGNGFeDiZEcRAAGYAAwMsAACYPM7ACxPAgieMjNvAAAAAElFTkSuQmCC';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  chrome.storage.sync.get('envGuard', storageItems => {
    if (storageItems.envGuard === undefined) {
      return;
    }

    const allRules = storageItems.envGuard;

    const applyRules = () => {
      for (let i = 0; i < allRules.length; i++) {
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
            const regexp = new RegExp(allRules[i].url);
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

      // This is unfortunately needed because some sites load faster
      // than the return from storage.sync.get. So, chrome.runtime.onMessage is already executed.
      if (rule) {
        changeTabTitle(rule);
        changeTabIcon(rule);
        addSiteBanner(rule);
      }
    };

    applyRules();
  });

  /**
   * Receives a message from the eventPage.onUpdated.
   * This callback is fired after the tab is loaded.
   */
  chrome.runtime.onMessage.addListener(tab => {
    if (rule) {
      changeTabTitle(rule);
      changeTabIcon(rule);
      addSiteBanner(rule);
    } else {
      resetFavIcon(tab);
    }
  });
})();

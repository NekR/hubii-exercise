var mainCSSLink = document.querySelector('#main-css');

if (supportsPreload(mainCSSLink)) {
  mainCSSLink.addEventListener('load', function loadListener() {
    mainCSSLink.removeEventListener('load', loadListener);
    mainCSSLink.rel = 'stylesheet';
    onLoad();
  });

  return;
}

function supportsPreload(link) {
  try {
    return link.relList.supports('preload');
  } catch (e) {
    return false;
  } finally {
    link = null;
  }
}

loadCSS('/main.css', void 0, void 0, onLoad);

function onLoad() {
  if (typeof window.onCSSLoaded === 'function') {
    onCSSLoaded();
  } else {
    window.onCSSLoaded = true;
  }
}
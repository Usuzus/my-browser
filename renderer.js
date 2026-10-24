const tabsContainer = document.getElementById('tabs-container');
const webviewsContainer = document.getElementById('webviews-container');
const urlbar = document.getElementById('urlbar');
const newTabBtn = document.getElementById('new-tab-btn');
const path = require('path');
let currentZoom = 0;
let tabCount = 0;

// Create a new tab
window.createTab = (url, isIncognito = false) => {
  tabCount++;
  const tabId = `tab-${tabCount}`;
  const webviewId = `webview-${tabCount}`;

  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.id = tabId;
  
  tab.innerHTML = `
    <span class="tab-title">Loading...</span>
    <button class="close-tab" onclick="closeTab('${tabId}', '${webviewId}', event)">×</button>
  `;
  
  tabsContainer.insertBefore(tab, newTabBtn);

  const webview = document.createElement('webview');
  webview.id = webviewId;
  
  // If the URL is a local file (settings.html), load it using file://
  if (url.includes('.html')) {
    webview.src = `file://${__dirname}/${url}`;
  } else {
    webview.src = url || 'https://google.com';
  }
  
  webview.setAttribute('allowpopups', 'true');
  
  if (isIncognito) {
    webview.setAttribute('partition', 'incognito');
  }
  
  webviewsContainer.appendChild(webview);

  webview.addEventListener('did-start-loading', () => {
    if (webview.classList.contains('active')) urlbar.value = webview.src;
  });

  webview.addEventListener('did-navigate', (e) => {
    if (webview.classList.contains('active')) urlbar.value = e.url;
  });

  webview.addEventListener('page-title-updated', (e) => {
    tab.querySelector('.tab-title').innerText = e.title || "New Tab";
  });

  webview.addEventListener('new-window', (e) => {
    createTab(e.url, isIncognito);
  });

  activateTab(tabId, webviewId);
};

// Switch active tab
function activateTab(tabId, webviewId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('webview').forEach(w => w.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  const activeWebview = document.getElementById(webviewId);
  activeWebview.classList.add('active');
  
  // Clean up the URL bar if it's a local file
  let displayUrl = activeWebview.src;
  if (displayUrl.includes('file://')) {
    displayUrl = 'Settings';
  }
  urlbar.value = displayUrl;
}

// Close a tab
window.closeTab = (tabId, webviewId, event) => {
  event.stopPropagation();
  document.getElementById(tabId).remove();
  document.getElementById(webviewId).remove();

  const remainingTabs = document.querySelectorAll('.tab');
  if (remainingTabs.length > 0 && !document.getElementById(tabId)) {
    const lastTab = remainingTabs[remainingTabs.length - 1];
    const lastWebviewId = lastTab.id.replace('tab-', 'webview-');
    activateTab(lastTab.id, lastWebviewId);
  } else if (remainingTabs.length === 0) {
    urlbar.value = '';
  }
};

// Toolbar Controls
document.getElementById('back').onclick = () => { const w = document.querySelector('webview.active'); if (w && w.canGoBack()) w.goBack(); };
document.getElementById('forward').onclick = () => { const w = document.querySelector('webview.active'); if (w && w.canGoForward()) w.goForward(); };
document.getElementById('reload').onclick = () => { const w = document.querySelector('webview.active'); if (w) w.reload(); };

document.getElementById('home').onclick = () => { 
  const homepage = localStorage.getItem('homepage') || 'https://google.com';
  navigateActiveTab(homepage); 
};

document.getElementById('incognito').onclick = () => { 
  createTab('https://google.com', true); 
  document.body.classList.add('incognito'); 
};

document.getElementById('downloads').onclick = () => { createTab('chrome://downloads'); };

document.getElementById('settings').onclick = () => { 
  // Open the local settings.html file
  createTab('settings.html'); 
};

document.getElementById('devtools').onclick = () => { const w = document.querySelector('webview.active'); if (w) w.openDevTools(); };

// Address Bar Search Logic
urlbar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let url = urlbar.value;
    
    // If it's not a URL, search using the selected engine
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      const engine = localStorage.getItem('searchEngine') || 'google';
      
      if (engine === 'duckduckgo') url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
      else if (engine === 'bing') url = 'https://www.bing.com/search?q=' + encodeURIComponent(url);
      else url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    }
    
    const w = document.querySelector('webview.active');
    if (w) w.loadURL(url);
  }
});

newTabBtn.onclick = () => {
  document.body.classList.remove('incognito');
  createTab('https://google.com', false);
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'F12') { e.preventDefault(); document.getElementById('devtools').click(); }
  if (e.ctrlKey && (e.key === '+' || e.key === '=')) { e.preventDefault(); const w = document.querySelector('webview.active'); if (w) { currentZoom += 0.5; w.setZoomLevel(currentZoom); } }
  if (e.ctrlKey && e.key === '-') { e.preventDefault(); const w = document.querySelector('webview.active'); if (w) { currentZoom -= 0.5; w.setZoomLevel(currentZoom); } }
  if (e.ctrlKey && e.key === '0') { e.preventDefault(); currentZoom = 0; const w = document.querySelector('webview.active'); if (w) w.setZoomLevel(0); }
});

// Initialize first tab
createTab('https://google.com');
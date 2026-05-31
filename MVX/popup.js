chrome.runtime.sendMessage({ type: "POPUP_OPENED" });
document.querySelector("#url").innerHTML = `
<pre>Page URL: ${window.location.href}</pre>
`;
document.querySelector("#xid").innerHTML = `
<pre>Extension ID: ${chrome.runtime.id}</pre>
`;
document.querySelector("#opts").addEventListener(
  "click",
  () => chrome.runtime.openOptionsPage());
function openOptionsWithUrl() {
  window.open(chrome.runtime.getURL("options.html"));
}
function openOptionsWithApi() {
  chrome.runtime.openOptionsPage();
}
async function sendFnToActiveTab(fn) {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fn,
  });
}
document.querySelector("#popup-api").addEventListener(
  "click",
  () => openOptionsWithApi());
document.querySelector("#popup-url").addEventListener(
  "click",
  () => openOptionsWithUrl());
document.querySelector("#cs-api").addEventListener(
  "click",
  () => sendFnToActiveTab(openOptionsWithApi));
document.querySelector("#cs-url").addEventListener(
  "click", () => sendFnToActiveTab(openOptionsWithUrl));

console.log("content-script.js");
console.log(window.jQuery);
// document.body.innerHTML = "Hello, world!";
import(chrome.runtime.getURL("fetch-page.js"));
/*
const el = document.createElement("script");
el.src = chrome.runtime.getURL("fetch-page.js");
document.body.appendChild(el);
*/
function initializeCountdown(currentTabId) {
  // This will fire the runtime.onConnect event
  // in the background
  const port = chrome.runtime.connect({
    name: `Tab ${currentTabId}`,
  });
  // Messages sent from the service worker
  port.onMessage.addListener((msg) => {
    console.log(port.name, msg);
    // Keep passing the value to the background while > 0
    if (msg.value > 0) {
      port.postMessage({ value: msg.value });
    }
  });
  // Start a countdown sequence every 1000ms
  setInterval(() => {
    const value = Math.floor(Math.random() * 10) + 1;
    console.log(`New countdown sequence: ${value}`);
    // Send the inital postMessage in the sequence
    port.postMessage({ value });
  }, 1000);
}
// Send a call/response message to the background
// to determine current tab's ID
/*
chrome.runtime.sendMessage(
  // Providing a type allows the background to filter
  // incoming messages
  { type: "getCurrentTabId" },
  // Background can reply to this message with the tab ID
  (response) => initializeCountdown(response.currentTabId)
);
*/
// opening tabs
const root = document.createElement("div");
root.innerHTML = `
<div>
  <button id="direct-open">THIS WILL NOT WORK</button>
  <button id="indirect-open">THIS WILL WORK</button>
</div>
`;
document.body.appendChild(root);
const url = chrome.runtime.getURL("foobar.html");
document.querySelector("#direct-open").addEventListener("click", () => {
  window.open(url);
});
document.querySelector("#indirect-open").addEventListener("click", () => {
  chrome.runtime.sendMessage( {
    type: "openTab",
    url
  });
});

for (const el of document.querySelectorAll("style")) {
  el.parentElement.removeChild(el);
}
for (const el of document.querySelectorAll('link[rel="stylesheet"]')) {
  el.parentElement.removeChild(el);
}
for (const el of document.querySelectorAll("[style]")) {
  el.removeAttribute("style");
}

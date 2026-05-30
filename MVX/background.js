console.log("Initialized background script!");

// Logs when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed background script!");
});
chrome.alarms.create("My alarm", { periodInMinutes: 1 });
// Logs every minute
chrome.alarms.onAlarm.addListener((alarmInfo) => {
  console.log(`Alarm fired: ${alarmInfo.name}`);
});
// Logs when the tab state changes
chrome.tabs.onUpdated.addListener(() => {
  console.log("Tabs updated");
});
// Logs when Ctrl+Shift+J is typed
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});
// Logs when the toolbar icon is clicked
chrome.action.onClicked.addListener(() => {
  console.log("Clicked toolbar icon!");
});
// Messages include information about the sender
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // This handler will fire for all runtime.sendMessage payloads.
  // Use a value in the payload to filter.
  if (request.type === "getCurrentTabId") {
    // Send the tab's ID back to the content script
    sendResponse({ currentTabId: sender.tab.id });
  }
});
// This will fire when the content script
// calls runtime.connect()
chrome.runtime.onConnect.addListener((port) => {
  console.log(`Connected to ${port.name}`);
  // Messages sent from the content script
  port.onMessage.addListener((msg) => {
    console.log(port.name, msg);
    // Subtract 1 and send value back up to content script
    port.postMessage({ value: msg.value - 1 });
  });
});
// import "./fetch-page.js";
// console.log("Imported fetch-page.js");
// throw new Error("foo");
let elapsed = 0;
setInterval(() => console.log(`${++elapsed}s`), 1000);

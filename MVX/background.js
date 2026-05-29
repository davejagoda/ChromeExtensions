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

// import "./fetch-page.js";
// console.log("Imported fetch-page.js");
// throw new Error("foo");
let elapsed = 0;
setInterval(() => console.log(`${++elapsed}s`), 1000);

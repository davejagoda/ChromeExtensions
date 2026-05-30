console.log("Initialized background script!");
console.log("This will run each time the service worker starts");
const filter = {
  url: [
    {
      urlMatches: "https://blank.org/",
    },
  ],
};

function wipeOutPage() {
  document.body.innerHTML = "";
}

let lifeline;
// Disconnect and reconnect
function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}
async function keepAlive() {
  if (lifeline) {
    return;
  }
  // Locate any eligible tab and connect to it
  for (const tab of await chrome.tabs.query({})) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({
          name: "KEEPALIVE"
        }),
      });
      return;
    } catch (e) {}
  }
}

// Logs when the extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Installed background script!");
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      console.log("This runs when the extension is newly installed.");
      break;
    case chrome.runtime.OnInstalledReason.CHROME_UPDATE:
      console.log("This runs when a chrome update installs.");
      break;
    case chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE:
      console.log("This runs when a shared module update installs.");
      break;
    case chrome.runtime.OnInstalledReason.UPDATE:
      console.log("This runs when an extension update installs.");
      break;
    default:
      console.log(`This runs when ${details.reason}`);
      break;
  }
});
chrome.alarms.create("My alarm", { periodInMinutes: 1 });
// Logs every minute
chrome.alarms.onAlarm.addListener((alarmInfo) => {
  console.log(`Alarm fired: ${alarmInfo.name}`);
});
// Logs when the tab state changes
// Any tab change means reconnecting may be required
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  console.log("Tabs updated");
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
});
// Logs when Ctrl+Shift+J is typed
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});
// Logs when the toolbar icon is clicked
chrome.action.onClicked.addListener((tab) => {
  console.log("Clicked toolbar icon!");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: wipeOutPage,
  });
});
// Messages include information about the sender
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // This handler will fire for all runtime.sendMessage payloads.
  // Use a value in the payload to filter.
  if (request.type === "getCurrentTabId") {
    // Send the tab's ID back to the content script
    sendResponse({ currentTabId: sender.tab.id });
  }
  if (request.type === "openTab") {
    chrome.tabs.create({ url: request.url });
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
  if (port.name == "KEEPALIVE") {
    lifeline = port;
    // Refresh the connection after 1 minute
    setTimeout(keepAliveForced, 6e4);
    port.onDisconnect.addListener(keepAliveForced);
  }
});
// Sniffing Web Traffic
chrome.webNavigation.onCompleted.addListener(() => {
  console.log("Visited the special site!");
}, filter);
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  console.log(`Loaded ${details.url}!`);
});
// import "./fetch-page.js";
// console.log("Imported fetch-page.js");
// throw new Error("foo");
keepAlive();
let elapsed = 0;
setInterval(() => console.log(`Elapsed ${++elapsed}s`), 1000);

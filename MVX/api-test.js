export default function () {
  // You will only see this method present if
  // the script has access to the WebExtensions API
  console.log("Can access API:", !!chrome.runtime.getURL);
}

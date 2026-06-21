const permissions = {
  permissions: ["storage"],
};
document.querySelector("#save").addEventListener(
  "click",
  async () => {
    chrome.permissions.getAll().then(console.log);
    await chrome.permissions.request(permissions);
    chrome.storage.sync.set({ foo: "bar" });
    chrome.permissions.getAll().then(console.log);
  });

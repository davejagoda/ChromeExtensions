chrome.storage.sync.set({ foo: "bar" });
chrome.permissions.getAll().then(console.log);

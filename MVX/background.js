chrome.webNavigation.onCommitted.addListener((event) => {
// browser natively performing this filtering is more performant
  console.log("Event filtered outside of handler!");
}, {
  url: [
    { hostSuffix: "wikipedia.org" }
  ]
});

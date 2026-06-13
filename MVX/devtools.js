// Use this script to access the Devtools API
chrome.devtools.panels.create(
  "Demo Devtools",
  "",
  "foo_panel.html");
chrome.devtools.panels.sources.createSidebarPane(
  "Demo Sources Sidebar",
  (sidebar) => {
    sidebar.setPage("sources_sidebar.html");
  }
);
chrome.devtools.panels.elements.createSidebarPane(
  "Demo Elements Sidebar",
  (sidebar) => {
    sidebar.setPage("elements_sidebar.html");
  }
);
chrome.devtools.panels.create(
  "Devtools Traffic",
  "",
  "traffic_panel.html");

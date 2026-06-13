document.querySelector("#check").addEventListener("click", () => {
  chrome.devtools.inspectedWindow.eval(
    `(() => {
     const url = window.location.href;
     const usesJquery = !!window.jQuery;
     return { url, usesJquery };
   })()`,
    null,
    (result) => {
      const div = document.createElement("div");
      div.innerText = `${result.url} uses jQuery: ${result.usesJquery}`;
      document.body.appendChild(div);
    }
  );
});
document.querySelector("#inspect").addEventListener("click", () => {
  chrome.devtools.inspectedWindow.eval(
    `inspect(document.querySelector('img'))`
  );
});
document.querySelector("#tagname").addEventListener("click",
  () => {
    chrome.devtools.inspectedWindow.eval(
      `$0?.tagName`,
      null,
      (result) => {
        const div = document.createElement("div");
        div.innerText = result;
        document.body.appendChild(div);
      });
  }
);

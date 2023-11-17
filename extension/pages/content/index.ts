// We must import this here to take advantage of vite for compilation
// because we lose urls when running code in contentView
// import "./styles.scss";

const container = document.createElement("div");
document.body.appendChild(container);

const root = document.createElement("div");
root.id = "twitter-memorial-body";
// const shadowDOM =
//   container.attachShadow?.({
//     mode: process.env.NODE_ENV === "development" ? "open" : "closed",
//   }) || container;

// const styleEl = document.createElement("link");
// styleEl.setAttribute("rel", "stylesheet");
// styleEl.setAttribute(
//   "href",
//   chrome.runtime.getURL("src/pages/styles/index.css")
// );
// document.appendChild(styleEl);

// replace all things on page

// Modified from https://github.com/tarngerine/web3-to-butt/blob/main/web3-to-butt/content_script.js

// For static pages, walk once
walk(document.body);

// For dynamic apps, like Twitter, observe all DOM mutations henceforth within document body
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    walk(mutation.target);
  });
});
observer.observe(document.body, { subtree: true, childList: true });

function walk(node: any) {
  // Function from here: http://is.gd/mwZp7E
  // Don't replace user-editable content
  const tagName = node.tagName ? node.tagName.toLowerCase() : "";
  if (
    tagName == "input" ||
    tagName == "textarea" ||
    isInsideContentEditable(node)
  ) {
    return;
  }

  let child, next;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode: any) {
  let v = textNode.nodeValue;

  // We try to make it sound as natural as it can
  v = v.replace(/\bX\b/g, "Twitter");
  v = v.replace(/\bX\.com\b/g, "twitter.com");
  const level = 1;
  if (level > 1) {
    v = v.replace(/\bex\b/g, "twitter");
    v = v.replace(/\bex-/g, "twitter-");
    v = v.replace(/\bx\b/g, "twitter");
    v = v.replace(/\bx-/g, "twitter-");
  }

  textNode.nodeValue = v;
}

function isInsideContentEditable(node: any) {
  while (node.parentNode) {
    if (node.contentEditable === "true") {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

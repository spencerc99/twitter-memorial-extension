import { createRoot } from "react-dom/client";
import Popup from "@src/pages/popup/Popup";

function init() {
  const appContainer = document.querySelector("#tiny-internets-body");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }

  // const styleEl = document.createElement("link");
  // styleEl.setAttribute("rel", "stylesheet");
  // styleEl.setAttribute(
  //   "href",
  //   chrome.runtime.getURL("src/pages/styles/index.css")
  // );
  // document.body.appendChild(styleEl);
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();

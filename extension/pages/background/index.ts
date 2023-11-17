function makeAsyncListener(
  sendResponse: (response?: any) => void,
  callback: () => Promise<any>
): true {
  callback().then(sendResponse);
  return true;
}

// // NOTE: chrome runtime does not support async 🙄
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
//   makeAsyncListener(sendResponse, async () => {
//     console.log(message);
//     if (message.msg === GET_HISTORY_MESSAGE) {
//       const visits = await chrome.history.getVisits({
//         url: message.url,
//       });
//       return visits;
//     }
//   })
// );

// NOTE: chrome runtime does not support async 🙄
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("HANDLING MESSAGE", message);
//   if (message.msg === GET_HISTORY_MESSAGE) {
//     chrome.history
//       .getVisits({
//         url: message.url,
//       })
//       .then((visits) => sendResponse(visits));
//   }
//   if (message.msg === GET_CURRENT_WINDOW_TABS_MESSAGE) {
//     chrome.tabs.query({ currentWindow: true }).then((tabs) => {
//       sendResponse(
//         tabs.filter((t) => t.url !== undefined).map<string>((t) => t.url)
//       );
//     });
//   }
//   // have to return true to keep the port open
//   return true;
// });

// console.log("loading listners");
// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//   console.log("IN BEFORE NAVIGATE", details);
//   chrome.storage.sync.get(StorageSettingsKey, (settingsRaw) => {
//     console.log(settingsRaw);
//     const settings = settingsRaw as UserSettings;
//     if (!settings) {
//       return;
//     }
//     const { commuting } = settings;
//     if (!commuting?.enabled) {
//       return;
//     }

//     const { url, tabId } = details;
//     // TODO: fill this in properly
//     // after some time period synced in the extension
//     // and also ignore sites that are in the blocklist
//     const eligible = !url.startsWith("chrome://");
//     if (!eligible) {
//       return;
//     }

//     const alleyLocation = withQueryParams(
//       chrome.runtime.getURL("src/pages/commuting/index.html"),
//       {
//         url,
//       }
//     );

//     console.log("updating ", tabId, " to ", alleyLocation);

//     chrome.tabs.update(tabId, { url: alleyLocation }, function (tab) {
//       if (chrome.runtime.lastError) {
//         if (
//           (chrome.runtime.lastError.message || "").indexOf("No tab with id:") >
//           -1
//         ) {
//           //Chrome is probably loading a page in a tab which it is expecting to
//           //  swap out with a current tab.  Need to decide how to handle this
//           //  case.
//           //For now just output the error message
//           console.log("Error:", chrome.runtime.lastError.message);
//         } else {
//           console.log("Error:", chrome.runtime.lastError.message);
//         }
//       }
//     });
//   });
// });

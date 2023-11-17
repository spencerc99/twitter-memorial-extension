import packageJson from "../package.json";
import { ManifestType } from "@src/manifest-type";

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.displayName,
  version: packageJson.version,
  description: packageJson.description,
  options_page: "extension/pages/options/index.html",
  background: {
    service_worker: "extension/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "extension/pages/popup/index.html",
    default_icon: "twitter-tombstone.png",
  },
  // chrome_url_overrides: {
  //   newtab: "extension/pages/newtab/index.html",
  // },
  icons: {
    "128": "twitter-tombstone.png",
  },
  content_scripts: [
    {
      matches: ["*://*/*"],
      js: ["extension/pages/content/index.js"],
      // css: ["extension/pages/styles/index.css"],
    },
  ],
  // devtools_page: "extension/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/jsx-runtime.*.js",
        "assets/*.*.js",
        "extension/pages/contentView/index.js",
        "extension/pages/styles/index.css",
        "*.png",
      ],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage", "activeTab"],
};

export default manifest;

const sites = [
  {
    name: "Zionism Observer",
    buttonText: "Archive Quote",
    formUrl: "https://zionism.observer/archive",
    urlParam: "source",
    textParam: "quote",
  },
  {
    name: "Palestine Love",
    buttonText: "Contribute Resource",
    formUrl: "https://palestinelove.org/contribute",
    urlParam: "url",
    textParam: "description",
  },
];

const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs != null && tabs.length > 0) {
        resolve(tabs[0]);
      } else {
        reject();
      }
    });
  });
};

const createTab = (options) => {
  return new Promise((resolve) => {
    chrome.tabs.create(options, resolve);
  });
};

const getFormUrl = async (formUrl, urlParam) => {
  const activeTab = await getActiveTab();
  const currentUrl = activeTab.url;

  return `${formUrl}?${urlParam}=${currentUrl}`;
};

const createButton = (site) => {
  const buttonContainer = document.getElementById("button-container");
  const siteElement = document.createElement("div");
  siteElement.innerHTML = `
    <h3>${site.name}</h3>
    <button>${site.buttonText}</button>
  `;
  buttonContainer.appendChild(siteElement);

  siteElement.addEventListener("click", async () => {
    const url = await getFormUrl(site.formUrl, site.urlParam, site.textParam);
    createTab({ url });
  });
};

const initializeButtons = () => {
  sites.forEach(createButton);
};

const initializeSwitch = () => {
  const popoverSwitch = document.getElementById("popoverSwitch");

  chrome.storage.sync.get("runContentScript", (data) => {
    popoverSwitch.checked = data.runContentScript || false;
  });

  popoverSwitch.addEventListener("change", () => {
    const isChecked = popoverSwitch.checked;
    chrome.storage.sync.set({ runContentScript: isChecked });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeButtons();
  initializeSwitch();
});

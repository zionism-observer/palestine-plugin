// TODO: Switch to Typescript
const sites = [
  {
    name: "Zionism Observer",
    buttonText: "Archive a quote",
    formUrl: "https://zionism.observer/archive",
    urlParam: "source",
    textParam: "quote",
  },
  {
    name: "Palestine Love",
    buttonText: "Contribute a resource",
    formUrl: "https://palestinelove.org/contribute",
    urlParam: "url",
    textParam: "description",
  },
];

const getActiveTab = () => {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      if (tabs != null && 0 < tabs.length) {
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

const buttonContainer = document.getElementById("button-container");
sites.forEach((site) => {
  const siteElement = document.createElement("div");

  siteElement.innerHTML = `
  <h3>${site.name}</h3>
  <button>${site.buttonText}</button>
  `;
  buttonContainer.appendChild(siteElement);
  siteElement.addEventListener("click", async () => {
    getFormUrl(site.formUrl, site.urlParam, site.textParam).then((url) =>
      createTab({ url })
    );
  });
});

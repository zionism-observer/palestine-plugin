const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

const getFormUrl = async (formUrl: string, urlParam: string) => {
  const activeTab = await getActiveTab();
  const currentUrl = activeTab.url;

  return `${formUrl}?${urlParam}=${currentUrl}`;
};

const createTab = (options: { url: string }) => {
  return new Promise((resolve) => {
    chrome.tabs.create(options, resolve);
  });
};

const setupSiteBtn = (site: ISite) => {
  const siteName = document.createElement("h3");
  siteName.innerText = site.name;

  const siteBtn = document.createElement("button");
  siteBtn.innerText = site.buttonText;
  siteBtn.addEventListener("click", async () => {
    const url = await getFormUrl(site.formUrl, site.urlParam);
    await createTab({ url });
  });

  const siteContainer = document.createElement("div");
  siteContainer.appendChild(siteName);
  siteContainer.appendChild(siteBtn);

  return siteContainer;
};

export const setupButtonContainer = (
  buttonContainer: HTMLDivElement,
  sites: ISite[],
) => {
  sites.forEach((site) => {
    const siteElement = setupSiteBtn(site);
    buttonContainer.appendChild(siteElement);
  });
};

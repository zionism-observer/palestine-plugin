// TODO: Switch to Typescript
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

const openArchive = async () => {
  const activeTab = await getActiveTab();
  console.log("activeTab", activeTab);

  const currentUrl = activeTab.url;
  await createTab({
    url: "https://zionism.observer/archive?source=" + currentUrl,
  });
};

const openPalestineLove = async () => {
  await createTab({
    url: "https://palestinelove.org/api/v1/websites/archival",
  });
};

document
  .getElementById("redirectButton")
  .addEventListener("click", openArchive);

document
  .getElementById("learnMoreButton")
  .addEventListener("click", openPalestineLove);

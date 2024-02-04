function handleContextMenuClick(info) {
  const selection = info.selectionText.trim();

  if (selection !== "") {
    console.log("Selected text:", selection);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Zionism Observer",
    contexts: ["selection"],
    id: "contextMenuId",
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "contextMenuId") {
    handleContextMenuClick(info);
  }
});

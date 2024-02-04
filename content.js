let textSelectionBtn = null;

document.addEventListener("click", function (event) {
  if (chrome.runtime?.id) {
    chrome.storage.sync.get("runContentScript", function (data) {
      if (!data.runContentScript) {
        return;
      }

      const selection = window.getSelection().toString().trim();

      if (selection !== "") {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const posX = rect.left + window.scrollX + rect.width / 2 - 55;
        const posY = rect.top + window.scrollY - 50;

        if (textSelectionBtn === null) {
          const buttonHTML = `
          <div id="shareSnippet" style="position: absolute; top: ${posY}px; left: ${posX}px;">
            <button id="textSelectionBtn"><img src="https://zionism.observer/favicon-32x32.png" alt="Icon Image"></button>
          </div>`;

          document.body.insertAdjacentHTML("beforeend", buttonHTML);
          textSelectionBtn = document.getElementById("textSelectionBtn");

          textSelectionBtn.addEventListener("click", handleButtonClick);
        } else {
          textSelectionBtn.parentElement.style.top = `${posY}px`;
          textSelectionBtn.parentElement.style.left = `${posX}px`;
        }
      } else {
        removeButton();
      }
    });
  }
});

const handleButtonClick = function (event) {
  event.stopPropagation();
  const selection = window.getSelection().toString().trim();

  console.log("🍉", selection);

  removeButton();
};

const removeButton = function () {
  if (textSelectionBtn !== null) {
    textSelectionBtn.parentElement.remove();
    textSelectionBtn = null;
  }
};

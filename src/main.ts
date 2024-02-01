import "./style.css";
import { setupButtonContainer } from "./script.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Palestine Plugin 🍉</h1>
    <div id='button-container'>
    </div>
  </div>
`;

const sites: ISite[] = [
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

setupButtonContainer(
  document.querySelector<HTMLDivElement>("#button-container")!,
  sites,
);

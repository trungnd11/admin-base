/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const templateUrl = "https://dev-ewallet.vetc.com.vn/e-admin";
const xApiKey = "44129c31-49d4-458b-8793-d912d354289e";
const contentElement = document.getElementById("content");

function parseHTML(html) {
  const t = document.createElement("template");
  t.innerHTML = html;
  return t.content;
};

axios.defaults.headers = {
  "x-api-key": xApiKey
};

(async function fetchBodyContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const idContent = urlParams.get("id");
  if (idContent) {
    const reqBody = { id: idContent };
    try {
      contentElement.innerText = "Đang tải page...";
      const { data: { data } } = await axios.post(`${templateUrl}/i/page/getById`, reqBody);
      const bodyElemnt = parseHTML(data.content);
      contentElement.innerText = "";
      bodyElemnt
        ? contentElement.appendChild(bodyElemnt)
        : (contentElement.innerText = "Page không tồn tại");
      document.title = data.title;
    } catch (error) {
      contentElement.innerText = "Page không tồn tại";
    };
  }
})();

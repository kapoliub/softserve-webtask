const NEWS_URL = "http://localhost:8080/news";
const STORAGE_NEWS_KEY = "news";

function renderNews() {
  const container = document.querySelector(".news-wrapper");
  getData(NEWS_URL)
    .then(
      (res) =>
        (container.innerHTML = res
          .map(
            ({ image, text, title }) =>
              `
    <div class="news-card">
        <div class="img-wrapper">
        <img src="${image}" alt="news_img" />
        </div>
        <div class="description">
        <h3>${title}</h3>
        <p>${text}</p>
        </div>
    </div>
    `
          )
          .reverse()
          .join(""))
    )
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem(STORAGE_NEWS_KEY) && isOnline()) {
    sendDataFromLocalStorage(NEWS_URL, STORAGE_NEWS_KEY);
    location.reload();
  }
  renderNews();
});

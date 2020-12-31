const addPostButton = document.querySelector("#addPost");
const postInput = document.querySelector("#postInput");
const nicknameInput = document.querySelector("#nickname");

const URI = "http://localhost:8080/posts";
const STORAGE_KEY = "post";

function renderPosts() {
  const container = document.querySelector("#mainContent");
  getData(URI)
    .then(
      (res) =>
        (container.innerHTML = res
          .map(
            ({ author, date, text }) =>
              `
              <div class="comment-block">
                <p class="comment-text">
                  ${text}
                </p>
                <div class="comment-info">
                  <span class="date">${moment(date).format(
                    "DD/MM/YYYY, HH:mm:ss"
                  )}</span>
                  <span class="nickname">${author}</span>
                </div>
              </div>
            `
          )
          .join(""))
    )
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem(STORAGE_KEY) && isOnline()) {
    sendDataFromLocalStorage(URI, STORAGE_KEY);
    location.reload();
  }
  renderPosts();
});

addPostButton.addEventListener("click", () => {
  if (localStorage.getItem(STORAGE_KEY) && isOnline()) {
    sendDataFromLocalStorage(URI, STORAGE_KEY);
  }

  const check = checkInputs([nicknameInput, postInput]);

  if (check) {
    const data = {
      author: nicknameInput.value.trim(),
      text: postInput.value.trim(),
      date: Date.now(),
    };
    if (isOnline()) {
      sendData(URI, data).then(renderPosts);
    } else {
      setLocalStorage(data);
    }
    nicknameInput.value = "";
    postInput.value = "";
  }
});

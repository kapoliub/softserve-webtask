const addPostButton = document.querySelector("#addPost");
const postInput = document.querySelector("#postInput");
const nicknameInput = document.querySelector("#nickname");

const URI = "http://localhost:8080/posts";

async function createPost(data = {}) {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function getAllPosts() {
  const response = await fetch(URI);
  return await response.json();
}

const renderPosts = () => {
  const content = document.querySelector("#mainContent");
  getAllPosts()
    .then(
      (res) =>
        (content.innerHTML = res
          .map(
            ({ author, date, text }) =>
              {console.log(date);
                return (`
      <div class="comment-block">
          <p class="comment-text">
            ${text}
          </p>
          <div class="comment-info">
            <span class="date">${date}</span>
            <span class="nickname">${author}</span>
          </div>
        </div>
      `)}
          )
          .join(""))
    )
    .catch((err) => console.error(err));
};

const inputsCheck = () => {
  if (!nicknameInput.value.trim().length) {
    nickname.classList.add("error-input");
    return false;
  }
  if (!postInput.value.trim().length) {
    postInput.classList.add("error-input");
    return false;
  } else {
    nicknameInput.classList.remove("error-input");
    postInput.classList.remove("error-input");
    return true;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});

addPostButton.addEventListener("click", () => {
  const check = inputsCheck();
  if (check) {
    const data = {
      author: nicknameInput.value.trim(),
      text: postInput.value.trim(),
      date: Date.now(),
    };
    createPost(data).then(renderPosts);

    nicknameInput.value = "";
    postInput.value = "";
  }
});

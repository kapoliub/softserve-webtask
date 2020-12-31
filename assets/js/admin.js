const LOGIN_URL = "http://localhost:8080/login";
const NEWS_URL = "http://localhost:8080/news";
const STORAGE_LOGGED_KEY = "loggedIn";
const STORAGE_NEWS_KEY = "news";
const DEFAULT_IMG_SRC = "../assets/img/placeholder.jpg";

const mailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const contentContainer = document.querySelector("#content");

function renderContent() {
  contentContainer.innerHTML = `
  <div class="add-image-block">
      <div class="new-image">
          <img src="../assets/img/placeholder.jpg" alt="new_img">
      </div>

<label class='addButton'>
Add image
<input type="file" name="img" id='uploadPhoto' accept="image/*" accept='image/*'/>

</label>
  </div>
  <div class="add-text-block">
      <div class="title-text-block">
          <input type="text" name="title" id="titleInput" placeholder="News title">
          <textarea name="newsText" id="newsTextInput" placeholder="News text"></textarea>
      </div>
      <button class="addButton" id="addNews">Add news</button>
  </div>
  `;
}
function renderLogForm() {
  contentContainer.innerHTML = `
  <div class="login-form">
    <input type="email" name="email" id="emailInput" placeholder="Email">
    <input type="password" name="password" id="passwordInput" placeholder="Password">
    <button id="loginButton">Log in</button>
  </div>
  `;
}
function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      document.querySelector(".new-image img").src = e.target.result;
    });

    FR.readAsDataURL(this.files[0]);
  }
}

function checkImage() {
  const img = document.querySelector(".new-image img");
  if (img.src.slice(0, 4) === "data") {
    img.classList.remove("error-img");
    return true;
  } else {
    img.classList.add("error-img");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (JSON.parse(localStorage.getItem(STORAGE_LOGGED_KEY))) {
    renderContent();
    const addNewsButton = document.querySelector("#addNews");
    const addImageButton = document.querySelector("#uploadPhoto");
    const titleInput = document.querySelector("#titleInput");
    const textInput = document.querySelector("#newsTextInput");

    addImageButton.addEventListener("change", readFile);
    addNewsButton.addEventListener("click", () => {
      const check = checkInputs([titleInput, textInput]);
      const image = document.querySelector(".new-image img");
      if (checkImage() && check) {
        const data = {
          image: image.src,
          title: titleInput.value.trim(),
          text: textInput.value.trim(),
        };
        if (isOnline()) {
          sendData(NEWS_URL, data);
        } else {
          setLocalStorage(data);
        }
        titleInput.value = "";
        textInput.value = "";
        image.src = DEFAULT_IMG_SRC;
      }
    });
  }
});

loginButton.addEventListener("click", () => {
  sendData(LOGIN_URL, { mail: mailInput.value, password: passwordInput.value })
    .then((res) => {
      localStorage.setItem(STORAGE_LOGGED_KEY, `${res}`);
      res ? renderContent() : alert("Wrong credentials");
    })
    .catch((err) => console.error(err));
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_LOGGED_KEY);
  renderLogForm();
  location.reload();
});

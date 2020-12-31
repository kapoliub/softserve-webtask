function isOnline() {
  return window.navigator.onLine;
}

function sendDataFromLocalStorage(url, key) {
  const data = JSON.parse(localStorage.getItem(key));
  sendData(url, data);
  localStorage.removeItem(key);
}

async function getData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function sendData(url, data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

const checkInputs = (inputsArray) => {
  let count = 0;
  inputsArray.forEach((input) => {
    if (!input.value.trim().length) {
      input.classList.add("error-input");
      count++;
    } else {
      input.classList.remove("error-input");
    }
  });
  return count ? false : true;
};

function setLocalStorage(data) {
  if (localStorage.getItem(STORAGE_KEY)) {
    if (confirm("Unsent data will be overwritten!!!")) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      alert(`Your data will be sent asap`);
      return;
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert(`Your data will be sent asap`);
  }
}

async function create() {
  return await fetch("http://localhost:8080/users").then((res) => res.json());
}

async function createPost(data = {}) {
  const url = "http://localhost:8080/posts"
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

const post = {
  text: "asd",
  date: Date.now(),
  author: "Liubomyr",
};
document.querySelector("#addNews").addEventListener("click", async () => {
  // axios.get('http://localhost:8080/users').then(resp=>console.log(resp.data))
  // create().then(res=>console.log(res))
  // console.log(Date.now())
});

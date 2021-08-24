const APIURL = "https://api.github.com/users/";
const main = document.querySelector(".main");
const form = document.querySelector("form");
const input = document.querySelector(".input");
async function searchProfile() {
  try {
    const search = input.value;
    let result = await fetch(APIURL + search);
    console.log(result.status);
    if (result.status === 404) throw new Error("User Not found");
    result = await result.json();
    input.value = "";
    console.log("search", result);
    addCard(result);
    await getrepos(result.login);
  } catch (err) {
    main.innerHTML = "";
    const error = document.createElement("h1");
    error.classList.add("error");
    error.textContent = "User Not Found";
    main.insertAdjacentElement("afterbegin", error);
  }
}

async function getrepos(username) {
  const repo = await fetch(APIURL + username + "/repos");
  const Data = await repo.json();
  console.log(Data);
  addrepose(Data);
}
function addrepose(Data) {
  const repos = document.getElementById("repos");
  Data.forEach((repo) => {
    console.log(repo);
    const repoel = document.createElement("a");
    repoel.classList.add("repolink");
    repoel.href = repo.html_url;
    repoel.target = "_blank";
    repoel.innerText = repo.name;
    repos.appendChild(repoel);
  });
  main.classList.remove("hidden");
}
function addCard(result) {
  main.innerHTML = "";
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<img class="profilepic" src=${result.avatar_url}>
    <div class="details">
    <h2>${result.login}</h2>
    <h3>${result.bio === null ? "" : result.bio}</h3>

    <ul class="followers">
    <li class="list">${result.followers}<span>Followers</span></li>
    <li class="list">${result.following}<span>Following</span></li>
    <li class="list">${result.public_repos}<span>Repository</span></li>
    </ul>
    <ul class="repos" id="repos"></ul>
    </div>

  `;
  main.insertAdjacentElement("afterbegin", card);
}
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  await searchProfile();
  console.log("hello");
});

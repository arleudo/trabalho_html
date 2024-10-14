let books = [];
let searchRent = document.getElementById("searchRent");
let searchRentUser = document.getElementById("searchRentUser");
let users = [];
let chosedUser = {};
let rents = [];

const chosed = document.getElementById("chosed");
chosed.disabled = true;

async function getNameFromId() {
  await loadUsers();
  const chosenSelect = document.getElementById("chosenSelect");
  chosenSelect.disabled = true;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const user = users.find((u) => u.id == id);

  if (user) {
    chosenSelect.value = user.name;
  } else {
    openDialogRent();
  }
}

searchRent.addEventListener("input", function () {
  if (searchRent.value.length >= 3) {
    const searchValue = searchRent.value.toLowerCase();
    const newBooks = books.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.author.toLowerCase().includes(searchValue)
    );
    updateBookCards(newBooks);
  } else {
    updateBookCards(books);
  }
});

searchRentUser.addEventListener("input", function () {
  if (searchRentUser.value.length >= 3) {
    const searchValue = searchRentUser.value.toLowerCase();
    const newusers = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.cpf.toLowerCase().includes(searchValue)
    );
    if (newusers.length) {
      chosedUser = newusers[0];
      chosed.value = chosedUser.name;
    }
  } else {
    chosedUser = null;
    chosed.value = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  loadCards();
  getNameFromId();
});

function updateBookCards(array) {
  const rentContainer = document.querySelector(".rent-container");
  rentContainer.innerHTML = "";

  array.forEach((book) => {
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");
      card.setAttribute("onclick", "showDetails('" + book.id + "')");

      card.innerHTML = `
      <img src="${book.url}">
      <div class="card-content">
          <h4>${book.name}</h4>
          <p>${book.author}</p>
      </div>
      <button onclick="rentBook(event, ${book.id})">Adicionar</button>
    `;
      rentContainer.appendChild(card);
    }
  });
}

function loadCards() {
  fetch("../actions/loadBooks.php")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      updateBookCards(books);
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
}

async function loadUsers() {
  users = await (await fetch("../actions/loadUsers.php")).json();
}

function rentBook(event, id) {
  event.stopPropagation();
  const book = books.find((b) => b.id == id);

  if (book) {
    addToBag(JSON.stringify(book));
  }
}

function showDetails(id) {
  const book = books.find((b) => b.id == id);

  if (book) {
    const col_left = document.getElementById("col-left");
    col_left.innerHTML = "";

    const img = document.createElement("img");
    img.setAttribute("src", book.url);
    img.setAttribute("width", "400px");
    img.setAttribute("heigth", "auto");
    col_left.appendChild(img);

    let name_book = document.getElementById("name_book");
    name_book.value = book.name;
    let author_book = document.getElementById("author_book");
    author_book.value = book.author;
    let theme_book = document.getElementById("theme_book");
    theme_book.value = book.theme;
    let sinopse_book = document.getElementById("sinopse_book");
    sinopse_book.value = book.sinopse;

    openDialogDetails(id);
  }
}

function openDialogRent() {
  document.getElementById("dialogRent").style.display = "flex";
}

function openDialogDetails(id) {
  console.log("Abrindo os detalhes do livro " + id);

  document.getElementById("dialog_details").style.display = "flex";
}

function closeDialogRent() {
  document.getElementById("dialogRent").style.display = "none";
}

function closeDialogDetails() {
  document.getElementById("dialog_details").style.display = "none";
}

function setUser() {
  window.location.href = "rent.php?id=" + chosedUser.id;
}

function cancelSetUser() {
  window.location.href = "main.php";
}

function updateBagIcon(value) {
  console.log(value);
}

async function rent() {  
  let rent = {};

  rent = { id: rents.length + 1, id_user: 1, id_book: 1 };
  const resp = await executePost("../actions/saveRent.php", rent);
  if (resp) {
    rents.push(rent);
    console.log(resp);
  }
  else{
    console.log("erro");
  }
}

async function executePost(action, data) {
  const resp = await fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return resp.json();
}

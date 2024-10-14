let books = [];
let searchRent = document.getElementById("searchRent");
let searchRentUser = document.getElementById("searchRentUser");
let users = [];
let chosedUser = {};

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
      card.setAttribute("onclick", "rentBook('" + book.id + "')");

      card.innerHTML = `
      <img src="${book.url}">
      <div class="card-content">
          <p><strong>${book.name}</strong></p>
          <p>${book.author}</p>
          <p>${book.theme}</p>
          <p>${book.sinopse}</p>
      </div>
      <button>Adicionar</button>
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

function rentBook(id) {
  const book = books.find((b) => b.id == id);

  if (book) {
    addToBag(JSON.stringify(book));
  }
}

function openDialogRent() {
  document.getElementById("dialogRent").style.display = "flex";
}

function closeDialogRent() {
  document.getElementById("dialogRent").style.display = "none";
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

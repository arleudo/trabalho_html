let books = [];
let searchRent = document.getElementById("searchRent");
let rents = [];

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

document.addEventListener("DOMContentLoaded", function () {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email == "admin@admin.com") {
    window.location.href = "main.php";
  }
  loadCards();
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

  if (!array.length) {
    rentContainer.innerHTML = "<p>Nenhum livro disponível!</p>";
  }
}

function loadCards() {
  fetch("../actions/loadBooks.php")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      books = books.filter((b) => b.rent == 1);
      updateBookCards(books);
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
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

function cancelSetUser() {
  window.location.href = "main.php";
}

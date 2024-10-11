let books = [];
let searchRent = document.getElementById("searchRent");

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
  loadCards();
});

function updateBookCards(array) {
  const rentContainer = document.querySelector(".rent-container");
  rentContainer.innerHTML = "";

  array.forEach((book) => {
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");
      card.setAttribute("onclick", "rentBook('" + book.name + "')");

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

function rentBook(name) {
  console.log("vai alugar" + name);
}

let books = [];

document.addEventListener("DOMContentLoaded", function () {
  loadCards();
});

function updateBookCards() {
  const rentContainer = document.querySelector(".rent-container");
  rentContainer.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card-book");

    card.innerHTML = `
      <img src="${book.url}">
      <p>${book.name}</p>
      <p>${book.author}</p>
      <p>${book.theme}</p>
      <p>${book.sinopse}</p>
    `;

    rentContainer.appendChild(card);
  });
}

function loadCards() {
  fetch("../actions/loadBooks.php")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      updateBookCards();
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
}

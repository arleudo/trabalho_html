let books = [];

document.addEventListener("DOMContentLoaded", function () {
  loadCards();
});

function updateBookCards() {
  const rentContainer = document.querySelector(".rent-container");
  rentContainer.innerHTML = "";

  books.forEach((book) => {
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
      updateBookCards();
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
}

function rentBook(name) {
  console.log("vai alugar" + name);
}

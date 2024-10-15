let rentedBooks = [];
let rents_ = [];

document.addEventListener("DOMContentLoaded", async function () {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  await loadBooks();
  await loadRents();

  let userRents = rents_.filter((rent) => rent.id_user === loggedUser.id);

  const rentsByUser = userRents.map((rent) => {
    return rentedBooks.find((book) => book.id === rent.id_book);
  });

  const rentContainer = document.getElementById("back-container");
  rentContainer.innerHTML = "";

  rentsByUser.forEach((book) => {
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");

      card.innerHTML = `
      <img src="${book.url}" width="80px" height="80px">
      <div class="card-content">
          <p>${book.name}</p>
      </div>
      <button onclick="back(${book.id})">Devolver</button>
    `;
      rentContainer.appendChild(card);
    }
  });
});

async function loadBooks() {
  rentedBooks = await (await fetch("../actions/loadBooks.php")).json();
}

async function loadRents() {
  rents_ = await (await fetch("../actions/loadRents.php")).json();
}

async function back(id) {
  console.log("devolvendo o livro: ", id);
}

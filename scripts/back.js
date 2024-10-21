let rents_ = [];
let books = [];
let book_rented_user = [];
let loggedUser = {};

// função que executa na inicialização da página
document.addEventListener("DOMContentLoaded", async function () {
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email == "admin@admin.com") {
    window.location.href = "main.php";
  }

  let estrelas = document.querySelectorAll(".estrela");
  console.log(estrelas);

  // Adicionando o evento de click nas estrelas
  estrelas.forEach((estrela) => {
    estrela.addEventListener("click", () => {
      let rating = parseInt(estrela.getAttribute("data-value")); // Conversão correta para número
      estrelas.forEach((item, index) => {
        console.log(rating);
        item.innerHTML = index < rating ? "&#9733;" : "&#9734;";
      });
    });
  });

  await loadRents();
  await loadBooks();
  book_rented_user = rents_.map((rent) => {
    return books.find((book) => book.id == rent.id_book);
  });

  updateBack();
});

function updateBack() {
  const rentContainer = document.getElementById("back-container");
  rentContainer.innerHTML = "";

  book_rented_user.forEach((book) => {
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
}

async function loadBooks() {
  books = await (await fetch("../actions/loadBooks.php")).json();
  books = books.filter((book) => book.rent == false);
}

async function loadRents() {
  rents_ = await (await fetch("../actions/loadRents.php")).json();
  rents_ = rents_.filter(
    (rent) => rent.active == true && rent.id_user == loggedUser.id
  );
}

async function back(id) {
  const element = book_rented_user.find((b) => b.id == id);
  if (element) {
    openDialog();
  }

  // colocando o livro disponivel pra aluguel
  // element.rent = true;
  // await executePost("../actions/updateBook.php", element);

  // // colocando o aluguel com inativo, pra definir que ele ja foi devolvido
  // const rent_to_update = rents_.find((rent) => rent.id_book == id);
  // rent_to_update.active = false;
  // await executePost("../actions/updateRent.php", rent_to_update);

  // book_rented_user = book_rented_user.filter((b) => b.id != id);
  // updateBack();
}

// função que acessa o banco
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

function saveComment() {
  closeDialog();
  console.log("salvando o comentario");
}

let rents_ = [];
let books = [];
let book_rented_user = [];
let loggedUser = {};

// função que executa na inicialização da página
document.addEventListener("DOMContentLoaded", async function () {
  // pegando o usuário do local storage
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email == "admin@admin.com") {
    window.location.href = "main.php";
  }

  //carregando os alugueis
  await loadRents();
  // carregando os livros
  await loadBooks();
  // filtrando os livros com base nos alugueis realizados pelo usuario
  book_rented_user = rents_.map((rent) => {
    return books.find((book) => book.id == rent.id_book);
  });

  // atualizando a tela com base nos livros alugados pelo usu[ario]
  updateBack();
});

// função que atualiza a tela inserindo um card pra cada livro alugado
function updateBack() {
  // pegando o elemento que será prrenchido pelo id
  const rentContainer = document.getElementById("back-container");
  rentContainer.innerHTML = "";

  // iterando entre os livros
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

// função que carrega os livros do banco de dados
async function loadBooks() {
  books = await (await fetch("../actions/loadBooks.php")).json();
  // filtrando os livros pegando apenas os nao disponiveis pra alugar
  books = books.filter((book) => book.rent == false);
}

// função que carrega os alugueis do banco de dados
async function loadRents() {
  rents_ = await (await fetch("../actions/loadRents.php")).json();
  // filtrando os alugueis com base no id do usuário
  rents_ = rents_.filter(
    (rent) => rent.active == true && rent.id_user == loggedUser.id
  );
}

// função que realiza a devolução do livro e atualiza os dados no banco de dados
async function back(id) {
  const element = book_rented_user.find((b) => b.id == id);
  if (element) {
    // colocando o livro disponivel pra aluguel
    element.rent = true;
    await executePost("../actions/updateBook.php", element);

    // colocando o aluguel com inativo, pra definir que ele ja foi devolvido
    const rent_to_update = rents_.find((rent) => rent.id_book == id);
    rent_to_update.active = false;
    await executePost("../actions/updateRent.php", rent_to_update);

    book_rented_user = book_rented_user.filter((b) => b.id != id);
    updateBack();
  }
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

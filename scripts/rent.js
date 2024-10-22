let books = [];
let searchRent = document.getElementById("searchRent");
let rents = [];
let recomendations = [];
let loggedUser;
let users = [];

// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  //pegando o usuário logado
  loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email == "admin@admin.com") {
    window.location.href = "main.php";
  }

  // carregando os alugueis anteriores
  loadCards();
  // carregando as recomendações
  loadRecomendations();
  // carregando os usuários
  loadUsers();
});

// pegando o valor no campo de busca
searchRent.addEventListener("input", function () {
  // so faz alguma coisa a partir da 3ª letra
  if (searchRent.value.length >= 3) {
    // coloca tudo em minuscula pra facilitar a comparação
    const searchValue = searchRent.value.toLowerCase();
    // fazendo o filtro comparando o campo com o nome e o autor
    const newBooks = books.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.author.toLowerCase().includes(searchValue)
    );

    // atualiza a tela com os livros filtrados
    updateBookCards(newBooks);
  } else {
    // atualiza a tela com os livros iniciais
    updateBookCards(books);
  }
});

// atualiza os livros com base no array
function updateBookCards(array) {
  // pegando o elemento que será preenchido com base no id
  const rentContainer = document.querySelector(".rent-container");
  rentContainer.innerHTML = "";

  // iterando no array, pra cada livro será renderizado um card na tela
  array.forEach((book) => {
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");
      // insere o evento de clique pra mostrar os detalhes caso clique no card
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

// carrega os livros do banco de dados
function loadCards() {
  fetch("../actions/loadBooks.php")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      // insere na lista apenas os livros disponiveis pra alugar
      books = books.filter((b) => b.rent == 1);
      updateBookCards(books);
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
}

// função que aluga um livro
function rentBook(event, id) {
  // como o botao esta dentro do cara, evita a propagação de cliques
  event.stopPropagation();
  const book = books.find((b) => b.id == id);

  if (book) {
    // adiciona o livro na sacola
    addToBag(JSON.stringify(book));
  }
}

async function loadRecomendations() {
  fetch("../actions/loadComments.php")
    .then((response) => response.json())
    .then((data) => {
      recomendations = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar os comentários:", error);
    });
}

// abre o dialog de detalhes do livro selecionado
function showDetails(id) {
  const book = books.find((b) => b.id == id);
  const comments = recomendations.filter((comm) => comm.id_book == id);

  if (book) {
    const col_left = document.getElementById("col-left");
    col_left.innerHTML = "";

    // colocando a imagem no lado esquerdo
    const img = document.createElement("img");
    img.setAttribute("src", book.url);
    img.setAttribute("width", "400px");
    img.setAttribute("heigth", "auto");
    col_left.appendChild(img);

    // colocando as demais informações nos campos
    let name_book = document.getElementById("name_book");
    name_book.value = book.name;
    let author_book = document.getElementById("author_book");
    author_book.value = book.author;
    let theme_book = document.getElementById("theme_book");
    theme_book.value = book.theme;
    let sinopse_book = document.getElementById("sinopse_book");
    sinopse_book.value = book.sinopse;

    const recomendationsOfBook = document.getElementById("recomendations");

    recomendationsOfBook.innerHTML = `
  <h3>Avaliações de Usuários</h3>
`;

    comments.forEach((element) => {
      let starsHTML = "";
      const totalStars = 5;
      const user = users.find((u) => u.id == element.id_user);

      for (let i = 0; i < element.stars; i++) {
        starsHTML += "&#9733;";
      }

      for (let i = element.stars; i < totalStars; i++) {
        starsHTML += "&#9734;";
      }

      recomendationsOfBook.innerHTML += `
    <div class="aval">
      <h4>${user.name}</h4>
      <div>
        ${starsHTML} <!-- Aqui as estrelas são inseridas -->
      </div>
      <p>${element.comment}</p>
    </div>`;
    });

    openDialogDetails(id);
  }
}

// funçao que abre o dialog de detalhes do livro
function openDialogDetails(id) {
  document.getElementById("dialog_details").style.display = "flex";
}

// função que fecha o dialog de detalhes
function closeDialogDetails() {
  document.getElementById("dialog_details").style.display = "none";
}

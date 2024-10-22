let user = {};
let bag_books = [];
let rents = [];

// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", async function () {
  // pegando o usuario logado a partir do localstorage
  user = JSON.parse(localStorage.getItem("user"));

  // carregando os alugueis anteriores
  await loadRents();

  // pegando os livros que estao no localstorage
  bag_books = JSON.parse(localStorage.getItem("bag"));

  // atualizando a tela com os livros capturados
  updateBag();
});

// função
function updateBag() {
  // pegando o elemento que será preenchido pelo id
  const rentContainer = document.getElementById("bag-container");
  rentContainer.innerHTML = "";

  // iterando entre os livros, pra cada livro sera renderizado um card
  bag_books.forEach((book) => {
    if (book.rent) {
      const card = document.createElement("div");
      card.classList.add("card-book");

      card.innerHTML = `
      <img src="${book.url}" width="80px" height="80px">
      <div class="card-content">
          <p>${book.name}</p>
      </div>
      <button onclick="remove(${book.id})">Remover</button>
    `;
      rentContainer.appendChild(card);
    }
  });
}

// função pra remover da sacola
function remove(id) {
  // remove da sacola no header para atualizar o contador no bdge
  removeFromBag(id);
  //filtrando os livros pra remover da tela
  bag_books = bag_books.filter((b) => b.id != id);
  updateBag();
  if (bag_books.length == 0) {
    // removendo o livro tbm do local storage
    localStorage.removeItem("bag");
  }
}

// função que carrega os alugueis
async function loadRents() {
  rents = await (await fetch("../actions/loadRents.php")).json();
}

// função que confirma o aluguel persistindo os dados no banco
async function confirmRent() {
  for (let index = 0; index < bag_books.length; index++) {
    const element = bag_books[index];
    const rent = {
      id: rents.length + 1,
      id_user: user.id,
      id_book: element.id,
      active: true,
    };
    // colocando o livro como indisponivel pra aluguel
    element.rent = false;
    await executePost("../actions/updateBook.php", element);
    const resp = await executePost("../actions/saveRent.php", rent);

    if (resp) {
      rents.push(rent);
    } else {
      console.log("erro");
    }
  }
  showToast("Aluguel confirmado");

  setTimeout(() => {
    // apagando o local storage uma vez que o aluguel foi confirmado
    localStorage.removeItem("bag");
    // navegando pra tela principal
    window.location.href = "main.php";
  }, 1500);
}

// função de acesso ao banco de dados
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

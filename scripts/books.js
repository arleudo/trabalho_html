let books = [];
let editing = false;
let book_ = {};

let search = document.getElementById("searchBook");

// função que carrega na inicialização da pagina
document.addEventListener("DOMContentLoaded", function () {
  // pegando o usuario logado do local storage
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    window.location.href = "main.php";
  }
  // carregando os livros do banco
  loadBooks();
});

// pegando o texto do input de busca
search.addEventListener("input", function () {
  // so faz alguma coisa a partir da 3ª letra
  if (search.value.length >= 3) {
    // coloca tudo pra minuscula pra facilitar a comparação
    const searchValue = search.value.toLowerCase();
    const newBooks = books.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.author.toLowerCase().includes(searchValue)
    );
    // atualiza a tela com os livros filtrados
    updateTableBooks(newBooks);
  } else {
    // atualiza a tela com os livros iniciais
    updateTableBooks(books);
  }
});

// salva o livro no banco de dados
async function saveBook() {
  // pegando os valores dos campos
  let name = document.getElementById("input_name");
  let author = document.getElementById("input_author");
  let sinopse = document.getElementById("input_sinopse");
  let theme = document.getElementById("input_theme");
  let url = document.getElementById("input_url");
  let book = {};

  // validando se os campos estao vazios
  if (name.value == "") {
    name.setCustomValidity("Campo obrigatório.");
    name.reportValidity();
    return;
  }

  if (author.value == "") {
    author.setCustomValidity("Campo obrigatório.");
    author.reportValidity();
    return;
  }

  if (theme.value == "") {
    theme.setCustomValidity("Campo obrigatório.");
    theme.reportValidity();
    return;
  }

  // verificando se ira editar ou criar
  if (!editing) {
    book = {
      id: books.length + 1,
      name: name.value,
      author: author.value,
      sinopse: sinopse.value,
      theme: theme.value,
      url: url.value,
      rent: 1,
    };
    // salvando no banco o novo livro
    const resp = await executePost("../actions/saveBook.php", book);
    if (resp) {
      books.push(book);
      // atualiza a tela com o livro novo criado
      updateTableBooks(books);
      showToast("Livro criado com sucesso!!");
    }
  } else {
    book_.name = name.value;
    book_.author = author.value;
    book_.sinopse = sinopse.value;
    book_.theme = theme.value;
    book_.url = url.value;
    // atualizando o livro no banco
    const resp = await executePost("../actions/updateBook.php", book_);
    if (resp) {
      // atualizando a tela com os dados alterados
      updateTableBooks(books);
      showToast("Livro atualizado com sucesso!!");
    }
  }

  // fechando o dialog e limpando
  closeDialog();
  cleanBookDialog();
}

// atualizando a tela com os livros filtrados ou recuperados do banco
function updateTableBooks(array) {
  const tableBody = document.getElementById("table_books");
  tableBody.innerHTML = "";

  // iterando no array
  array.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Nome">${book.name}</td>
      <td data-label="Autor">${book.author}</td>
      <td data-label="Sinopse">${book.sinopse}</td>
      <td data-label="Tema">${book.theme}</td>
      <td data-label="Disponível"><div class="${
        book.rent == 1 ? "sim" : "nao"
      }"></div></td>
      <td data-label="Ações">
        <div class="actions">
          <div class="button-rent" onclick="editBook(${book.id})">
            <img src="../../imgs/pencil.svg">
          </div>
          <div class="button-rent" onclick="deleteBook(${book.id})">
            <img src="../../imgs/trash.svg">
          </div>
        </div
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// carrega os livros do banco
function loadBooks() {
  fetch("../actions/loadBooks.php")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      updateTableBooks(books);
    })
    .catch((error) => {
      console.error("Erro ao carregar os livros:", error);
    });
}

// limpa os campos
function cleanBookDialog() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_author").value = "";
  document.getElementById("input_url").value = "";
  document.getElementById("input_sinopse").value = "";
  document.getElementById("input_theme").value = "";
}

// editando o livro selecionado
function editBook(id) {
  book_ = books.find((u) => u.id == id);
  // preenchendo os campos com o livro selecionado
  if (book_) {
    document.getElementById("input_name").value = book_.name;
    document.getElementById("input_author").value = book_.author;
    document.getElementById("input_sinopse").value = book_.sinopse;
    document.getElementById("input_theme").value = book_.theme;
    document.getElementById("input_url").value = book_.url;
    editing = true;
    openDialog();
  }
}

// remove um livro no banco de dados
async function deleteBook(id) {
  const resp = await executePost("../actions/deleteBook.php", { id });
  if (resp) {
    books = books.filter((book) => book.id != id);
    updateTableBooks(books);
    showToast("Livro removido com sucesso!!");
  } else {
    console.log("Erro ao deletar livro");
  }
}

// executa o acesso ao banco
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

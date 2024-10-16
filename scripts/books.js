let books = [];
let editing = false;
let book_ = {};

let search = document.getElementById("searchBook");

search.addEventListener("input", function () {
  if (search.value.length >= 3) {
    const searchValue = search.value.toLowerCase();
    const newBooks = books.filter(
      (u) =>
        u.name.toLowerCase().includes(searchValue) ||
        u.author.toLowerCase().includes(searchValue)
    );
    updateTableBooks(newBooks);
  } else {
    updateTableBooks(books);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email != "admin@admin.com") {
    window.location.href = "main.php";
  }
  loadBooks();
});

async function saveBook() {
  let name = document.getElementById("input_name").value;
  let author = document.getElementById("input_author").value;
  let sinopse = document.getElementById("input_sinopse").value;
  let theme = document.getElementById("input_theme").value;
  let url = document.getElementById("input_url").value;
  let book = {};

  if (!editing) {
    book = { id: books.length + 1, name, author, sinopse, theme, url, rent: 1 };
    const resp = await executePost("../actions/saveBook.php", book);
    if (resp) {
      books.push(book);
      updateTableBooks(books);
    }
  } else {
    book_.name = name;
    book_.author = author;
    book_.sinopse = sinopse;
    book_.theme = theme;
    book_.url = url;
    const resp = await executePost("../actions/updateBook.php", book_);
    if (resp) {
      updateTableBooks(books);
    }
  }

  closeDialog();
  cleanBookDialog();
}

function updateTableBooks(array) {
  const tableBody = document.getElementById("table_books");
  tableBody.innerHTML = "";

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

function cleanBookDialog() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_author").value = "";
  document.getElementById("input_url").value = "";
  document.getElementById("input_sinopse").value = "";
  document.getElementById("input_theme").value = "";
}

function rentBook(id) {
  console.log("Alugando o livro: " + id);
}

function editBook(id) {
  book_ = books.find((u) => u.id == id);
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

async function deleteBook(id) {
  const resp = await executePost("../actions/deleteBook.php", { id });
  if (resp) {
    books = books.filter((book) => book.id != id);
    updateTableBooks(books);
  } else {
    console.log("Erro ao deletar livro");
  }
}

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

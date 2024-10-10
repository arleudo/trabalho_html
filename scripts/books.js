let books = [];
let editing = false;
let book_ = {};

document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

async function saveBook() {
  let name = document.getElementById("input_name").value;
  let author = document.getElementById("input_author").value;
  let sinopse = document.getElementById("input_sinopse").value;
  let theme = document.getElementById("input_theme").value;
  let url = document.getElementById("input_url").value;
  let book = { id, name, author, sinopse, theme, url, rent: true };

  if (!editing) {
    book = { id: books.length + 1, name, author, sinopse, theme, url, rent: 1 };
    const resp = await realizeFetch("../actions/saveBook.php", book);
    if (resp) {
      books.push(book);
      updateTableBooks();
    }
  } else {
    book_.name = name;
    book_.author = author;
    book_.sinopse = sinopse;
    book_.theme = theme;
    book_.url = url;
    const resp = await realizeFetch("../actions/updateBook.php", book_);
    if (resp) {
      updateTableBooks();
    }
  }

  closeDialog();
  cleanBookDialog();
}

function updateTableBooks() {
  const tableBody = document.getElementById("table_books");
  tableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Nome">${book.name}</td>
      <td data-label="Autor">${book.author}</td>
      <td data-label="Sinopse">${book.sinopse}</td>
      <td data-label="Tema">${book.theme}</td>
      <td data-label="Disponível"><div class="${
        book.rent ? "sim" : "nao"
      }"></div></td>
      <td data-label="Ações">
        <div class="actions">
          <div class="button-rent" onclick="editBook(${book.id})">
            <img src="../../imgs/pencil.svg">
          </div>
          <div class="button-rent" onclick="deleteBook(${book.id})">
            <img src="../../imgs/trash.svg">
          </div>  
          <div class="button-rent" onclick="rentBook(${book.id})">
            <img src="../../imgs/bag.svg">
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
      updateTableBooks();
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
  const resp = await realizeFetch("../actions/deleteBook.php", { id });
  if (resp) {
    books = books.filter((book) => book.id != id);
    updateTableBooks();
  } else {
    console.log("Erro ao deletar livro");
  }
}

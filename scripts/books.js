let books = [];

document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

function saveBook() {
  const id = books.length;

  let name = document.getElementById("input_name").value;
  let url = document.getElementById("input_url").value;
  let author = document.getElementById("input_author").value;
  let sinopse = document.getElementById("input_sinopse").value;
  let theme = document.getElementById("input_theme").value;
  let book = { id, name, url, author, sinopse, theme, rent: true };

  fetch("../actions/saveBook.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        books.push(book);
        updateTableBooks();
        console.log("Livro salvo com sucesso:", data);
      } else {
        console.error("Erro ao salvar livro:", data.error);
      }
    })
    .catch((error) => {
      console.error("Erro ao salvar o livro:", error);
    });

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

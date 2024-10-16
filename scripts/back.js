let rentedBooks = [];
let rents_ = [];
let rentsByUser = [];

document.addEventListener("DOMContentLoaded", async function () {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (loggedUser.email == "admin@admin.com") {
    window.location.href = "main.php";
  }

  await loadBooks();
  await loadRents();

  let userRents = rents_.filter((rent) => rent.id_user === loggedUser.id);

  rentsByUser = userRents.map((rent) => {
    return rentedBooks.find((book) => book.id === rent.id_book);
  });

  updateBack();
});

function updateBack() {
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
}

async function loadBooks() {
  rentedBooks = await (await fetch("../actions/loadBooks.php")).json();
}

async function loadRents() {
  rents_ = await (await fetch("../actions/loadRents.php")).json();
}

async function back(id) {
  const element = rentsByUser.find((b) => b.id == id);
  element.rent = true;
  const resp = await executePost("../actions/updateBook.php", element);
  await executePost("../actions/deleteRent.php", element);

  if (resp) {
    rentsByUser = rentsByUser.filter((b) => b.id != id);
    updateBack();
  } else {
    console.log("erro");
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

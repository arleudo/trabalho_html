let user = {};
let bag_books = [];
let rents = [];

document.addEventListener("DOMContentLoaded", async function () {
  user = JSON.parse(localStorage.getItem("user"));
  await loadRents();

  bag_books = JSON.parse(localStorage.getItem("bag"));
  updateBag();
});

function updateBag() {
  const rentContainer = document.getElementById("bag-container");
  rentContainer.innerHTML = "";

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

function remove(id) {
  removeFromBag(id);
  bag_books = bag_books.filter((b) => b.id != id);
  updateBag();
  if (bag_books.length == 0) {
    localStorage.removeItem("bag");
  }
}

async function loadRents() {
  rents = await (await fetch("../actions/loadRents.php")).json();
}

async function confirmRent() {
  for (let index = 0; index < bag_books.length; index++) {
    const element = bag_books[index];
    const rent = {
      id: rents.length + 1,
      id_user: user.id,
      id_book: element.id,
    };
    element.rent = false;
    await executePost("../actions/updateBook.php", element);
    const resp = await executePost("../actions/saveRent.php", rent);

    if (resp) {
      rents.push(rent);
    } else {
      console.log("erro");
    }
  }
  console.log("Aluguel confirmado");
  localStorage.removeItem("bag");
  window.location.href = "main.php";
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

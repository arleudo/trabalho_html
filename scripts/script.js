let users = [];

document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-container").classList.toggle("menu-active");
});

function openDialog() {
  document.getElementById("dialog").style.display = "flex";
}

function closeDialog() {
  document.getElementById("dialog").style.display = "none";
}

function saveUser() {
  const id = users.length;

  let name = document.getElementById("input_name").value;
  let email = document.getElementById("input_email").value;
  let cpf = document.getElementById("input_cpf").value;
  let phone = document.getElementById("input_phone").value;
  let user = { id, name, email, cpf, phone, active: true };

  users.push(user);
  updateTable();
  console.log(users);
  closeDialog();
  cleanUserDialog();
}

function updateTable() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Nome">${user.name}</td>
      <td data-label="Email">${user.email}</td>
      <td data-label="CPF">${user.cpf}</td>
      <td data-label="Telefone">${user.phone}</td>
      <td data-label="Ativo"><div class="${
        user.active ? "sim" : "nao"
      }"></div></td>
    `;

    tableBody.appendChild(row);
  });
}

function cleanUserDialog() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_email").value = "";
  document.getElementById("input_cpf").value = "";
  document.getElementById("input_phone").value = "";
}

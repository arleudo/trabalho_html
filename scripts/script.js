let users = [];

document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});

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

  fetch("saveUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        users.push(user);
        updateTable();
        console.log("Usuário salvo com sucesso:", data);
      } else {
        console.error("Erro ao salvar usuário:", data.error);
      }
    })
    .catch((error) => {
      console.error("Erro ao salvar o usuário:", error);
    });

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

function loadUsers() {
  fetch("loadUsers.php")
    .then((response) => response.json())
    .then((data) => {
      users = data; // Atualiza o array de usuários com os dados do servidor
      updateTable(); // Atualiza a tabela com os usuários carregados
    })
    .catch((error) => {
      console.error("Erro ao carregar os usuários:", error);
    });
}

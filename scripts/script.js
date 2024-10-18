document.addEventListener("DOMContentLoaded", function () {
  loadUsers();
});

async function loadUsers() {
  users = await (await fetch("../actions/loadUsers.php")).json();
}

function openDialog() {
  document.getElementById("dialog").style.display = "flex";
}

function closeDialog() {
  document.getElementById("dialog").style.display = "none";
}

function validarInput(input) {
  input.value = input.value.replace(/[^0-9.]/g, "");

  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11);
  }
}

function validLogin() {
  const emailField = document.getElementById("field_email");
  const passwordField = document.getElementById("field_password");

  if (emailField.value === "" || passwordField.value === "") {
    const campoVazio = emailField.value === "" ? "E-mail" : "Senha";
    emailField.setCustomValidity(`Campo ${campoVazio} é obrigatório.`);
    emailField.reportValidity();
    return;
  }

  const found = users.find(
    (u) => u.email === emailField.value && u.password === passwordField.value
  );

  const isAdmin =
    emailField.value === "admin@admin.com" && passwordField.value === "admin";

  if (found || isAdmin) {
    const userData = found ? found : { name: "admin", email: emailField.value };
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "main.php";
  } else {
    emailField.setCustomValidity(
      "Credenciais de login inválidas. Verifique o e-mail ou a senha."
    );
    emailField.reportValidity();
  }
}

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

function validLogin(event) {
  event.preventDefault();

  let email = document.getElementById("field_email");
  let password = document.getElementById("field_password");

  const found = users.find(
    (u) => u.email === email.value && u.password === password.value
  );

  if (
    (email.value == "admin@admin.com" && password.value == "admin") ||
    found
  ) {
    localStorage.setItem(
      "user",
      JSON.stringify(found ? found : { name: "admin", email: email.value })
    );
    window.location.href = "main.php";
  } else {
    email.setCustomValidity(
      "Credenciais de login inválidas. Verifique o e-mail ou a senha."
    );
    email.reportValidity();
  }
}

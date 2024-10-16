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

function validLogin() {
  let email = document.getElementById("field_email").value;
  let password = document.getElementById("field_password").value;

  const found = users.find((u) => u.email == email && u.password == password);

  if ((email === "admin@admin.com" && password === "admin") || found) {
    localStorage.setItem(
      "user",
      JSON.stringify(found ? found : { name: "admin", email })
    );
    window.location.href = "main.php";
  } else {
    console.log("Erro nas credenciais de login");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let username = document.getElementById("user-name");
  let useremail = document.getElementById("user-email");

  const user = JSON.parse(localStorage.getItem("user"));

  username.textContent = user.name;
  useremail.textContent = user.email;
});

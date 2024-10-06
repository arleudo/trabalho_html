document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-container").classList.toggle("menu-active");
});

function closeDialog() {
  document.getElementById('dialogOverlay').style.display = 'none';
}

function openDialog() {
  document.getElementById('dialogOverlay').style.display = 'flex';
}

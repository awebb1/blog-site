document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("light-mode");
    var isLight = document.documentElement.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  document.getElementById("theme-icon").classList.remove("fa-moon");
  document.getElementById("theme-icon").classList.add("fa-sun");
}

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  const themeIcon = document.getElementById("theme-icon");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

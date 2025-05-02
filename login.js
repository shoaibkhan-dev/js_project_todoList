// login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid Credentials Register First");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "home.html";
});
const users = {
  admin: { password: "admin123", role: "supervisor" },
  user: { password: "user123", role: "user" }
};

let currentUser = null;
let partnerships = JSON.parse(localStorage.getItem("partnerships")) || [];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users[username];

  if (user && user.password === password) {
    currentUser = { username, role: user.role };
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");
    document.getElementById("user-role").textContent = `${username} (${user.role})`;
    renderPartnerships();
  } else {
    document.getElementById("login-error").textContent = "Invalid login.";
  }
}

function logout() {
  currentUser = null;
  document.getElementById("app-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").textContent = "";
}

function addPartnership() {
  const name = document.getElementById("partner-name").value.trim();
  if (name) {
    partnerships.push({ name, addedBy: currentUser.username });
    localStorage.setItem("partnerships", JSON.stringify(partnerships));
    document.getElementById("partner-name").value = "";
    renderPartnerships();
  }
}

function removePartnership(index) {
  partnerships.splice(index, 1);
  localStorage.setItem("partnerships", JSON.stringify(partnerships));
  renderPartnerships();
}

function renderPartnerships() {
  const list = document.getElementById("partnership-list");
  list.innerHTML = "";

  partnerships.forEach((partnership, index) => {
    const li = document.createElement("li");
    li.textContent = `${partnership.name} (by ${partnership.addedBy})`;

    if (currentUser.role === "supervisor" || currentUser.username === partnership.addedBy) {
      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.className = "delete-btn";
      btn.onclick = () => removePartnership(index);
      li.appendChild(btn);
    }

    list.appendChild(li);
  });
}
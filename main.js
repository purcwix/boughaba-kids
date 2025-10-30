// ========== GLOBAL STATE ==========
const state = {
  theme: localStorage.getItem("theme") || "light",
  user: JSON.parse(localStorage.getItem("user") || "null"),
  people: JSON.parse(localStorage.getItem("people") || "[]"),
  posts: JSON.parse(localStorage.getItem("posts") || "[]"),
};

// ========== THEME ==========
function applyTheme() {
  if (state.theme === "dark") document.body.classList.add("dark");
  else document.body.classList.remove("dark");
}
function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", state.theme);
  applyTheme();
}

// ========== USER HANDLING ==========
function signUp(name, role) {
  const user = { name, role };
  state.user = user;
  localStorage.setItem("user", JSON.stringify(user));

  // Add to people list if new
  const exists = state.people.some((p) => p.name === name);
  if (!exists) {
    state.people.push(user);
    localStorage.setItem("people", JSON.stringify(state.people));
  }

  alert(`مرحباً ${name}! تم تسجيلك كـ${role === "teacher" ? "معلم" : "طالب"}.`);
  window.location.href = "../index.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

// ========== POSTS ==========
function addPost(text) {
  const user = getUser() || { name: "مجهول" };
  const post = { user: user.name, text, time: new Date().toLocaleString() };
  state.posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(state.posts));
}

// ========== PEOPLE ==========
function renderPeople() {
  const container = document.querySelector("#people");
  if (!container) return;

  const people = JSON.parse(localStorage.getItem("people") || "[]");
  if (!people.length) {
    container.innerHTML = "<p>لا يوجد طلاب أو معلمين بعد.</p>";
    return;
  }

  container.innerHTML = people
    .map(
      (p) =>
        `<div class="person-card">
          <b>${p.name}</b><br>
          <small>${p.role === "teacher" ? "👩‍🏫 معلم" : "👦 طالب"}</small>
        </div>`
    )
    .join("");
}

// ========== CLEANUP ==========
function clearData() {
  if (confirm("هل أنت متأكد من حذف جميع البيانات؟")) {
    localStorage.clear();
    location.reload();
  }
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  const settingsBtn = document.getElementById("settings-btn");
  const panel = document.getElementById("settings-panel");
  if (settingsBtn && panel) {
    settingsBtn.onclick = () => (panel.hidden = !panel.hidden);
  }
});

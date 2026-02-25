// USERS
let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// REGISTER
function register() {

    let name = regName.value;
    let email = regEmail.value;
    let pass = regPass.value;

    if (!name || !email || !pass) {
        alert("Fill all fields");
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
    location = "index.html";
}

// LOGIN
function login() {

    let email = loginEmail.value;
    let pass = loginPass.value;

    let user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
        alert("Invalid Login");
        return;
    }

    localStorage.setItem("currentUser", email);
    location = "dashboard.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    location = "index.html";
}

// TASKS
function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Enter task");
        return;
    }

    let user = localStorage.getItem("currentUser");

    tasks.push({ user, text });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

function loadTasks() {

    let user = localStorage.getItem("currentUser");

    if (!user) return;

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(t => t.user === user)
        .forEach((t, i) => {

            let li = document.createElement("li");

            li.innerHTML = `
   ${t.text}
   <span onclick="deleteTask(${i})">❌</span>
  `;

            list.appendChild(li);
        });
}

function deleteTask(i) {

    tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// AUTO LOAD
if (document.getElementById("taskList")) {
    loadTasks();
}
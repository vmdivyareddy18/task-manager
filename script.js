let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function addTask() {

    let title = document.getElementById("title").value.trim();
    let priority = document.getElementById("priority").value;

    if (title === "") {
        alert("Enter task title");
        return;
    }

    tasks.push({
        title,
        priority,
        status: "todo"
    });

    document.getElementById("title").value = "";

    save();
}

function changeStatus(i) {

    let s = tasks[i].status;

    if (s === "todo") tasks[i].status = "progress";
    else if (s === "progress") tasks[i].status = "done";
    else tasks[i].status = "todo";

    save();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
}

function filterTasks(type) {

    currentFilter = type;

    document
        .querySelectorAll(".filters button")
        .forEach(b => b.classList.remove("active"));

    event.target.classList.add("active");

    render();
}

function render() {

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let all = 0, todo = 0, prog = 0, done = 0;

    tasks.forEach((t, i) => {

        all++;

        if (t.status === "todo") todo++;
        if (t.status === "progress") prog++;
        if (t.status === "done") done++;

        if (currentFilter !== "all" && t.status !== currentFilter)
            return;

        let div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
   <div>
    <h4>${t.title}</h4>
    <small class="${t.priority.toLowerCase()}">
     ${t.priority} Priority | ${t.status}
    </small>
   </div>

   <div class="actions">
    <button onclick="changeStatus(${i})">🔄</button>
    <button onclick="deleteTask(${i})">🗑</button>
   </div>
  `;

        list.appendChild(div);

    });

    document.getElementById("allCount").innerText = all;
    document.getElementById("todoCount").innerText = todo;
    document.getElementById("progressCount").innerText = prog;
    document.getElementById("doneCount").innerText = done;

    document.getElementById("emptyMsg").style.display =
        list.innerHTML === "" ? "block" : "none";
}

render();
.app{
    width: 600px;
    min - height: 70vh;   /* ✅ ADD THIS */
    background: white;
    border - radius: 12px;
    padding: 25px;
    box - shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

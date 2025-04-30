const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("welcomeText").textContent = `Welcome, ${currentUser.name}`;
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const fileInput = document.getElementById("fileInput");
const taskList = document.getElementById("taskList");

function getAllTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveAllTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getUserTasks() {
  return getAllTasks().filter(task => task.email === currentUser.email);
}

function displayTasks() {
  const tasks = getUserTasks();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = task.title;
    li.appendChild(text);

    if (task.imageData) {
      const img = document.createElement("img");
      img.src = task.imageData;
      img.alt = "Attached image";
      img.className = "task-image";
      li.appendChild(img);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  const allTasks = getAllTasks();
  const userTasks = getUserTasks();
  const taskToDelete = userTasks[index];

  const updatedTasks = allTasks.filter(task =>
    !(task.email === taskToDelete.email &&
      task.title === taskToDelete.title &&
      task.imageData === taskToDelete.imageData)
  );

  saveAllTasks(updatedTasks);
  displayTasks();
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  const file = fileInput.files[0];

  if (title === "") return;

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const newTask = {
        title,
        email: currentUser.email,
        imageData: reader.result
      };
      saveNewTask(newTask);
    };
    reader.readAsDataURL(file);
  } else {
    const newTask = {
      title,
      email: currentUser.email,
      imageData: null
    };
    saveNewTask(newTask);
  }

  taskInput.value = "";
  fileInput.value = "";
});

function saveNewTask(task) {
  const allTasks = getAllTasks();
  allTasks.push(task);
  saveAllTasks(allTasks);
  displayTasks();
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

displayTasks();
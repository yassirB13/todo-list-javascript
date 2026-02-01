let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function () {
  // check if input value has content then pass it to addTask
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// Delete
tasksDiv.addEventListener("click", function (event) {
  if (event.target.classList.contains("del")) {
    // Remove task from localstorage
    deleteTaskWith(event.target.parentElement.getAttribute("data-id"));
    // Remove task from page
    event.target.parentElement.remove();
  }
  // toggle status
  if (event.target.classList.contains("task")) {
    toggleStatusTask(event.target.getAttribute("data-id"));
    event.target.classList.toggle("done");
  }
});

// creat and Add task content to array
function addTaskToArray(taskContent) {
  const task = {
    title: taskContent,
    id: Date.now(),
    completed: false,
  };
  arrayOfTasks.push(task);

  AddElementsToPage(arrayOfTasks);

  addTasksToLocalStorage(arrayOfTasks);
}

// creat and Add task content to page from array
function AddElementsToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.classList = "task";
    if (task.completed) {
      div.classList = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.textContent = `${task.title}`;
    tasksDiv.appendChild(div);

    let span = document.createElement("span");
    span.classList = "del";
    span.textContent = "delete";
    div.appendChild(span);
  });
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    AddElementsToPage(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleStatusTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}

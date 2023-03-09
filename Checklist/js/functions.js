const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");
const inProgressList = document.getElementById("in-progress-list");

let tasks = [];
let inProgressTasks = [];
let completedTasks = [];

addButton.addEventListener("click", () => {
  const task = {
    id: tasks.length + 1,
    description: "",
    completed: false,
    inProgress: true,
  };

  tasks.push(task);

  renderTaskList();
});

function renderTaskList() {
  taskList.innerHTML = "";
  completedList.innerHTML = `<h2>Tarefas concluídas</h2>`;
  inProgressList.innerHTML = `<h2>Tarefas em progresso</h2>`;

  tasks.forEach((task) => {
    const taskLine = document.createElement("div");
    taskLine.className = "note-line";

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("click", () => {
      task.completed = taskCheckbox.checked;
      task.inProgress = false;
      renderTaskList();
    });

    const taskDescription = document.createElement("input");
    taskDescription.type = "text";
    taskDescription.value = task.description;
    taskDescription.addEventListener("input", () => {
      task.description = taskDescription.value;
    });

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.innerText = "deletar";
    taskDeleteButton.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTaskList();
    });

    taskLine.appendChild(taskCheckbox);
    taskLine.appendChild(taskDescription);
    taskLine.appendChild(taskDeleteButton);

    if (task.completed) {
      completedList.appendChild(taskLine);
      completedTasks.push(task);
    } else if (task.inProgress) {
      inProgressList.appendChild(taskLine);
      inProgressTasks.push(task);
    } else {
      taskList.appendChild(taskLine);
    }
  });
}

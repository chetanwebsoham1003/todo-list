const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-button");


todoInput.addEventListener("keypress", function (event) {       // This function is executed when a key is pressed (keypress event).
  if (event.key === "Enter" && todoInput.value.trim() !== "") {
    addTodoItem(todoInput.value.trim());
    todoInput.value = "";  //value reset
  }
});

function addTodoItem(text) {    // Create a new list item element
  const li = document.createElement("li");
  li.classList.add("todo-item");  //add class

  const checkbox = document.createElement("input");// Create a new checkbox input element
  checkbox.type = "checkbox";

  
  // Add an event listener to the checkbox for the "change" event
  checkbox.addEventListener("change", function () {    
    li.classList.toggle("completed", checkbox.checked);
    
  
  });
  

  const label = document.createElement("label");
  label.textContent = text;

  li.appendChild(checkbox);
  li.appendChild(label);

  todoList.appendChild(li);

  
}

clearCompletedButton.addEventListener("click", function () {
  const completedItems = todoList.querySelectorAll(".completed");
  completedItems.forEach(item => item.remove());
  saveTasksToLocalStorage();
});

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    const filter = button.getAttribute("data-filter");
    todoList.querySelectorAll(".todo-item").forEach(item => {
      if (filter === "all" || (filter === "active" && !item.classList.contains("completed")) || 
      (filter === "completed" && item.classList.contains("completed"))) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

function saveTasksToLocalStorage() {
  const tasks = Array.from(todoList.querySelectorAll(".todo-item label")).map(label => label.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
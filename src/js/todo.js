const toDoDiv = document.querySelector(".toDo"),
    toDoForm = toDoDiv.querySelector(".toDoForm"),
    inputDeadline = toDoForm.querySelector(".deadline"),
    inputToDo = toDoForm.querySelector(".inputToDo"),
    toDoList = toDoDiv.querySelector(".toDoList");

const TODO_DB = "toDos";

let toDo_list = [];

function saveToDos() {
    localStorage.setItem(TODO_DB, JSON.stringify(toDo_list));
}

function deleteTodos(event) {
    const btn = event.target,
        li = btn.parentNode;
    toDoList.removeChild(li);
    const remainTodos = toDoList.querySelectorAll("li");
    let remainTodoList = [];
    remainTodos.forEach(function (toDo) {
        const span = toDo.querySelector("span"),
            text = span.innerText,
            todoObj = {
                text: text,
            };
        remainTodoList.push(todoObj);
    });
    toDo_list = remainTodoList;
    saveToDos();
}

function paintToDo(x, y) {
    const li = document.createElement("li"),
        delBtn = document.createElement("button");
    delBtn.innerHTML = "del";
    delBtn.addEventListener("click", deleteTodos);
    const span = document.createElement("span");
    const text = `until ${x}, ${y}`;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const todoObj = {
        text: text,
    };
    toDo_list.push(todoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const deadline = inputDeadline.value,
        todo = inputToDo.value;
    paintToDo(deadline, todo);
    inputDeadline.value = "";
    inputToDo.value = "";
}

function paintLoadedData(text) {
    const li = document.createElement("li"),
        delBtn = document.createElement("button");
    delBtn.innerHTML = "del";
    delBtn.addEventListener("click", deleteTodos);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const todoObj = {
        text: text,
    };
    toDo_list.push(todoObj);
    saveToDos();
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    const loadedToDoList = localStorage.getItem(TODO_DB);
    if (loadedToDoList !== null) {
        const parseLodedToDoList = JSON.parse(loadedToDoList);
        parseLodedToDoList.forEach(function (toDo) {
            paintLoadedData(toDo.text);
        });
    }
}

init();

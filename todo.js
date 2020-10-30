//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //Tüm event listener lar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}


function addTodo(e){
    var newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("error", "Hata!", "Lütfen bir todo girin!");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Harika!", "Todo Başarıyla Eklendi!");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){ //elemanı arayüze ekleme
    //list item oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo List'e List Item ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";
}
function getTodosFromStorage(){ //Storage dan todoları al
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function deleteTodo(e) {
    var parent = e.target.parentElement.parentElement;
    if (e.target.className === "fa fa-remove"){
        parent.remove();
        deleteTodoFromStorage(parent.textContent);
        showAlert("warning", "Başarılı!", "Todo Başarı İle Silindi")
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if(todo == deleteTodo){
            todos.splice(index, 1);
        }
    });        

    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    });
    //console.log(filterValue);
}

function clearAllTodos() {
    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")) {
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
    }
    localStorage.removeItem("todos");
}

function showAlert(type, title, message){
    swal({
        title: title,
        text: message,
        icon: type,
        button: "Tamam",
    });
}
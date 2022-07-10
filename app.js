// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event){
    // prevent form from submitting
    event.preventDefault();
    // TODO div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add TODO to local storage
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class=" fas fa-check"> </i>'
    todoDiv.appendChild(completedButton);
    // check trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class=" fas fa-trash"> </i>'
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear todoinput value
    todoInput.value="";
}

function deletecheck(e){
    const item = e.target;
    // delete TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function(){
            todo.remove(); 
        });
    }
    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display ="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }
                else{
                    todo.style.display ="none";
                }
                break;
            }
    });
}

function saveLocalTodos(todo){
    // check- hey di I have already have thing i there
    let todos;
    if(localStorage.getItem("todos") === null){
       todos = []; 
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //crate div to hold the task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to the div - value of the query selector items are here.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl); // attaching the div to the li

    //add entire list item to the list
    taskToDoEl.appendChild(listItemEl); //this is the UL, were attaching li and div here

}


formEl.addEventListener("submit", createTaskHandler);
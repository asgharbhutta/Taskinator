var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

var createFormHandler = function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //package data as an object to be send to createTaskEl which is called at the end of this function
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //checking to see if the form fields have been filled out
    if(!taskNameInput||!taskTypeInput){
        alert("You need to fill out the task form")
        return false; //why do I need a return false statement here?
    }

    //make it so after the add task is pressed, the form inputs go back to default
    formEl.reset();

    //send the above to createTaskel as an argument using .notation
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj){ //taskDataObj is an object that contains the data from the input fields function above
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //crate div to hold the task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to the div - value of the query selector items are here passed in as args as an object
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); // attaching the div to the li

    //add entire list item to the list
    taskToDoEl.appendChild(listItemEl); //this is the UL, were attaching li and div here
}


formEl.addEventListener("submit", createFormHandler);
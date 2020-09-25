var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

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
    listItemEl.setAttribute("data-task-id", taskIdCounter); //add custom id to list item

    //crate div to hold the task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to the div - value of the query selector items are here passed in as args as an object
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); // attaching the div to the li

    var taskActionsEl = createTaskActions(taskIdCounter);

    listItemEl.appendChild(taskActionsEl);

    //add entire list item to the list
    taskToDoEl.appendChild(listItemEl); //this is the UL, were attaching li and div here

    //increase taskIdCounter for next unique list item
    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl); //attach the edit button to the Div container

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //create select dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do","In Progress","Completed"];

    for(var i = 0; i < statusChoices.length; i++){
        //create select element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //attach to the end of the select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}


formEl.addEventListener("submit", createFormHandler);

var taskButtonHandler = function(event){

    //delete button is clicked
    if(event.target.matches(".delete-btn")){
        //get elements taskId to uniquely identify the button
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    else if(event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
};

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

var editTask = function(taskId){
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

pageContentEl.addEventListener("click", taskButtonHandler);
let text = document.querySelector(".text-input");
let addButton = document.querySelector(".add-button");
let addTaskButton = document.querySelector(".add-task-button");
let inputDiv = document.querySelector(".input-div");
let downIcon = document.querySelector("#down-icon");
let deleteIcon = document.querySelector("#delete-icon");
let form = document.querySelector(".task-tracker-form");

let tasks = [];
let sortTask = true;
let editIndex = null;


addTaskButton.addEventListener("click", function () {
    let tracker = text.value.trim();
    if (tracker === "") {
        return;
    } else {
        tasks.push(tracker);
        mainTasks(); 
        text.value = "";
        inputDiv.style.display = "none";
    }
});


addButton.addEventListener("click", function () {
    inputDiv.style.display = "block";
    text.focus();
});

function mainTasks() {
    let lastList = document.querySelector(".tasks-list");
    if (lastList) {
        lastList.remove();
    }

    if (tasks.length === 0) {
        editIndex = null;
        return;
    }

    let tasksList = document.createElement("div");
    tasksList.className = "tasks-list";
   

    for (let i = 0; i < tasks.length; i++) {
        let taskItem = document.createElement("div");
        taskItem.className = "task-item";

        let numbers = document.createElement("span");
        numbers.className = "task-number";
        numbers.textContent = (i + 1) + ".";
        taskItem.appendChild(numbers);

        let taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = tasks[i];
        taskItem.appendChild(taskText);

        let actionsDiv = document.createElement("div");
        actionsDiv.className = "task-actions";

        let editBtn = document.createElement("button");
        let editIcon = document.createElement("span");

        if (i === editIndex) {
            editBtn.className = "confirm-edit-btn";
            editIcon.className = "add-task-icon";
        } else {
            editBtn.className = "edit-btn";
            editIcon.className = "edit-task-icon";
        }

        editBtn.appendChild(editIcon);
        
        editBtn.onclick = function() {
            if (i === editIndex) {
                if (text.value.trim() !== "") {
                    tasks[i] = text.value;
                }
                editIndex = null;
                inputDiv.style.display = "none";
                text.value = "";
                mainTasks();
            } else {
                editIndex = i;
                text.value = tasks[i];
                inputDiv.style.display = "block";
                text.focus();
                mainTasks();
            }
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        let deleteIconInner = document.createElement("span");
        deleteIconInner.className = "delete-task-icon";
        deleteBtn.appendChild(deleteIconInner);

        deleteBtn.onclick = function() {
            tasks.splice(i, 1);
            if (tasks.length === 0) {
                inputDiv.style.display = "block";
            }
            editIndex = null;
            mainTasks();
        };

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        taskItem.appendChild(actionsDiv);
        tasksList.appendChild(taskItem);
    }

   
    form.insertBefore(tasksList, inputDiv.nextSibling);
    
    if (inputDiv.style.display !== "none") {
        form.insertBefore(inputDiv, tasksList);
    }
}

deleteIcon.onclick = function () {
    text.value = "";
    text.focus();
};

downIcon.onclick = function () {
    if (tasks.length === 0) return;

    sortTask = !sortTask;

    if (sortTask) {
        tasks.sort(function(a, b) {
            return a.localeCompare(b, 'az');
        });
        downIcon.className = "sort-down";
    } else {
        tasks.sort(function(a, b) {
            return b.localeCompare(a, 'az');
        });
        downIcon.className = "sort-up";
    }

    mainTasks();
};
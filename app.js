function addTask() {
    let inputBox = document.getElementById("input-box");
    let listContainer = document.getElementById("list-container");

    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        // Create the checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = function() {
            toggleTaskHighlight(li, checkbox);
        };
        li.appendChild(checkbox);

        // Create the text span
        let span = document.createElement("span");
        span.textContent = inputBox.value;
        li.appendChild(span);

        // Create the edit button
        let editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = function() {
            editTask(li, span);
        };
        li.appendChild(editBtn);

        // Create the delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks(); // Save tasks after deletion
        };
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
        inputBox.value = "";

        saveTasks(); // Save tasks after adding a new one
    }
}

function toggleTaskHighlight(li, checkbox) {
    if (checkbox.checked) {
        li.classList.add("checked");
    } else {
        li.classList.remove("checked");
    }
    saveTasks(); // Save tasks after toggling highlight
}

function editTask(li, span) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    li.replaceChild(input, span);

    let saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";
    saveBtn.onclick = function() {
        saveTask(li, input, span, saveBtn);
    };
    li.appendChild(saveBtn);
}

function saveTask(li, input, span, saveBtn) {
    span.textContent = input.value;
    li.replaceChild(span, input);
    li.removeChild(saveBtn);
    saveTasks(); // Save tasks after editing
}

function saveTasks() {
    let listContainer = document.getElementById("list-container");
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        let task = {
            text: li.querySelector("span").textContent,
            checked: li.querySelector("input[type='checkbox']").checked
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        let listContainer = document.getElementById("list-container");
        tasks.forEach(task => {
            let li = document.createElement("li");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.checked;
            checkbox.onchange = function() {
                toggleTaskHighlight(li, checkbox);
            };
            li.appendChild(checkbox);

            let span = document.createElement("span");
            span.textContent = task.text;
            li.appendChild(span);

            let editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.textContent = "Edit";
            editBtn.onclick = function() {
                editTask(li, span);
            };
            li.appendChild(editBtn);

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function() {
                li.remove();
                saveTasks(); // Save tasks after deletion
            };
            li.appendChild(deleteBtn);

            if (task.checked) {
                li.classList.add("checked");
            }

            listContainer.appendChild(li);
        });
    }
}

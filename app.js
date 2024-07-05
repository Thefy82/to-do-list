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
        };
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
        inputBox.value = "";
    }
}

function toggleTaskHighlight(li, checkbox) {
    if (checkbox.checked) {
        li.classList.add("checked");
    } else {
        li.classList.remove("checked");
    }
}

function editTask(li, span) {
    // Create an input element with the current task text
    let input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    // Replace the span with the input element
    li.replaceChild(input, span);

    // Create a save button
    let saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";
    saveBtn.onclick = function() {
        saveTask(li, input, span, saveBtn);
    };
    li.appendChild(saveBtn);
}

function saveTask(li, input, span, saveBtn) {
    // Update the span text with the input value
    span.textContent = input.value;

    // Replace the input with the updated span
    li.replaceChild(span, input);

    // Remove the save button
    li.removeChild(saveBtn);
}

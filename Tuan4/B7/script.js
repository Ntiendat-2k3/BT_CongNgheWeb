const notyf = new Notyf();

// Tạo mảng danh sách các công việc từ localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log("🚀 ~ tasks:", tasks);

function displayTasks(filter = "") {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = ""; // Xóa danh sách cũ

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No task!.";
    li.style.textAlign = "center";
    li.style.color = "#888888";
    tasksList.appendChild(li);
    return;
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.setAttribute("data-id", task.id);

    if (task.isEditing) {
      // Tạo input chỉnh sửa tên công việc
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.name;
      editInput.classList.add("editable-input");

      // Tạo dropdown để chọn mức độ ưu tiên khi chỉnh sửa
      const editSelect = document.createElement("select");
      editSelect.classList.add("editable-select");
      const priorities = [
        { value: "low", text: "lower" },
        { value: "medium", text: "normal" },
        { value: "high", text: "high" },
      ];
      priorities.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.value;
        option.textContent = p.text;
        if (p.value === task.priority) {
          option.selected = true;
        }
        editSelect.appendChild(option);
      });

      // Lưu
      const saveBtn = document.createElement("button");
      saveBtn.classList.add("save-task-button");
      saveBtn.title = "Lưu";
      saveBtn.innerHTML = '<i class="fas fa-save"></i>';
      saveBtn.addEventListener("click", () => {
        saveEditTask(task.id, editInput.value.trim(), editSelect.value);
      });

      // Hủy
      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel-task-button");
      cancelBtn.title = "Hủy";
      cancelBtn.innerHTML = '<i class="fas fa-times"></i>';
      cancelBtn.addEventListener("click", () => {
        cancelEditTask(task.id);
      });

      // Thêm các phần tử vào li
      li.appendChild(editInput);
      li.appendChild(editSelect);

      // Tạo container cho các nút lưu và hủy
      const editButtonsContainer = document.createElement("div");
      editButtonsContainer.classList.add("edit-buttons-container");
      editButtonsContainer.appendChild(saveBtn);
      editButtonsContainer.appendChild(cancelBtn);
      li.appendChild(editButtonsContainer);
    } else {
      const taskText = document.createElement("span");
      taskText.textContent = `${index + 1}. ${task.name}`;
      taskText.classList.add("task-text");
      li.appendChild(taskText);

      // nút hoàn thành
      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = '<i class="fas fa-check"></i>';
      completeBtn.classList.add("complete-task-button");
      completeBtn.title = "Hoàn Thành";
      completeBtn.addEventListener("click", () => toggleCompleteTask(task.id));

      // chỉnh sửa
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.classList.add("edit-task-button");
      editBtn.title = "Chỉnh Sửa";
      editBtn.addEventListener("click", () => editTask(task.id));

      // nút xóa
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("delete-task-button");
      deleteBtn.title = "Xóa Công Việc";
      deleteBtn.addEventListener("click", () => confirmDeleteTask(task.id));

      // Thêm các nút vào danh sách công việc
      const buttonsContainer = document.createElement("div");
      buttonsContainer.appendChild(completeBtn);
      buttonsContainer.appendChild(editBtn);
      buttonsContainer.appendChild(deleteBtn);

      li.appendChild(buttonsContainer);
    }

    tasksList.appendChild(li);
  });
}

// cập nhật localStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// thêm công việc mới
function addTask(taskName, priority) {
  const newTask = {
    id: Date.now(),
    name: taskName,
    priority: priority,
    completed: false,
    isEditing: false,
  };
  tasks.push(newTask);
  updateLocalStorage();
  displayTasks(document.getElementById("searchInput").value.trim());
  notyf.success(`Đã thêm công việc: "${taskName}"`);
}

function confirmDeleteTask(taskId) {
  Swal.fire({
    title: "Bạn có chắc chắn?",
    text: "Bạn sẽ không thể khôi phục lại công việc này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTask(taskId);
    }
  });
}

// Xóa công việc
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const removedTask = tasks.splice(taskIndex, 1)[0];
    updateLocalStorage();
    displayTasks(document.getElementById("searchInput").value.trim());
    notyf.success(`Đã xóa công việc: "${removedTask.name}"`);
  } else {
    notyf.error("Không tìm thấy công việc để xóa.");
  }
}

// chỉnh sửa trực tiếp
function editTask(taskId) {
  // Trước khi chỉnh sửa, đảm bảo chỉ một công việc được chỉnh sửa
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isEditing: true };
    }
    return { ...task, isEditing: false };
  });
  displayTasks(document.getElementById("searchInput").value.trim());

  setTimeout(() => {
    const li = document.querySelector(`li[data-id="${taskId}"]`);
    if (li) {
      const input = li.querySelector(".editable-input");
      if (input) {
        input.focus();
      }
    }
  }, 100);
}

function saveEditTask(taskId, newTaskName, newPriority) {
  if (newTaskName === "") {
    notyf.error("Tên công việc không được để trống.");
    return;
  }
  if (!["low", "medium", "high"].includes(newPriority)) {
    notyf.error("Mức độ ưu tiên không hợp lệ.");
    return;
  }
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        name: newTaskName,
        priority: newPriority,
        isEditing: false,
      };
    }
    return task;
  });
  updateLocalStorage();
  displayTasks(document.getElementById("searchInput").value.trim());
  notyf.success("Chỉnh sửa công việc thành công.");
}

function cancelEditTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isEditing: false };
    }
    return task;
  });
  displayTasks(document.getElementById("searchInput").value.trim());
}

// đánh dấu hoàn thành công việc
function toggleCompleteTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  updateLocalStorage();
  displayTasks(document.getElementById("searchInput").value.trim());
  const task = tasks.find((task) => task.id === taskId);
  if (task.completed) {
    notyf.success(`Đã hoàn thành công việc: "${task.name}"`);
  } else {
    notyf.success(`Đã hủy hoàn thành công việc: "${task.name}"`);
  }
}

// Sắp xếp theo bảng chữ cái
function sortTasks() {
  if (tasks.length === 0) {
    notyf.error("Danh sách công việc trống, không thể sắp xếp.");
    return;
  }
  tasks.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  updateLocalStorage();
  displayTasks(document.getElementById("searchInput").value.trim());
  notyf.success("Đã sắp xếp danh sách công việc theo thứ tự bảng chữ cái.");
}

// thêm công việc
document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput").value.trim();
  const prioritySelect = document.getElementById("prioritySelect").value;

  if (taskInput === "") {
    notyf.error("Vui lòng nhập công việc trước khi thêm.");
    return;
  }

  addTask(taskInput, prioritySelect);
  document.getElementById("taskInput").value = ""; // reset input
});

// Enter
document.getElementById("taskInput").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    document.getElementById("addTaskButton").click();
  }
});

document.getElementById("sortButton").addEventListener("click", function () {
  sortTasks();
});

// search
document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.trim();
  displayTasks(filter);
});

document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
});

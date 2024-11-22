const notyf = new Notyf();

let names = ["An", "Bình", "Chi", "Dũng"];

function displayNames() {
  const nameList = document.getElementById("nameList");
  nameList.innerHTML = ""; // Xóa danh sách cũ

  names.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${name}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-item-button");
    deleteBtn.setAttribute("data-name", name);
    deleteBtn.setAttribute("title", "Xóa Tên");

    deleteBtn.addEventListener("click", function () {
      const nameToDelete = this.getAttribute("data-name");
      deleteNameByValue(nameToDelete);
    });

    li.appendChild(deleteBtn);
    nameList.appendChild(li);
  });
}

//  xóa tên theo giá trị
function deleteNameByValue(name) {
  let indices = [];
  names.forEach((item, index) => {
    if (item.toLowerCase() === name.toLowerCase()) {
      indices.push(index);
    }
  });

  if (indices.length === 0) {
    notyf.error(`Không tìm thấy tên "${name}" trong danh sách.`);
    return;
  }

  if (!confirm(`Bạn có chắc chắn muốn xóa tất cả các tên "${name}" không?`)) {
    return;
  }

  for (let i = indices.length - 1; i >= 0; i--) {
    names.splice(indices[i], 1);
  }

  displayNames();
  notyf.success(`Đã xóa tên "${name}" khỏi danh sách.`);
}

document.addEventListener("DOMContentLoaded", displayNames);

// Thêm
document.getElementById("addButton").addEventListener("click", function () {
  const nameInput = document.getElementById("nameInput").value.trim();
  if (nameInput !== "") {
    names.push(nameInput); // Thêm vào cuối mảng
    displayNames();
    notyf.success(`Đã thêm tên "${nameInput}" vào danh sách.`);
    document.getElementById("nameInput").value = "";
  } else {
    notyf.error("Vui lòng nhập tên trước khi thêm.");
  }
});

// Xóa đầu
document
  .getElementById("removeFirstButton")
  .addEventListener("click", function () {
    if (names.length > 0) {
      const removedName = names.shift(); // Xóa phần tử đầu mảng
      displayNames();
      notyf.success(`Đã xóa tên đầu tiên: "${removedName}".`);
    } else {
      notyf.error("Mảng rỗng, không có tên để xóa.");
    }
  });

// Xóa cuối
document
  .getElementById("removeLastButton")
  .addEventListener("click", function () {
    if (names.length > 0) {
      const removedName = names.pop(); // Xóa phần tử cuối mảng
      displayNames();
      notyf.success(`Đã xóa tên cuối cùng: "${removedName}".`);
    } else {
      notyf.error("Mảng rỗng, không có tên để xóa.");
    }
  });

// Xóa tên cụ thể
document
  .getElementById("deleteNameButton")
  .addEventListener("click", function () {
    const deleteNameInput = document
      .getElementById("deleteNameInput")
      .value.trim();
    if (deleteNameInput === "") {
      notyf.error("Vui lòng nhập tên cần xóa.");
      return;
    }
    deleteNameByValue(deleteNameInput);
    document.getElementById("deleteNameInput").value = ""; // Xóa ô nhập
  });

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
});

const users = [
  {
    email: "admin@edu.vn",
    password: "admin",
    role: "admin",
    access: ["home", "info", "viewList", "addStudent", "login"],
  },
  {
    email: "gv@edu.vn",
    password: "gv",
    role: "gv",
    access: ["home", "info", "viewList", "login"],
  },
  {
    email: "sv@edu.vn",
    password: "Sv",
    role: "sv",
    access: ["home", "info", "login"],
  },
];

let currentUser = null;
let students = [];

// Thêm sự kiện cho menu
document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  showHome();
});
document.getElementById("info").addEventListener("click", (e) => {
  e.preventDefault();
  showInfo();
});
document.getElementById("viewList").addEventListener("click", (e) => {
  e.preventDefault();
  showViewList();
});
document.getElementById("addStudent").addEventListener("click", (e) => {
  e.preventDefault();
  showAddStudent();
});
document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  showLogin();
});

// Hiển thị trang chủ khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  showHome();
  updateMenu();
  initializeTheme();
});

// Hàm hiển thị Trang chủ
function showHome() {
  showLoading(true);
  setTimeout(() => {
    // Giả lập thời gian tải
    document.getElementById("main-content").innerHTML = `
      <h2>Trang chủ</h2>
      <p>Chào mừng đến với hệ thống quản lý sinh viên.</p>
    `;
    showLoading(false);
  }, 500);
}

// Hàm hiển thị Thông tin
function showInfo() {
  showLoading(true);
  setTimeout(() => {
    document.getElementById("main-content").innerHTML = `
      <h2>Thông tin</h2>
      <p>Đây là trang thông tin về hệ thống.</p>
    `;
    showLoading(false);
  }, 500);
}

// Hàm hiển thị Danh sách sinh viên
function showViewList() {
  if (!checkAccess("viewList")) return;
  showLoading(true);
  setTimeout(() => {
    let content = "<h2>Danh sách sinh viên</h2>";
    if (students.length === 0) {
      content += "<p>Chưa có sinh viên nào.</p>";
    } else {
      content += `
        <table>
            <tr>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Điểm TB</th>
            </tr>
        `;
      students.forEach((student) => {
        content += `
            <tr>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.gpa}</td>
            </tr>
            `;
      });
      content += "</table>";
    }
    document.getElementById("main-content").innerHTML = content;
    showLoading(false);
  }, 500);
}

// Hàm hiển thị Thêm sinh viên
function showAddStudent() {
  if (!checkAccess("addStudent")) return;
  showLoading(true);
  setTimeout(() => {
    let content = `
      <h2>Thêm Sinh Viên</h2>
      <form id="add-student-form">
          <label>Họ tên:</label>
          <input type="text" name="name" placeholder="Nhập họ tên" required>
          <label>Ngày sinh:</label>
          <input type="date" name="dob" required>
          <label>Điểm TB (*):</label>
          <input type="number" name="gpa" min="0" max="10" step="0.01" required placeholder="Nhập điểm TB">
          <input type="submit" value="Thêm">
      </form>
    `;
    document.getElementById("main-content").innerHTML = content;
    showLoading(false);

    const form = document.getElementById("add-student-form");

    // Thực hiện Focus cho trường đầu tiên
    form.name.focus();

    // Thực hiện Validation khi submit
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      showLoading(true);
      const name = event.target.name.value.trim() || "N/A";
      const dob = event.target.dob.value || "N/A";
      const gpa = parseFloat(event.target.gpa.value);

      if (isNaN(gpa) || gpa < 0 || gpa > 10) {
        notyf.error("Điểm TB không hợp lệ! Vui lòng nhập giá trị từ 0 đến 10.");
        event.target.gpa.focus();
        showLoading(false);
        return;
      }

      if (gpa > 8.5) {
        // Sử dụng Notyf để hiển thị thông báo và confirm để xác nhận
        if (confirm("SV này có điểm xuất sắc. Bạn có muốn lưu?")) {
          saveStudent(name, dob, gpa);
          notyf.success("Thêm sinh viên thành công!");
        } else {
          notyf.info("Thêm sinh viên bị hủy.");
          showAddStudent();
        }
      } else {
        saveStudent(name, dob, gpa);
        notyf.success("Thêm sinh viên thành công!");
      }
      showLoading(false);
    });
  }, 500);
}

// Hàm lưu sinh viên
function saveStudent(name, dob, gpa) {
  students.push({ name, dob, gpa });
  showViewList();
}

// Hàm hiển thị Đăng nhập
function showLogin() {
  if (currentUser) {
    currentUser = null;
    notyf.success("Đã đăng xuất!");
    updateMenu();
    showHome();
    return;
  }

  showLoading(true);
  setTimeout(() => {
    let content = `
      <h2>Đăng nhập</h2>
      <form id="login-form">
          <label>Email:</label>
          <input type="email" name="email" required placeholder="Nhập email">
          <label>Mật khẩu:</label>
          <input type="password" name="password" required placeholder="Nhập mật khẩu">
          <input type="submit" value="Đăng nhập">
      </form>
    `;
    document.getElementById("main-content").innerHTML = content;
    showLoading(false);

    document
      .getElementById("login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        showLoading(true);
        const email = event.target.email.value.trim();
        const password = event.target.password.value;

        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          currentUser = user;
          notyf.success("Đăng nhập thành công!");
          updateMenu();
          showHome();
        } else {
          notyf.error("Email hoặc mật khẩu không đúng!");
        }
        showLoading(false);
      });
  }, 500);
}

// Kiểm tra quyền truy cập
function checkAccess(page) {
  if (!currentUser || !currentUser.access.includes(page)) {
    notyf.error("Bạn không có quyền truy cập!");
    return false;
  }
  return true;
}

// Cập nhật menu theo quyền
function updateMenu() {
  const menuItems = document.querySelectorAll("#menu li a, #menu li button");
  menuItems.forEach((item) => {
    const id = item.id;
    if (id === "login") {
      item.innerHTML = currentUser
        ? '<i class="fas fa-sign-out-alt"></i> Đăng xuất'
        : '<i class="fas fa-sign-in-alt"></i> Đăng nhập';
    } else if (id !== "") {
      const pageKey = id; // Sử dụng trực tiếp id làm pageKey
      if (currentUser && currentUser.access.includes(pageKey)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// Chuyển đổi giao diện sáng/tối
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    logo.src = "assets/imgs/logo-dark.svg";
  } else {
    logo.src = "assets/imgs/logo-light.svg";
  }

  // Thêm sự kiện cho nút chuyển đổi
  themeToggle.addEventListener("click", function () {
    showLoading(true);
    setTimeout(() => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        this.innerHTML = '<i class="fas fa-sun"></i>';
        logo.src = "assets/imgs/logo-dark.svg";
        notyf.success("Chế độ tối đã được kích hoạt!");
      } else {
        localStorage.setItem("theme", "light");
        this.innerHTML = '<i class="fas fa-moon"></i>';
        logo.src = "assets/imgs/logo-light.svg";
        notyf.success("Chế độ sáng đã được kích hoạt!");
      }
      showLoading(false);
    }, 300);
  });
}

// Hàm hiển thị hoặc ẩn loading indicator
function showLoading(show) {
  const loadingOverlay = document.getElementById("loading");
  if (show) {
    loadingOverlay.style.display = "flex";
  } else {
    loadingOverlay.style.display = "none";
  }
}

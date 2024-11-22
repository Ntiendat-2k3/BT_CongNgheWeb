function getCustomerInfo() {
  let name = prompt("Vui lòng nhập tên của bạn:");
  if (!validateName(name)) return;

  let email = prompt("Vui lòng nhập email của bạn:");
  if (!validateEmail(email)) return;

  let phone = prompt("Vui lòng nhập số điện thoại của bạn:");
  if (!validatePhone(phone)) return;

  let address = prompt("Vui lòng nhập địa chỉ của bạn:");
  if (!validateAddress(address)) return;

  let skype = prompt("Vui lòng nhập Skype của bạn:");
  if (!validateSkype(skype)) return;

  document.write(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <title>Thông Tin Khách Hàng</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
              }
              .info-container {
                  background-color: #ffffff;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  text-align: left;
              }
              h1 {
                  text-align: center;
                  color: #333333;
                  margin-bottom: 30px;
              }
              p {
                  font-size: 16px;
                  color: #555555;
                  margin-bottom: 10px;
              }
              .label {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="info-container">
              <h1>Thông Tin Khách Hàng</h1>
              <p><span class="label">Tên:</span> ${name}</p>
              <p><span class="label">Email:</span> ${email}</p>
              <p><span class="label">Số điện thoại:</span> ${phone}</p>
              <p><span class="label">Địa chỉ:</span> ${address}</p>
              <p><span class="label">Skype:</span> ${skype}</p>
          </div>
      </body>
      </html>
  `);
}

function validateName(name) {
  if (name === null) {
    alert("Bạn đã hủy bỏ quá trình nhập thông tin.");
    return false;
  }
  name = name.trim();
  if (name.length === 0) {
    alert("Tên không được để trống.");
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Tên chỉ được chứa chữ cái và khoảng trắng.");
    return false;
  }
  return true;
}

function validateEmail(email) {
  if (email === null) {
    alert("Bạn đã hủy bỏ quá trình nhập thông tin.");
    return false;
  }
  email = email.trim();
  if (email.length === 0) {
    alert("Email không được để trống.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ.");
    return false;
  }
  return true;
}

function validatePhone(phone) {
  if (phone === null) {
    alert("Bạn đã hủy bỏ quá trình nhập thông tin.");
    return false;
  }
  phone = phone.trim();
  if (phone.length === 0) {
    alert("Số điện thoại không được để trống.");
    return false;
  }
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ. Vui lòng nhập từ 10 đến 15 chữ số.");
    return false;
  }
  return true;
}

function validateAddress(address) {
  if (address === null) {
    alert("Bạn đã hủy bỏ quá trình nhập thông tin.");
    return false;
  }
  address = address.trim();
  if (address.length === 0) {
    alert("Địa chỉ không được để trống.");
    return false;
  }
  return true;
}

function validateSkype(skype) {
  if (skype === null) {
    alert("Bạn đã hủy bỏ quá trình nhập thông tin.");
    return false;
  }
  skype = skype.trim();
  if (skype.length === 0) {
    alert("Skype không được để trống.");
    return false;
  }
  const skypeRegex = /^[a-zA-Z0-9._-]+$/;
  if (!skypeRegex.test(skype)) {
    alert(
      "Skype không hợp lệ. Skype chỉ được chứa chữ cái, số, dấu chấm, gạch dưới và dấu gạch nối."
    );
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const getInfoButton = document.getElementById("getInfoButton");
  getInfoButton.addEventListener("click", getCustomerInfo);
});

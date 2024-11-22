const notyf = new Notyf();

document.getElementById("processButton").addEventListener("click", function () {
  const input = document.getElementById("arrayInput").value;

  // Kiểm tra nếu rỗng
  if (input.trim() === "") {
    notyf.error("Vui lòng nhập dữ liệu.");
    return;
  }

  // Tách chuỗi thành mảng số
  const numberArray = input
    .split(",")
    .map((item) => {
      const num = parseFloat(item.trim());
      return isNaN(num) ? null : num;
    })
    .filter((item) => item !== null);

  if (numberArray.length === 0) {
    notyf.error("Vui lòng nhập ít nhất một số hợp lệ.");
    return;
  }

  const sum = numberArray.reduce((acc, curr) => acc + curr, 0);

  const evenNumbers = numberArray.filter((num) => num % 2 === 0);
  const oddNumbers = numberArray.filter((num) => num % 2 !== 0);

  const min = Math.min(...numberArray);
  const max = Math.max(...numberArray);

  document.getElementById("sumResult").textContent = sum;
  document.getElementById("evenResult").textContent =
    evenNumbers.length > 0 ? evenNumbers.join(", ") : "Không có số chẵn";
  document.getElementById("oddResult").textContent =
    oddNumbers.length > 0 ? oddNumbers.join(", ") : "Không có số lẻ";
  document.getElementById("minResult").textContent = isFinite(min) ? min : "-";
  document.getElementById("maxResult").textContent = isFinite(max) ? max : "-";

  notyf.success("Xử lý thành công!");
});

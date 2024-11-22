const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "bottom",
  },
  types: [
    {
      type: "error",
      background: "#e74c3c",
      icon: false,
    },
    {
      type: "success",
      background: "#2ecc71",
      icon: false,
    },
  ],
});

document.getElementById("processButton").addEventListener("click", function () {
  const input = document.getElementById("arrayInput").value;

  if (input.trim() === "") {
    notyf.error("Vui lòng nhập các số, cách nhau bằng dấu phẩy.");
    return;
  }

  const numberArray = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  const parsedNumbers = [];
  for (let i = 0; i < numberArray.length; i++) {
    const num = parseFloat(numberArray[i]);
    if (isNaN(num)) {
      notyf.error(`Giá trị "${numberArray[i]}" không phải là số hợp lệ.`);
      return;
    }
    parsedNumbers.push(num);
  }

  if (parsedNumbers.length === 0) {
    notyf.error("Vui lòng nhập ít nhất một số hợp lệ.");
    return;
  }

  let max = parsedNumbers[0];
  let min = parsedNumbers[0];

  for (let i = 1; i < parsedNumbers.length; i++) {
    if (parsedNumbers[i] > max) {
      max = parsedNumbers[i];
    }
    if (parsedNumbers[i] < min) {
      min = parsedNumbers[i];
    }
  }

  document.getElementById("maxResult").textContent = max;
  document.getElementById("minResult").textContent = min;

  notyf.success("Xử lý thành công!");
});

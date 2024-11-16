document.getElementById("checkTriangle").addEventListener("click", function () {
  const getSide = (name) => {
    for (let attempts = 0; attempts < 3; attempts++) {
      let input = prompt(`Nhập độ dài cạnh ${name}:`);
      if (input === null) {
        displayError("Bạn đã hủy quá trình nhập liệu.");
        return null;
      }
      let side = parseFloat(input);
      if (!isNaN(side) && side > 0) {
        return side;
      }
      alert("Vui lòng nhập một số dương hợp lệ!");
    }
    displayError("Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau.");
    return null;
  };

  const displayError = (message) => {
    const errorDiv = document.getElementById("error");
    const resultDiv = document.getElementById("result");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    resultDiv.style.display = "none";
  };

  const displayResult = (message) => {
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
    resultDiv.textContent = message;
    resultDiv.style.display = "block";
    errorDiv.style.display = "none";
  };

  const a = getSide("a");
  if (a === null) return;

  const b = getSide("b");
  if (b === null) return;

  const c = getSide("c");
  if (c === null) return;

  if (a + b <= c || a + c <= b || b + c <= a) {
    displayError("Ba cạnh nhập vào không thể tạo thành một tam giác hợp lệ.");
    return;
  }

  let types = [];
  if (a === b && b === c) {
    types.push("Tam giác đều");
  } else {
    if (a === b || a === c || b === c) {
      types.push("Tam giác cân");
    }
    const [x, y, z] = [a, b, c].sort((m, n) => m - n);
    if (Math.abs(x * x + y * y - z * z) < 1e-10) {
      types.push("Tam giác vuông");
    }
  }

  const s = (a + b + c) / 2;
  const areaSquared = s * (s - a) * (s - b) * (s - c);
  const area =
    areaSquared > 0 ? Math.sqrt(areaSquared).toFixed(2) : "Không xác định";

  const resultMessage = `Loại tam giác: ${
    types.length > 0 ? types.join(", ") : "Không thuộc loại đều, cân hay vuông."
  }
; Diện tích tam giác: ${area} m².`;

  displayResult(resultMessage);
});

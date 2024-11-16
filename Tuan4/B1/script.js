document
  .getElementById("quadraticForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      resultDiv.style.display = "block";
      resultDiv.innerHTML =
        '<p class="error">Vui lòng nhập số hợp lệ cho các hệ số a, b, và c.</p>';
      return;
    }

    if (a === 0) {
      // Nếu hệ số a bằng 0 => PT bậc 1 hoặc vô nghĩa
      if (b === 0) {
        // Nếu cả a và b đều bằng 0, PT sẽ phụ thuộc vào c để xác định nghiệm
        if (c === 0) {
          // Nếu a, b, c = 0 => Vô số nghiệm
          resultDiv.innerHTML = "<p>Phương trình có vô số nghiệm.</p>";
        } else {
          // c != 0 => vô nghiệm (c là hằng số)
          resultDiv.innerHTML = "<p>Phương trình vô nghiệm.</p>";
        }
      } else {
        // Nếu a = 0, b != 0 => PT bậc 1
        const x = -c / b;
        resultDiv.innerHTML = `<p>Phương trình có nghiệm là: <strong>x = ${x.toFixed(
          3
        )}</strong></p>`;
      }
      resultDiv.style.display = "block";
      return;
    }

    const delta = b * b - 4 * a * c;

    if (delta > 0) {
      const sqrtDelta = Math.sqrt(delta);
      const x1 = (-b + sqrtDelta) / (2 * a);
      const x2 = (-b - sqrtDelta) / (2 * a);
      resultDiv.innerHTML = `
                    <p>Phương trình có hai nghiệm phân biệt:</p>
                    <p><strong>x₁ = ${x1.toFixed(3)}</strong></p>
                    <p><strong>x₂ = ${x2.toFixed(3)}</strong></p>
                `;
    } else if (delta === 0) {
      const x = -b / (2 * a);
      resultDiv.innerHTML = `<p>Phương trình có nghiệm kép:</p><p><strong>x = ${x.toFixed(
        3
      )}</strong></p>`;
    } else {
      resultDiv.innerHTML =
        "<p>Phương trình vô nghiệm trong tập hợp số thực.</p>";
    }

    resultDiv.style.display = "block";
  });

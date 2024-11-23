// Bài tập 1
function changeContent() {
  document.getElementById("paragraph1").textContent =
    "Đoạn văn đã được thay đổi!";
}

// Bài tập 2
let clickCount = 0;
function countClicks() {
  clickCount++;
  document.getElementById("clickCount").textContent = clickCount;
}

// Bài tập 3
function addItem() {
  const input = document.getElementById("newItem");
  const newItemText = input.value.trim();
  if (newItemText !== "") {
    const li = document.createElement("li");
    li.textContent = newItemText;
    document.getElementById("itemList").appendChild(li);
    input.value = "";
  } else {
    alert("Vui lòng nhập nội dung trước khi thêm!");
  }
}

// Bài tập 4
function changeBackground(color) {
  document.body.style.backgroundColor = color;
}

// Bài tập 5
function hideParagraph() {
  document.getElementById("toggleParagraph").style.display = "none";
}

function showParagraph() {
  document.getElementById("toggleParagraph").style.display = "block";
}

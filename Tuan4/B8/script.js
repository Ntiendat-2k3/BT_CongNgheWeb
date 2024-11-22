function handleButtonClick() {
  const userConfirmed = confirm(
    "Bạn có chắc chắn muốn thực hiện hành động này?"
  );

  if (userConfirmed) {
    alert("Bạn đã xác nhận hành động!");
  } else {
    alert("Bạn đã hủy bỏ hành động!");
  }
}

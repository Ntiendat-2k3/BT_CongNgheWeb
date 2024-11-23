const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "bottom",
  },
});

let isEditing = false;
let editingProductId = null;

//khởi tạo sản phẩm
function Product(id, name, price, quantity, image, time) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.image = image || "https://via.placeholder.com/60";
  this.time = time || new Date().toLocaleString();
}

const ProductManager = {
  products: [],

  init: function () {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
      this.showProducts();
      this.updateTotalValue();
    }
  },

  saveToLocalStorage: function () {
    localStorage.setItem("products", JSON.stringify(this.products));
  },

  addProduct: function (product) {
    this.products.push(product);
    this.showProducts();
    this.updateTotalValue();
    this.saveToLocalStorage();
    notyf.success("Thêm sản phẩm thành công!");
  },

  updateProduct: function (updatedProduct) {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.showProducts();
      this.updateTotalValue();
      this.saveToLocalStorage();
      notyf.success("Cập nhật sản phẩm thành công!");
    }
  },

  removeProduct: function (id) {
    this.products = this.products.filter(function (product) {
      return product.id !== id;
    });
    this.showProducts();
    this.updateTotalValue();
    this.saveToLocalStorage();
    notyf.error("Xóa sản phẩm thành công!");
  },

  getTotalValue: function () {
    return this.products.reduce(function (total, product) {
      return total + product.price * product.quantity;
    }, 0);
  },

  showProducts: function () {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";

    this.products.forEach(function (product) {
      const row = document.createElement("tr");

      const imageCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = product.image;
      imageCell.appendChild(img);

      const nameCell = document.createElement("td");
      nameCell.textContent = product.name;

      const priceCell = document.createElement("td");
      priceCell.textContent = product.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      const quantityCell = document.createElement("td");
      quantityCell.textContent = product.quantity;

      const totalCell = document.createElement("td");
      const totalPrice = product.price * product.quantity;
      totalCell.textContent = totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      const timeCell = document.createElement("td");
      timeCell.textContent = product.time;

      const actionCell = document.createElement("td");

      //  Sửa
      const editButton = document.createElement("button");
      editButton.textContent = "Sửa";
      editButton.classList.add("edit-btn");
      editButton.addEventListener("click", function () {
        loadProductToForm(product);
      });
      actionCell.appendChild(editButton);

      //  Xóa
      const removeButton = document.createElement("button");
      removeButton.textContent = "Xóa";
      removeButton.addEventListener("click", function () {
        Swal.fire({
          title: "Mua đi, đừng xóa mà 😭😭",
          text: "Hàng tốt lắm, mong bạn suy nghĩ lại nhaaa 😍",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            ProductManager.removeProduct(product.id);
            Swal.fire(
              "Đã xóa!",
              "Sản phẩm đã được xóa. Mong bạn quay lại nha😍",
              "success"
            );
          }
        });
      });
      actionCell.appendChild(removeButton);

      row.appendChild(imageCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(totalCell);
      row.appendChild(timeCell);
      row.appendChild(actionCell);

      productTableBody.appendChild(row);
    });
  },

  updateTotalValue: function () {
    const totalValueElement = document.getElementById("totalValue");
    const totalValue = this.getTotalValue();
    totalValueElement.textContent = totalValue.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  },
};

ProductManager.init();

function loadProductToForm(product) {
  isEditing = true;
  editingProductId = product.id;

  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productQuantity").value = product.quantity;

  const imagePreview = document.getElementById("imagePreview");
  imagePreview.src = product.image;
  imagePreview.style.display = "block";

  document.getElementById("formTitle").textContent = "Chỉnh sửa sản phẩm";
  document.getElementById("addProductButton").textContent = "Cập nhật sản phẩm";
}

// Thay đổi ảnh san phẩm
document.getElementById("productImage").addEventListener("change", function () {
  const imageInput = document.getElementById("productImage");
  const imagePreview = document.getElementById("imagePreview");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }
});

document
  .getElementById("addProductButton")
  .addEventListener("click", function () {
    const loadingImg = document.getElementById("loadingImg");
    loadingImg.style.display = "block";
    // NProgress.start();

    setTimeout(function () {
      const name = document.getElementById("productName").value.trim();
      const price = parseFloat(document.getElementById("productPrice").value);
      const quantity = parseInt(
        document.getElementById("productQuantity").value
      );

      const imageInput = document.getElementById("productImage");
      const imagePreview = document.getElementById("imagePreview");
      let imageUrl = "";

      if (imagePreview.src) {
        imageUrl = imagePreview.src;
      } else {
        imageUrl = "https://via.placeholder.com/60";
      }

      if (name && !isNaN(price) && !isNaN(quantity)) {
        if (isEditing) {
          // Cập nhật sản phẩm
          const updatedProduct = new Product(
            editingProductId,
            name,
            price,
            quantity,
            imageUrl,
            new Date().toLocaleString()
          );
          ProductManager.updateProduct(updatedProduct);
          isEditing = false;
          editingProductId = null;
          document.getElementById("formTitle").textContent = "Thêm sản phẩm";
          document.getElementById("addProductButton").textContent =
            "Thêm sản phẩm";
        } else {
          // Thêm sản phẩm mới
          const id = Date.now();
          const product = new Product(id, name, price, quantity, imageUrl);
          ProductManager.addProduct(product);
        }

        // Xóa nội dung các trường nhập sau khi thêm/cập nhật
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
        document.getElementById("productImage").value = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
      } else {
        notyf.error("Vui lòng nhập đầy đủ và chính xác thông tin sản phẩm.");
      }

      loadingImg.style.display = "none";
    }, 500);
  });

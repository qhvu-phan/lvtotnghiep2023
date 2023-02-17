var productApi = "http://localhost:5000/product";
var imageApi = "http://localhost:5000/image";
// handle controller
// var select = document.querySelector("#login");
// select.addEventListener("click", () => {
//   var add = document.querySelector(".login");
//   add.classList.add("show");
// });
// var addproduct = document.querySelector("#nav-header-add");
// addproduct.addEventListener("click", () => {
//   var add = document.querySelector("#addproduct");
//   add.classList.add("show");
// });

// var select2 = document.querySelector("#container");
// select2.addEventListener("click", () => {
//   var add = document.querySelector(".login");
//   var add1 = document.querySelector(".register");
//   add.classList.remove("show");
//   add1.classList.remove("show");
// });
// var select3 = document.querySelector("#close");
// select3.addEventListener("click", () => {
//   var add = document.querySelector(".addproduct");
//   add.classList.remove("show");
// });
// var select4 = document.querySelector("#closes");
// select4.addEventListener("click", () => {
//   var add = document.querySelector("#editproduct");
//   add.classList.remove("show");
// });

// handle function

function getProduct(callback) {
  fetch(productApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
    .then(() => {
      const edit = document.getElementsByClassName("edit");
      for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener("click", function (e) {
          //console.log(e.target.getAttribute("data-id"));
        });
      }
    });
}
function renderProduct(products) {
  var listProduct = document.querySelector(".content");
  var html = products.product.map(function (product) {
    return `
                   <div id="conten-mem-admin" class="delete-item-${
                     product.visible_id
                   }">
                           <div> <img src="img/${product.image_path.slice(
                             10
                           )}" alt="" width="200px" height="200px"></div>
                           <div class="title-content">${product.pro_name}</div>
                           <div class="price-buy">
                               <p>${product.pro_price}vnd</p>
                               <button class="edit" data-id="${
                                 product.visible_id
                               }" 
                               onclick="handleEditProduct('${
                                 product.visible_id
                               }')">Sửa</button>
                               <button id="delete" onclick="deleteProduct('${
                                 product.visible_id
                               }')">Xóa</button>
                           </div>
                       </div>         
                   `;
  });
  listProduct.innerHTML = html.join("");
}

function postProduct(data) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi, option) //product
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      if (products.message === "Product already exists") {
        alert("Sản phẩm đã tồn tại!");
      } else if (products.message === "success") {
        let id = products.data;
        var name = document.querySelector('input[name="pro_name"]').value;
        var image_path = document.querySelector(
          'input[name="image_file"]'
        ).value;
        console.log(image_path);
        if (image_path != "") {
          var data_image = {
            image_pro_id: id,
            image_name: name,
            image_path: image_path,
            image_size: "400kb",
          };
          var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data_image),
          };
          fetch(imageApi, options) // image
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              alert("success");
              getProduct(renderProduct);
            });
        } else {
          var data_image = {
            image_pro_id: id,
            image_name: name,
            image_path: "C:\fakepathcartnull.png",
            image_size: "400kb",
          };
          var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data_image),
          };
          fetch(imageApi, options) // image
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              alert("success");
              getProduct(renderProduct);
            });
        }
      }
    });
}

function handleCrateProduct() {
  var submitBtn = document.querySelector("#create");
  submitBtn.onclick = function () {
    var name = document.querySelector('input[name="pro_name"]').value;
    var type = document.querySelector(".pro_types").value;
    var nutritional = document.querySelector(
      'input[name="pro_description"]'
    ).value;
    var price = document.querySelector('input[name="pro_price"]').value;
    if (name == "" || type == "" || nutritional == "" || price == "") {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm");
    } else {
      var data = {
        pro_name: name,
        pro_type: type,
        pro_nutritional: nutritional,
        pro_price: price,
      };
      var add = document.querySelector("#addproduct");
      add.classList.remove("show");
      postProduct(data);
    }
  };
}

function deleteProduct(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(productApi + "/" + id, option)
    .then((response) => response.json())
    .then((response) => alert("Delete success!"));
  var upload = document.querySelector(".delete-item-" + id);
  upload.remove();
}
function editProduct(id) {
  let name = document.querySelector('input[name="pro_names"]').value;
  let type = document.querySelector(".pro_types").value;
  let nutritional = document.querySelector(
    'input[name="pro_descriptions"]'
  ).value;
  let price = document.querySelector('input[name="pro_prices"]').value;
  var image = document.querySelector('input[name="image_files"]').value;
  let data = {
    pro_name: name,
    pro_type: type,
    pro_nutritional: nutritional,
    pro_price: price,
    image_path: image,
  };
  let option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi + "/" + id, option)
    .then((response) => response.json())
    .then((response) => {
      switch (response.message) {
        case "success":
          alert("Cập nhật sản phẩm thành công");
          break;
        case "id not found":
          alert("Sản phẩm không tồn tại");
          break;
        case "image not found":
          alert("Không tìm thấy hình ảnh");
          break;
        default:
          alert("Lỗi hệ thống vui lòng thử lại sau");
      }
      getProduct(renderProduct);
      var add = document.querySelector("#editproduct");
      add.classList.remove("show");
    });
}
function handleEditProduct(id) {
  let show = document.querySelector("#editproduct");
  show.classList.add("show");
  let update = document.querySelector("#updates");
  update.onclick = () => {
    editProduct(id);
  };
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function handleLogout() {
  const logout = document.querySelector(".logout-btn");
  logout.addEventListener("click", () => {
    delete_cookie("jwt_ad");
    location.reload();
  });
}
handleLogout();
getProduct(renderProduct);

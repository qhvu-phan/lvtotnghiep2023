var orderApi = "http://localhost:5000/orders";
var productApi = "http://localhost:5000/product";
var imageApi = "http://localhost:5000/image";
const admin_manager_order_btn = document.querySelector(".admin-manager-order");
const admin_manager_product_btn = document.querySelector(
  ".admin-manager-product"
);
const admin_manager_order_new_btn = document.querySelector(
  ".admin-manager-order_new"
);
const content_order_table_form = document.querySelector(".content-order-table");
const admin_manger_product_form = document.querySelector(
  ".admin-content_show-product"
);
const admin_content_handle_product_form = document.querySelector(
  ".admin-content-handle_product"
);
const select_type_all_btn = document.querySelector(".select_type_all_btn");
const handle_product_container_form = document.querySelector(".handle_product");
const handle_product_update_container_form = document.querySelector(".handle_update-product");
const product_add_manager_btn = document.querySelector(".product_add-manager");
const cancel_add_product_btn = document.querySelector(".cancel-add-product");
const cancel_update_product_btn = document.querySelector(".cancel-update-product");
let order_all = [];
function showManagerOrder() {
  admin_manager_order_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "block";
    admin_content_handle_product_form.style.display = "none";
    getAllOrder();
  });
  admin_manager_product_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "none";
    admin_content_handle_product_form.style.display = "block";
  });
  product_add_manager_btn.addEventListener("click", () => {
    handle_product_container_form.style.display = "block";
  });
  cancel_add_product_btn.addEventListener("click", () => {
    handle_product_container_form.style.display = "none";
  });
  cancel_update_product_btn.addEventListener('click', () => {
    handle_product_update_container_form.style.display = "none";
  })
}
function getAllOrder() {
  fetch(orderApi)
    .then((response) => response.json())
    .then((orders) => {
      if (orders.message === "success") {
        order_all = [];
        let i = 1;
        let index = 0;
        const table_history_member_all_form = document.querySelector(
          ".table_history-member_all"
        );
        const index_new_order = document.querySelector(".index_new_order");
        const order_info = orders.order.map((order) => {
          let status = "Đang chờ duyệt";
          if (order.order_status === "2") {
            status = "Đang giao";
          } else if (order.order_status === "3") {
            status = "Đã nhận";
          } else if (order.order_status === "4") {
            status = "Đã hủy";
          } else if (order.order_status === "1") {
            index++;
          }
          let orders = {
            order_code: order.order_code,
            order_customer: order.order_code_customer,
            order_address: order.order_address,
            order_status: order.order_status,
            // order_date: order.order_date.slice(0, 10),
          };
          order_all.push(orders);
          return ` <tr class="table_history-member">
                  <td>${i++}</td>
                  <td class="order-code-update">${order.order_code}</td>
                  <td class="order-customer-update">${
                    order.order_code_customer
                  }</td>
                  <td class="history-details">Chi tiết đơn hàng</td>
                  <td>${order.order_address}</td>
                  <td><select class="order-update-status">
                  <option value="1">${status}</option>
                  <option value="2">Đang giao</option>
                  <option value="3">Đã nhận</option>
                  <option value="4">Đã hủy</option>
                  </select><i class="fas fa-sync-alt"></i></td>
                  <td>đang upadate lại</td>
                </tr>`;
        });
        index_new_order.innerHTML = "(" + index + ")";
        table_history_member_all_form.innerHTML = order_info.join(" ");
      }
    })
    .then(() => {
      handleUpdateAction();
    });
}
function handleUpdateAction() {
  const order_update_status_value = document.querySelectorAll(
    ".order-update-status"
  );
  const order_code_value = document.querySelectorAll(".order-code-update");
  const order_customer_value = document.querySelectorAll(
    ".order-customer-update"
  );
  const order_update_status_btn = document.querySelectorAll(".fa-sync-alt");
  for (let i = 0; i < order_update_status_btn.length; i++) {
    order_update_status_btn[i].addEventListener("click", () => {
      let data = {
        order_code: order_code_value[i].innerHTML,
        order_code_customer: order_customer_value[i].innerHTML,
        order_status: order_update_status_value[i].value,
      };
      let option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(orderApi + "/status", option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "update status success") {
            alert("Cập nhật trạng thái đơn hàng thành công");
          } else {
            alert("Lỗi hệ thống");
          }
        });
    });
  }
}
function handleRenderNewOrder(type) {
  const table_history_member_all_form = document.querySelector(
    ".table_history-member_all"
  );
  let i = 1;
  const order_new = order_all.map((order) => {
    if (order.order_status === type) {
      let status = "Đang chờ duyệt";
      if (order.order_status === "2") {
        status = "Đang giao";
      } else if (order.order_status === "3") {
        status = "Đã nhận";
      } else if (order.order_status === "4") {
        status = "Đã hủy";
      }
      return `
        <tr class="table_history-member">
              <td>${i++}</td>
              <td class="order-code-update">${order.order_code}</td>
              <td class="order-customer-update">${order.order_customer}</td>
              <td class="history-details">Chi tiết đơn hàng</td>
              <td>${order.order_address}</td>
              <td><select class="order-update-status">
              <option value="1">${status}</option>
              <option value="2">Đang giao</option>
              <option value="3">Đã nhận</option>
              <option value="4">Đã hủy</option>
              </select><i class="fas fa-sync-alt"></i></td>
              <td>đang update lại</td>
            </tr>
        `;
    }
  });
  table_history_member_all_form.innerHTML = order_new.join(" ");
  handleUpdateAction();
}
function handleRenderOrderBtn() {
  admin_manager_order_new_btn.addEventListener("click", () => {
    content_order_table_form.style.display = "block";
    admin_content_handle_product_form.style.display = "none";
    handleRenderNewOrder("1");
  });
  select_type_all_btn.onclick = function () {
    let select_order_type_value = document.querySelector(
      ".select_order_type_value"
    );
    if (select_order_type_value.value !== "") {
      handleRenderNewOrder(`${select_order_type_value.value}`);
    } else {
      getAllOrder();
    }
  };
}
//handle show all product
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
  admin_manger_product_form.innerHTML = html.join("");
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
function editProduct(id,data) {
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
      handle_product_update_container_form.style.display = "none";
    });
}
function handleEditProduct(id) {
  console.log(id);
  handle_product_update_container_form.style.display = "block";
  let update = document.querySelector(".update-product");
  update.onclick = () => { 
    let name = document.querySelector('input[name="pro_name_update"]').value;
    let type = document.querySelector(".pro_types_update").value;
    let nutritional = document.querySelector(
    'input[name="pro_description_update"]'
  ).value;
    let price = document.querySelector('input[name="pro_price_update"]').value;
    var image = document.querySelector('input[name="image_file_update"]').value;
    let data = {
      pro_name: name,
      pro_type: type,
      pro_nutritional: nutritional,
      pro_price: price,
      image_path: image,
    };
    editProduct(id,data);
    console.log(data);
  };
}
// handle create product
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
  // var submitBtn = document.querySelector(".create-product");
  // submitBtn.onclick = function () {
    console.log("run");
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
      postProduct(data);
    }
  // };
}
//handle logout
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
showManagerOrder();
handleRenderOrderBtn();
getAllOrder();
getProduct(renderProduct);

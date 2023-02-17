var cartsApi = "http://localhost:5000/carts";
var usersApi = "http://localhost:5000/users";
var ordersApi = "http://localhost:5000/orders";
var orderDetailApi = "http://localhost:5000/order_details";
const down = document.querySelectorAll(".fa-minus");
const count = document.querySelectorAll(".fa-plus");
const input = document.querySelectorAll(".quanity-input");
const delete_btn = document.querySelectorAll(".item-delete");
const message_box = document.querySelector(".cart-message");
const agree = document.querySelector(".message-btn-yes");
const cancel = document.querySelector(".message-btn-no");
const ship_money = document.querySelector(".cart-ship-money");
const total_product = document.querySelector(".cart-total-all_product");
const total_money = document.querySelector(".cart-total-money");
const customer_ship_money = document.querySelector(".customer-ship-money");
const customer_total_product = document.querySelector(
  ".customer-total-all_product"
);
const customer_total_money = document.querySelector(".customer-total-money");
const total_money_one_product = document.querySelectorAll(".cart-item-total");
const tooltip_price = document.querySelectorAll(".tooltip-price");
const background_hover = document.querySelector(".background-html-action");
const buying = document.querySelector(".cart-buy-action");
const back_to_cart = document.querySelector(".customer-back-cart");
const customer_info = document.querySelector(".content-customer-container");
const cart_info = document.querySelector(".content-cart-container");
const confirmation_order = document.querySelector(".customer-price-submit");
const message_cart_confirm = document.querySelector(".meesage-cart-container");
const cart_customer_id = document.querySelector(".cart-customer-id");
const customer_price_submit_btn = document.querySelector(
  ".customer-price-submit_btn"
);
const cart_cancle_btn_action = document.querySelector(
  ".cart-cancle-btn-action"
);
let user_address = document.querySelector("#customer-address");
let user_name = document.querySelector("#customer-name");
let user_phone = document.querySelector("#customer-phone");
let user_email = document.querySelector("#customer-email");
let background_loading_waiting_cart = document.querySelector(
  ".background-loading-waiting"
);
//handel get all product in cart
function getProductCart() {
  listCarts = [];
  fetch(cartsApi + "/" + cart_customer_id.getAttribute("data-id"))
    .then(function (response) {
      return response.json();
    })
    .then((products) => {
      products.product.map((product) => {
        let listProduct = {
          cart_user_id: cart_customer_id.getAttribute("data-id"),
          image_path: product.image_path,
          pro_description: product.pro_description,
          pro_name: product.pro_name,
          pro_price: product.pro_price,
          pro_quantity: product.pro_quantity,
          pro_type: product.pro_type,
          visible_id_pro: product.visible_id_pro,
        };
        listCarts.push(listProduct);
      });
      total();
    });
}
function total() {
  let sum = 0;
  if (listCarts.length != 0) {
    for (i = 0; i < listCarts.length; i++) {
      sum += parseInt(listCarts[i].pro_price * listCarts[i].pro_quantity);
    }
    ship_money.innerHTML = 20000 + `<u>đ</u>`;
    customer_ship_money.innerHTML = 20000 + `<u>đ</u>`;
  } else {
    sum = 0;
    ship_money.innerHTML = 0 + `<u>đ</u>`;
    customer_ship_money.innerHTML = 0 + `<u>đ</u>`;
  }
  total_product.innerHTML = sum + `<u>đ</u>`;
  total_money.innerHTML =
    parseFloat(sum + parseFloat(ship_money.innerHTML)) + `<u>đ</u>`;
  customer_total_product.innerHTML = sum + `<u>đ</u>`;
  customer_total_money.innerHTML =
    parseFloat(sum + parseFloat(ship_money.innerHTML)) + `<u>đ</u>`;
}

// handle update quantity
function handleCountDownInput() {
  let id;
  let value;
  for (let i = 0; i < down.length; i++) {
    handleTooltipPrice(input[i].value, i);
    down[i].addEventListener("click", (e) => {
      if (input[i].value <= 1) {
        return;
      }
      input[i].value--;
      handleTooltipPrice(input[i].value, i);
      handleSumOneProduct(input[i].value, listCarts[i].pro_price, i);
      handleCheckCart();
      id = e.target.getAttribute("data-id");
      value = input[i].value;
      handleUpdateQuantityProduct(id, value);
    });
    count[i].addEventListener("click", (e) => {
      if (input[i].value >= 10) {
        return;
      }
      input[i].value++;
      handleTooltipPrice(input[i].value, i);
      handleSumOneProduct(input[i].value, listCarts[i].pro_price, i);
      handleCheckCart();
      id = e.target.getAttribute("data-id");
      value = input[i].value;
      handleUpdateQuantityProduct(id, value);
    });
  }
}
function handleUpdateQuantityProduct(id, value) {
  let data = {
    cart_user_id: cart_customer_id.getAttribute("data-id"),
    cart_pro_id: id,
    cart_pro_quantity: value,
  };
  updateQuantity(data);
}
function updateQuantity(data) {
  let option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(cartsApi, option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "success") {
        getProductCart();
        total();
      } else alert("Lỗi hệ thống");
    });
}
function handleTooltipPrice(x, i) {
  if (x > 1) {
    tooltip_price[i].style.display = "block";
  } else {
    tooltip_price[i].style.display = "none";
  }
}
function handleSumOneProduct(x, y, z) {
  let sum_one_product = parseFloat(x * y);
  total_money_one_product[z].innerHTML = sum_one_product;
}
//handle delete product
function handleDeleteProductCart() {
  for (let i = 0; i < delete_btn.length; i++) {
    delete_btn[i].addEventListener("click", function (e) {
      let data = {
        cart_user_id: cart_customer_id.getAttribute("data-id"),
        cart_pro_id: `${e.target.getAttribute("data-id")}`,
      };
      handleStyleDisplayBlock();
      cancel.onclick = () => {
        handleMessageDisplayNone();
      };
      agree.onclick = () => {
        handleRemoveProduct(data, e.target.getAttribute("data-id"));
        handleMessageDisplayNone();
      };
    });
  }
}
function handleRemoveProduct(data, id) {
  let option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(cartsApi, option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "Delete success") {
        getProductCart();
        total();
        handleCheckCart();
      } else if (response.message === "cart_pro_id not found")
        alert("Sản phẩm không tồn tại");
      else alert("Lỗi hệ thống");
    });
  var upload = document.querySelector(".cart-item-" + id);
  upload.remove();
}

function handleStyleDisplayBlock() {
  message_box.style.display = "block";
  background_hover.style.display = "block";
}
function handleMessageDisplayNone() {
  message_box.style.display = "none";
  background_hover.style.display = "none";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function handleRenderInfoUser() {
  fetch(usersApi + "/" + getCookie("user-id"))
    .then((response) => response.json())
    .then((user) => {
      user_name.value = user.user[0].username;
      user_phone.value = user.user[0].phone;
      user_email.value = user.user[0].email;
      user_address.value = user.user[0].address;
    });
}
//handle buy product
function handleConfirmBuyProduct() {
  buying.addEventListener("click", () => {
    if (total_money.innerHTML != 0 + `<u>đ</u>`) {
      customer_info.style.display = "block";
      cart_info.style.display = "none";
    }
  });
  back_to_cart.addEventListener("click", () => {
    cart_info.style.display = "block";
    customer_info.style.display = "none";
  });
}
function handleOrderSubmit() {
  customer_price_submit_btn.onclick = function () {
    customer_info.style.display = "none";
    background_loading_waiting_cart.style.display = "block";
    setTimeout(() => {
      handleOrder();
    }, 1500);
    function handleOrder() {
      let data = {
        order_address: user_address.value,
      };
      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(ordersApi + "/" + getCookie("user-id"), option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "success") {
            let info = {
              cart_user_id: response.order_code_customer,
              cart_order_code: response.order_code,
            };
            let option_new = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(info),
            };
            fetch(cartsApi + "/order", option_new)
              .then((response) => response.json())
              .then((response) => {
                if (response.message !== "Order success") {
                  alert("Đặt hàng thất bại");
                } else {
                  background_loading_waiting_cart.style.display = "none";
                  message_cart_confirm.classList.remove("message-hide");
                }
              });
          } else alert("Lỗi hệ thống");
        });
    }
  };
}
//handle delete all product
function handleDeleteAllProduct() {
  cart_cancle_btn_action.addEventListener("click", () => {
    if (total_money.innerHTML != 0 + `<u>đ</u>`) {
      handleStyleDisplayBlock();
      cancel.onclick = () => {
        handleMessageDisplayNone();
      };
      agree.onclick = () => {
        background_loading_waiting_cart.style.display = "block";
        DeleteAll();
        handleMessageDisplayNone();
      };
    }
    function DeleteAll() {
      let user = {
        cart_user_id: getCookie("user-id"),
      };
      let option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      fetch(orderDetailApi + "/all", option)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "Delete all success") {
            setTimeout(() => {
              alert("Giỏ hàng đã được làm mới");
              background_loading_waiting_cart.style.display = "none";
              location.reload();
            }, 1000);
          }
        });
    }
  });
}
getProductCart();
handleCountDownInput();
handleDeleteProductCart();
handleConfirmBuyProduct();
handleRenderInfoUser();
handleOrderSubmit();
handleDeleteAllProduct();

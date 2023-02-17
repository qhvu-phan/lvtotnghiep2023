let orderApi = "http://localhost:5000/orders";
let orderDetailApi = "http://localhost:5000/order_details/order_details";
const order_details_logout_btn = document.querySelector(
  "#order_details-logout_btn"
);
const order_customer_id = document.querySelector(".order-customer-id");
let order_time = null;

//funtion handle cookie
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function handleLogoutUser() {
  order_details_logout_btn.addEventListener("click", () => {
    delete_cookie("jwt_us");
    delete_cookie("user-id");
    location.reload();
  });
}
setCookie("user-id", order_customer_id.getAttribute("data-id"), 1);
function handleRenderOrder(id) {
  fetch(orderApi + "/" + id)
    .then((response) => response.json())
    .then((orders) => {
      let i = 1;
      let order_member = document.querySelector(".order-render-member");
      document.querySelector(".order-customer-id").innerHTML = orders.name;
      let username = orders.name;
      let phone = orders.phone;
      let member_order = orders.order.map((order) => {
        let status = "Đang chờ duyệt";
        if (order.order_status === "2") {
          status = "Đang giao";
        } else if (order.order_status === "3") {
          status = "Đã nhận";
        } else if (order.order_status === "4") {
          status = "Đã hủy";
        }
        order_time = order.order_date;
        return `
             <tr class="table_history-member">
                <td>${i++}</td>
                <td>${order.order_code}</td>
                <td>${username} <br> ${phone}</td>
                <td class="history-details" data-order-id="${
                  order.order_code
                }">Chi tiết đơn hàng</td>
                <td>${order.order_address}</td>
                <td>${status}</td>
                <td>đang update lại</td>
             </tr>
              `;
      });
      order_member.innerHTML = member_order.join(" ");
    })
    .then(() => {
      const order_details = document.querySelectorAll(".history-details");
      const order_details_back_order_btn = document.querySelector(
        ".details-order-back-order_btn"
      );
      const details_order_container = document.querySelector(
        ".details-order-container"
      );
      const order_container = document.querySelector(
        ".order-details-container"
      );
      handleOrderDetailsBtn();
      function handleOrderDetailsBtn() {
        for (let i = 0; i < order_details.length; i++) {
          order_details[i].addEventListener("click", () => {
            console.log(order_details[i].getAttribute("data-order-id"));
            console.log(getCookie("user-id"));
            let data = {
              cart_user_id: getCookie("user-id"),
              cart_order_code: order_details[i].getAttribute("data-order-id"),
            };
            let option = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            fetch(orderDetailApi, option)
              .then((response) => response.json())
              .then((order_detail) => {
                let details_order_member = document.querySelector(
                  ".details-order-member"
                );
                let order_detail_code =
                  document.querySelector(".order-date_code");
                let order_detail_date = document.querySelector(".order_date");
                order_detail_code.innerHTML = order_detail.cart_order_code;
                order_detail_date.innerHTML =  "đang update lại"   //order_time.slice(0, 10);
                let total_money = 0;
                let product_list = order_detail.product.map((product) => {
                  total_money += parseInt(
                    product.pro_price * product.pro_quantity
                  );
                  return `
                   <tr class="table_history-member">
                   <td><img src="img/${product.image_path.slice(
                     10
                   )}" height="50px" width="50px"></td>
                   <td>${product.pro_name}</td>
                   <td>${product.pro_quantity}</td>
                   <td>${product.pro_price}<u>đ</u></td>
                   <td>${product.pro_price * product.pro_quantity}<u>đ</u></td>
                </tr>`;
                });
                details_order_member.innerHTML = product_list.join(" ");
                document.querySelector(".order_details-total_money").innerHTML =
                  total_money + `<u>đ</u>`;
              });
            order_container.style.display = "none";
            details_order_container.style.display = "block";
          });
        }
        order_details_back_order_btn.addEventListener("click", () => {
          order_container.style.display = "block";
          details_order_container.style.display = "none";
        });
      }
    });
}
handleRenderOrder(order_customer_id.getAttribute("data-id"));
handleLogoutUser();

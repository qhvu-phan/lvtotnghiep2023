var suggestionApi = "http://localhost:5000/suggestion_product";
const buy = document.querySelector(".suggestion-btn-action");
buy.addEventListener("click", () => {
  let select_type = document.querySelector("#suggestion-selection").value;
  let money = document.querySelector("#suggestion-input").value;
  suggestion(money, select_type);
});
function suggestion(money, select_type) {
  let data = {
    money: money,
  };
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(data);
  console.log(suggestionApi + "/" + select_type);
  fetch(suggestionApi + "/" + select_type, option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "success") {
        let suggestion_product = document.querySelector(
          ".suggestion-list-product"
        );
        let render = response.suggestion.map(function (product) {
          return `
            <div class="suggestion-product-item">
                <div class="content-product-item">
                   <div> <img src="/img/${product.image_path.slice(
                     10
                   )}" alt="" width="245px" height="200px"></div>
                     <div class="title-content"></div>
                         <div class="price-buy">
                               <span>SL:${product.quantity}</span>
                                <span>${product.pro_price}<u>đ</u></span>
                           </div>
                           <br>
                           <div class="info-nutritional">
                                <p>Dinh dưỡng: ${
                                  product.nutritional
                                }/1000<u>đ</u></p>          
                           </div><br>
                           <div class="buy">
                                    <button class="product-item-selection" onclick="handleBuyProduct('${
                                      product.visible_id
                                    }')">CHỌN MUA</button>
                            </div>
                </div>
             
            </div>
       `;
        });
        suggestion_product.innerHTML = render.join("");
        let description = document.querySelector(".suggestion-product-total");
        let text = ` <div class="suggestion-total-product suggestion-total">
                            <span>Sản phẩm mua được:</span> 
                            <label for="">${response.count}</label>
                        </div>
                        <div class="suggestion-total-money  suggestion-total">
                            <span>Tiền còn thừa:</span> 
                            <label for="">${response.money}<u> đ</u></label>
                        </div>
                        `;
        description.innerHTML = text;
      } else if (response.message === "invalid type") {
        alert("Loại sản phẩm không tồn tại");
      } else if (response.message === "money very small") {
        alert(response.money + "vnd" + " " + "không đủ để mua nhân phẩm");
      } else {
        alert("Lỗi hệ thống");
      }
    });
}

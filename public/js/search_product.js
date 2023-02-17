var productsApi = "http://localhost:5000/product";
var cartsApi = "http://localhost:5000/cart";
let search_value = document.querySelector(".topbar-search-input");
const search_container = document.querySelector(".topbar-search_product_item");
let listProducts = [];
function handleEventOninput() {
  search_value.addEventListener("input", () => {
    if (search_value.value !== "") {
      searchProduct(search_value.value);
      search_container.style.display = "block";
    } else {
      search_container.style.display = "none";
    }
  });
}

function getProductCart() {
  listProducts = [];
  fetch(productsApi)
    .then(function (response) {
      return response.json();
    })
    .then((products) => {
      products.product.map((product) => {
        let listProduct = {
          image_path: product.image_path,
          pro_description: product.pro_description,
          pro_name: product.pro_name,
          pro_price: product.pro_price,
          pro_quantity: product.pro_quantity,
          pro_type: product.pro_type,
          visible_id: product.visible_id,
        };
        listProducts.push(listProduct);
      });
    });
}
function searchProduct(value) {
  const regex = new RegExp(`${value.toLowerCase()}`);
  var listProduct = document.querySelector(".search-product-list");
  var html = listProducts.map((product) => {
    if (regex.test(product.pro_name.toLowerCase())) {
      return `
        <div class="search-prouduct-item">
             <div class="product-item-img">
                 <img src="/img/${product.image_path.slice(
                   10
                 )}" width="50px" height="50px" alt="">
             </div>
             <div class="product-item-content">
                 <div class="product-item-name">${product.pro_name}</div>
                 <div class="product-item-price">${
                   product.pro_price
                 }<u>đ</u></div>
             </div>
             <div class="product-item-select">
                 <button onclick="handleBuyProduct('${
                   product.visible_id
                 }')">Mua</button>
             </div>
        </div>
     `;
    }
  });
  search_container.style.display = "block";
  listProduct.innerHTML = html.join("");
}
function handleBuyProduct(id) {
  let data = {
    cart_user_id: "Yw8m41eVXwv4PS9HlDNJ",
    cart_pro_id: id,
  };
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(cartsApi, option)
    .then((response) => response.json())
    .then((response) => {
      if (response.message === "success") {
        alert("Thêm vào giỏ hàng thành công");
      } else if (response.message === "Product already exists")
        alert("Sản phẩm đã nằm trong giỏ hàng");
      else if (response.message === "product not found") {
        alert("Sản phẩm không tồn tại");
      }
    });
}
class SpeechRecognitionApi{
  constructor(options) {
      const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
      this.speechApi = new SpeechToText();
      this.speechApi.continuous = true;
      this.speechApi.interimResults = false;
      this.output = options.output ? options.output : document.createElement('div');
      console.log(this.output)
      this.speechApi.onresult = (event)=> { 
          console.log(event);
          var resultIndex = event.resultIndex;
          var transcript = event.results[resultIndex][0].transcript;

          console.log('transcript>>', transcript);
          console.log(this.output)
          searchProduct(transcript);   
          search_container.style.display = "block";
          this.output.value = transcript;
          
             
      }
  }
  init(){
      this.speechApi.start();
  }
  stop(){
      this.speechApi.stop();
  }
}

window.onload = function(){
  var speech = new SpeechRecognitionApi({
      output: document.querySelector('.topbar-search-input')
  })

  let temp = 0;
  let micro = document.querySelector('.fa-microphone-alt');
  
  micro.addEventListener('click', function () {
      if(temp == 0) {
          temp = 1;
          micro.style.color = 'red'
          speech.init()
      } else {
          temp = 0;
          micro.style.color = '#808080'
          speech.stop()
      } 
  })
}

getProductCart();
handleEventOninput();

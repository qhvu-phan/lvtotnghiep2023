var productsApi = "http://localhost:5000/product";
const button_search = document.querySelector('.search_button');
const button_close = document.querySelector('.close_button');
const show_advanced = document.querySelector('.search_option');

let listProducts1 = [];

let flag = 1;

button_search.onclick = () => {
  console.log("first");
    if(flag == 1) {
        flag = 2;
        show_advanced.style.display = 'flex';
    } else if (flag == 2) {
        flag = 1;
        advanced_search();
        // show_advanced.style.display = 'none';
    }  
}

button_close.onclick = () => {
    show_advanced.style.display = 'none';
}

function getProductCart() {
    listProducts1 = [];
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
          listProducts1.push(listProduct);
        });
      });
  }

function advanced_search () {
    let price = document.querySelector('#search_price').value;
    let made = document.querySelector('#search_made').value;
    let type = document.querySelector('#search_type').value;
    console.log("price" + price + " " + "made in" + made + " " + "type" + type);
    const convertValueMade = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const convertValuePrice = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const convertValueType = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const regex = new RegExp(`${convertValueMade.toLowerCase()}`);
    const regex1 = new RegExp(`${convertValuePrice.toLowerCase()}`);
    const regex2 = new RegExp(`${convertValueType.toLowerCase()}`);
    var listProduct = document.querySelector(".search-product-list");
    var html = listProducts1.map((product) => {
      if (regex.test(product.pro_description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) || 
          regex2.test(product.pro_type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
          regex1.test(product.pro_price.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) {
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
getProductCart();
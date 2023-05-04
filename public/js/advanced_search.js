var productsApi = "http://localhost:5000/product";
const button_search = document.querySelector('.search_button');
const button_close = document.querySelector('.close_button');
const show_advanced = document.querySelector('.search_option');

let listProducts1 = [];
let listProducts2 = [];

let flag = 1;

button_search.onclick = () => {
  console.log("first");
  if (flag == 1) {
    flag = 2;
    show_advanced.style.display = 'flex';
    search_container.style.display = 'none';
  } else if (flag == 2) {
    flag = 1;
    advanced_search();
    show_advanced.style.display = 'none';
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

function advanced_search() {
  listProducts2 =[];
  let price = document.querySelector('#search_price').value;
  let made = document.querySelector('#search_made').value;
  let type = document.querySelector('#search_type').value;

  let priceStart = price.slice(0, 5);
  let priceEnd = price.slice(6, 12);

  const convertValueMade = made.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  const convertValueType = type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

  const regex = new RegExp(`${convertValueMade.toLowerCase()}`);
  const regex2 = new RegExp(`${convertValueType.toLowerCase()}`);
  console.log(price + type + made);
  if (price !== 'none') {
    if (made === 'none') {
      if (type === 'none') {
        listProducts1.map((product) => {
          if ((priceStart < product.pro_price && product.pro_price < priceEnd)) {
            listProducts2.push(product);
          }
        });
        render();
      } else {
        listProducts1.map((product) => {
          if (regex2.test(product.pro_type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
            (priceStart < product.pro_price && product.pro_price < priceEnd)) {
            listProducts2.push(product);
          }
        });
        render();
      }
    } else if (made !== 'none') {
      if (type === 'none') {
        listProducts1.map((product) => {
          if (regex.test(product.pro_description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
            (priceStart < product.pro_price && product.pro_price < priceEnd)) {
            listProducts2.push(product);
          }
        });
        render();
      } else {
        listProducts1.map((product) => {
          if (regex.test(product.pro_description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
            regex2.test(product.pro_type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
            (priceStart < product.pro_price && product.pro_price < priceEnd)) {
            listProducts2.push(product);
          }
        });
        render();
      }
    }
  } else if (price === 'none') {
    if (made === 'none' && type !== 'none') {
      listProducts1.map((product) => {
        if (regex2.test(product.pro_type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) {
          listProducts2.push(product);
        }
      });
      render();
    } else if (made !== 'none' && type !== 'none') {
      listProducts1.map((product) => {
        if (regex.test(product.pro_description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) ||
          regex2.test(product.pro_type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) {
          listProducts2.push(product);
        }
      });
      render();
    } else if (made !== 'none' && type === 'none') {
      listProducts1.map((product) => {
        if (regex.test(product.pro_description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) {
          listProducts2.push(product);
        }
      });
      render();
    }
  }
}

function render() {
  console.log("run")
  var listProduct = document.querySelector(".search-product-list");
  if (listProducts2.length !== 0) {
    var html = listProducts2.map((product) => {
      return `
      <div class="search-prouduct-item">
           <div class="product-item-img">
               <img src="/img/${product.image_path.slice(
        10
      )}" width="50px" height="50px" alt="">
           </div>
           <div class="product-item-content">
               <div class="product-item-name">${product.pro_name}</div>
               <div class="product-item-price">${product.pro_price
        }<u>đ</u></div>
               <div class="more_infor" style="font-size:10px;">
                  <p>Xuất xứ: ${product.pro_description}, Loại: ${product.pro_type}</p>
                </div>
           </div>
           <div class="product-item-select">
               <button onclick="handleBuyProduct('${product.visible_id
        }')">Mua</button>
           </div>
      </div>
   `;
    })
    search_container.style.display = "block";
    listProduct.innerHTML = html.join("");
  } else {
    let empty = [1];
    var html = empty.map((temp) => {
      return `
      <div class="search-prouduct-item" style="text-align:center;">
           <div>
              Không có sản phẩm nào phù hợp
      </div>
   `;
    })
    search_container.style.display = "block";
    listProduct.innerHTML = html.join("");
  }
}
getProductCart();
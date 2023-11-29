// 變數宣告
const menu = document.getElementById("menu");
const cart = document.getElementById("cart");
const totalAmount = document.getElementById("total-amount");
const button = document.getElementById("submit-button");

let productData = [];
let cartItems = [];
let total = 0;

// GET API 菜單產品資料
axios
  .get("https://ac-w3-dom-pos.firebaseio.com/products.json")
  .then(function (response) {
    productData = response.data; // array
    displayProduct(productData);
  });

// 將產品資料加入菜單區塊
function displayProduct(products) {
  products.forEach(
    (product) =>
      (menu.innerHTML += `
    <div class="col-3 btn">
       <div class="card" data-id="${product.id}">
          <img src=${product.imgUrl} class="card-img-top" data-id="${product.id}" alt="...">
          <div class="card-body" data-id="${product.id}">
            <h5 class="card-title" data-id="${product.id}">${product.name}</h5>
            <p class="card-text" data-id="${product.id}">${product.price} 元</p>
            <a href="#" class="btn btn-info" data-id="${product.id}">add to cart</a>
          </div>
        </div>
      </div>
  `)
  );
}

// 加入購物車
function addToCart(event) {
  // 找到觸發event的node元素，並得到其產品id
  const id = event.target.dataset.id;
  // 在productData的資料裡，找到點擊的產品資訊 name, price
  const addedProduct = productData.find((product) => product.id === id);
  const name = addedProduct.name;
  const price = addedProduct.price;

  // 加入購物車變數cartItems 分：有按過、沒按過
  const targetCartItem = cartItems.find((item) => item.id === id);
  // 有按過 換數量的值
  if (targetCartItem) {
    targetCartItem.quantity += 1;
  } else {
    // 沒按過 加入新資料
    cartItems.push({
      id, // id :id
      name, // name: name
      price, // price: price
      quantity: 1, // quantity: quantity
    });
  }
  displayCartItems();
  calculateTotal();
}

// 畫面顯示購物車清單
function displayCartItems() {
  let html = "";
  cartItems.forEach((item) => {
    html += `<li class="list-group-item d-flex align-items-center">${
      item.name
    } X ${item.quantity} 小計：${item.price * item.quantity} 元
       <div id="quantity">
        <i class="fa-solid fa-circle-plus fa-2x btn" data-id="${item.id}"></i>
        <i class="fa-solid fa-circle-minus fa-2x btn" data-id="${item.id}"></i>
        <i class="fa-solid fa-circle-xmark fa-2x btn" data-id="${item.id}"></i>
       </div>
    </li>`;
  });
  cart.innerHTML = html;
}

// 編輯購物車內容
function editCart(event) {
  const editItem = cartItems.find(
    (item) => item.id === event.target.dataset.id
  );
  const index = cartItems.findIndex(
    (item) => item.id === event.target.dataset.id
  );
  const classList = event.target.classList;

  if (classList.contains("fa-circle-plus")) {
    editItem.quantity += 1;
  } else if (classList.contains("fa-circle-minus")) {
    if (editItem.quantity === 1) {
      cartItems.splice(index, 1);
    } else {
      editItem.quantity -= 1;
    }
  } else if (classList.contains("fa-circle-xmark")) {
    cartItems.splice(index, 1);
  }
  displayCartItems();
  calculateTotal();
}

// 計算總金額
function calculateTotal() {
  total = 0;
  cartItems.forEach((item) => (total += item.price * item.quantity));
  totalAmount.textContent = total;
}

// 送出訂單
function submit() {
  alert(`您的訂單金額為 : ${total} 元`);
}

// 重置資料
function reset() {
  cartItems = [];
  cart.innerHTML = "";
  total = 0;
  totalAmount.textContent = 0;
}

// 加入事件監聽
menu.addEventListener("click", addToCart);
button.addEventListener("click", submit);
button.addEventListener("click", reset);
cart.addEventListener("click", editCart);

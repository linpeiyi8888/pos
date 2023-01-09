// ======= default data =======
const menu = document.querySelector("#menu")
const cart = document.querySelector("#cart")
const totalAmount = document.querySelector("#total-amount")
const button = document.querySelector("#submit-button")
let totalPrice = 0 // 超級重要，要定義在功能2外面，否則每click一次，totalPrice就會歸0，永遠無法累計!

// 菜單資料
const productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
];

// 使用菜單資料產生menu區塊
function allMenu(foods) {  // foods是要執行forEach的陣列
  foods.forEach((food) => {  // food是指陣列裡面每個內容，也就是productData裡面的每個物件
    let htmlContent = `
    <div class="col-3">
     <div class="card">
        <img src="${food.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${food.name}</h5>
          <p class="card-text">${food.price}</p>
          <a href="#" class="btn btn-primary">加入購物車</a>
        </div>
      </div>
    </div>
    `
    menu.innerHTML += htmlContent // 記得要 += 內容才會全部出現
  })
}
allMenu(productData)

// 按加入購物車，購物車清單新增一列資料，並計算總金額
function addList(event) {
  let foodName = event.target.parentElement.children[0].textContent  // foodName是<h5>中的文字
  let price = event.target.parentElement.children[1].textContent  // price是<p>中的文字
  if (event.target.classList.contains("btn")) {  // 注意，要確保點擊的是加入購物車的按紐
    cart.innerHTML += `<li class="list-group-item">${foodName} X 1 小計：${price}</li>` // 把變數宣告好直接帶進來

    totalPrice += Number(price) // 總金額要往上加，price是字串，要用Number轉為數字
    totalAmount.textContent = totalPrice  // 將總金額塞到totalAmount中
  }
}
menu.addEventListener("click", addList)

// 送出訂單會跳出收據，收據確認後購物車會清空
function checkout (enent){
  alert(`感謝購買\n總金額：${totalAmount.textContent}`)
  totalAmount.textContent = '--' // 讓總金額為 '--'
  cart.innerHTML = ''  // 讓購物車清單清空
  totalPrice = 0  // 讓總金額歸零，在按完alert視窗確認後，讓總金額歸零，不然會從舊的往上加

}
button.addEventListener("click", checkout)
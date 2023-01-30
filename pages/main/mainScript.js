// --- create header ---

let header = document.createElement('header')
header.classList.add('header')
header.insertAdjacentHTML(
  'afterbegin',
  '<img class ="headerImg" src = "../../images/readers.jpeg"><h1 class ="headerTitle">Book & Shop</h1>'
)
document.body.append(header)

//--- create container ---

let div = document.createElement('div')
div.classList.add('container')
document.body.append(div)
let container = document.querySelector('.container')
// create Cart with title, order card and button

let cart = document.createElement('div')
cart.classList.add('cart')

let cartTitle = document.createElement('h2')
cartTitle.classList.add('cartTitle')
cartTitle.innerText = 'Cart'
cart.append(cartTitle)

let cartList = document.createElement('div')
cartList.classList.add('cartList', 'stikyCart')

let cartEmpty = document.createElement('div')
cartEmpty.classList.add('cartEmpty')
cartEmpty.innerText = 'Your cart is empty'
cartList.append(cartEmpty)
const cartListWrapper = document.createElement('div')
cartListWrapper.classList.add('cartListWrapper')
cartList.append(cartListWrapper)

let cartTotal = document.createElement('div')
cartTotal.classList.add('cartTotal')
cartTotal.innerHTML = '<p>Total: $<span class ="cartTotalPrice">0</span></p>'
cartList.append(cartTotal)

let orderBtn = document.createElement('button')
orderBtn.classList.add('orderBtn', 'myBtn')
orderBtn.innerText = 'Confirm order'
cartList.append(orderBtn)
cart.append(cartList)
container.append(cart)

// --- create catalog content ---
let catalogContent = document.createElement('div')
catalogContent.classList.add('catalogContent')
container.append(catalogContent)

//--- доступ к json данным ---

fetch('../books.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    showBook(data)
  })

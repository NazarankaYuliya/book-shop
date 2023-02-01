const outerContainer = document.querySelector('.outerContainer')
// --- create header ---
let header = document.createElement('header')
header.classList.add('header')
header.insertAdjacentHTML(
  'afterbegin',
  '<img class ="headerImg" src = "../../images/readers.jpeg"><h1 class ="headerTitle">Book & Shop</h1>'
)
outerContainer.append(header)

//--- create container ---

let div = document.createElement('div')
div.classList.add('container')
outerContainer.append(div)
let container = document.querySelector('.container')

// create footer
let footer = document.createElement('footer')
footer.classList.add('footer')
let footerName = document.createElement('h4')
footerName.classList.add('footerName')
footerName.innerText = 'Yuliya Nazaranka'
let logoGithub = document.createElement('img')
logoGithub.classList.add('logoGithub')
logoGithub.src = '../../images/github-mark-white.png'

let linkGithub = document.createElement('a')
linkGithub.classList.add('linkGithub')
linkGithub.href = 'https://github.com/NazarankaYuliya'
linkGithub.target = '_blank'

linkGithub.append(logoGithub)
footer.append(linkGithub, footerName)
outerContainer.append(footer)

// create Cart with title, order card and button

let cart = document.createElement('div')
cart.classList.add('cart')

let cartList = document.createElement('div')
cartList.classList.add('cartList', 'stikyCart')

let cartTitle = document.createElement('h2')
cartTitle.classList.add('cartTitle')
cartTitle.innerText = 'Cart'
cartList.append(cartTitle)

let cartEmpty = document.createElement('div')
cartEmpty.classList.add('cartEmpty')
cartEmpty.innerHTML =
  'Your cart is empty <br/><img class = "dropImg" src = "../../images/dragdrop.png">'
cartList.append(cartEmpty)
const cartListWrapper = document.createElement('div')
cartListWrapper.classList.add('cartListWrapper')
cartList.append(cartListWrapper)

let cartTotal = document.createElement('div')
cartTotal.classList.add('cartTotal')
cartTotal.innerHTML = '<p>Total: $<span class ="cartTotalPrice">0</span></p>'
cartList.append(cartTotal)

let orderBtn = document.createElement('a')
orderBtn.href = '../form/index.html'
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

fetch('books.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    showBook(data)
  })

// формирование карточки товара с данными
function showBook(data) {
  let fragment = new DocumentFragment()
  let bookEl = document.querySelector('.catalogContent')

  for (let el = 0; el < data.length; el++) {
    let book = document.createElement('div')
    book.classList.add('book')
    book.setAttribute('data-id', el + 1)

    let bookImg = document.createElement('div')
    bookImg.classList.add('bookImg')
    book.append(bookImg)

    let image = document.createElement('img')
    image.classList.add('image')
    image.setAttribute('draggable', 'true')
    image.src = data[el].imageLink
    bookImg.append(image)

    let bookContent = document.createElement('div')
    bookContent.classList.add('bookContent')
    book.append(bookContent)

    let author = document.createElement('h5')
    author.classList.add('author')
    author.innerText = data[el].author
    bookContent.append(author)

    let title = document.createElement('h3')
    title.classList.add('title')
    title.innerText = data[el].title
    bookContent.append(title)

    let price = document.createElement('div')
    price.classList.add('bookPrice')
    price.innerHTML = `<p>Price: $ <span class='price'>${data[el].price}</span></p>`
    bookContent.append(price)
    let showMore = document.createElement('button')
    showMore.classList.add('showMore', 'myBtn')
    showMore.innerText = 'Show More'
    bookContent.append(showMore)

    let addToBag = document.createElement('button')
    addToBag.classList.add('addToCart', 'myBtn')
    addToBag.innerText = 'Add To Cart'
    bookContent.append(addToBag)

    let buttons = document.createElement('div')
    buttons.classList.add('buttons')
    buttons.append(showMore, addToBag)
    bookContent.append(buttons)

    showMore.addEventListener('click', () => openModal(data[el]))

    fragment.append(book)
  }

  catalogContent.append(fragment)
}

// --- создание модального окна---

let modal = document.createElement('div')
modal.classList.add('modal')
container.append(modal)

let modalEl = document.querySelector('.modal')

// --- функция открытия модального окна ---

function openModal(el) {
  modalEl.classList.add('modalShow')
  document.body.classList.add('stop-scrolling')

  modalEl.innerHTML = `<div class='modalCard'>
<h3 class = 'modalTitle'>${el.title}</h3>
<p class ='modalDescription'>${el.description}</p>
<button type="button" class="modalBtnClose myBtn">Close</button>
</div>
`
  const btnClose = document.querySelector('.modalBtnClose')
  btnClose.addEventListener('click', closeModal)
}

// функции закрывающие модальное окно
// кликом на close
function closeModal() {
  modalEl.classList.remove('modalShow')
  document.body.classList.remove('stop-scrolling')
}
// кликом вне модального окна
window.addEventListener('click', (event) => {
  if (event.target === modalEl) {
    closeModal()
  }
})
// кликом на кнопку esc
window.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    closeModal()
  }
})

// oтслеживание кнопки Add to cart
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('addToCart')) {
    let book = event.target.closest('.book')
    addBookToCart(book)
  }
})

// формирование карточки и добавление ее в корзину
const cartListWrap = document.querySelector('.cartListWrapper')

function addBookToCart(book) {
  const orderBook = {
    id: book.dataset.id,
    imgSrc: book.querySelector('.image').getAttribute('src'),
    author: book.querySelector('.author').innerText,
    title: book.querySelector('.title').innerText,
    price: book.querySelector('.price').innerText,
  }
  // проверяем есть ли такая книга в корзине
  const itemInCart = cartListWrap.querySelector(`[data-id = "${orderBook.id}"]`)
  // если есть
  if (itemInCart) {
    const amountEl = itemInCart.querySelector('.bookAmount')
    amountEl.innerText = parseInt(amountEl.innerText) + 1
  } else {
    let orderCard = `<div class ='orderCard' data-id = '${orderBook.id}'>
      <img class='orderImg' src='${orderBook.imgSrc}'>
      <div class='orderContent'>
      <h6 class = 'orderBookAuthor'> ${orderBook.author}</h6>
      <h4 class = 'orderBookTitle'>${orderBook.title}</h4>
      <p class='oneBookTotal'>
      <span>$</span>
      <span class = 'orderBookPrice'>${orderBook.price}</span>
      <span>x</span>
      <span class = 'bookAmount'>1 </span></p>
      </div>
      <button class='deleteItemFromCart myBtn'>&times</button></div>`
    cartListWrap.insertAdjacentHTML('afterbegin', orderCard)
  }
  // пересчитываем корзину
  calcTotalPrice()
  // отображение статуса корзины
  toggleCartStatus()

  // обработчик для удаления книги из корзины

  cartListWrap.addEventListener('click', function (event) {
    if (event.target.closest('.deleteItemFromCart')) {
      removeBookFromCart()
      toggleCartStatus()
    }
  })
}

// функция для удаления товара из корзины
function removeBookFromCart() {
  event.target.closest('.orderCard').remove()
  calcTotalPrice()
}

// показывает/прячет статус корзины
function toggleCartStatus() {
  let cartListCounter = document.querySelector('.cartListWrapper')

  let cartEmptyStatus = document.querySelector('.cartEmpty')

  let confirmOrder = document.querySelector('.orderBtn')

  if (cartListCounter.children.length > 0) {
    cartEmptyStatus.style.display = 'none'
    confirmOrder.style.display = 'block'
  } else {
    cartEmptyStatus.style.display = 'block'
    confirmOrder.style.display = 'none'
  }
}
// считает общую стоимость товаров

function calcTotalPrice() {
  const cartList = document.querySelector('.cartList')
  const cartItems = cartList.querySelectorAll('.orderCard')
  let totalPriceEl = document.querySelector('.cartTotalPrice')

  let totalPrice = 0

  cartItems.forEach((el) => {
    const amountEl = el.querySelector('.bookAmount').innerText
    const priceEl = el.querySelector('.orderBookPrice').innerText
    const currentPrice = parseInt(amountEl) * parseInt(priceEl)
    totalPrice += currentPrice
  })
  totalPriceEl.innerText = totalPrice
}

// --- dragg and drop

const dropZone = document.querySelector('.cart')
let dragged = null

const dragOver = function (event) {
  event.preventDefault()
}
const dragEnter = function (event) {
  event.preventDefault()
}
const dragLeave = function (event) {}
function dragDrop(event) {
  this.classList.remove('hovered')
  let book = dragged.closest('.book')
  addBookToCart(book)
}

dropZone.addEventListener('dragover', dragOver)
dropZone.addEventListener('dragenter', dragEnter)
dropZone.addEventListener('dragleave', dragLeave)
dropZone.addEventListener('drop', dragDrop)

window.addEventListener('dragstart', function (event) {
  if (event.target.classList.contains('image')) {
    event.target.classList.add('drag')
    dragged = event.target
    const cart = this.document.querySelector('.cart')
    cart.classList.add('hovered')
  }
})

window.addEventListener('dragend', function (event) {
  if (event.target.classList.contains('image')) {
    event.target.classList.remove('drag')
    const cart = this.document.querySelector('.cart')
    cart.classList.remove('hovered')
  }
})

const confirmOrderBtn = document.querySelector('.orderBtn')
confirmOrderBtn.addEventListener('click', function () {
  const ItemsInCart = document.querySelector('.cartListWrapper').innerHTML
  const total = document.querySelector('.cartTotal').outerHTML
  localStorage.setItem('book', ItemsInCart)
  localStorage.setItem('total', total)
})

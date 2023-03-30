const outerContainer = document.querySelector('.outer-container')

// --- create header ---

const header = document.createElement('header')
header.classList.add('header')
header.insertAdjacentHTML(
  'afterbegin',
  '<img class ="header-img" src = "../../images/readers.jpeg"><h1 class ="header-title">Book & Shop</h1>'
)
outerContainer.append(header)

//--- create container ---

const container = document.createElement('div')
container.classList.add('container')
outerContainer.append(container)

// create footer

const footer = document.createElement('footer')
footer.classList.add('footer')

const footerName = document.createElement('h4')
footerName.classList.add('footer-name')
footerName.innerText = 'Yuliya Nazaranka'

const logoGithub = document.createElement('img')
logoGithub.classList.add('logo-github')
logoGithub.src = '../../images/github-mark-white.png'

const linkGithub = document.createElement('a')
linkGithub.classList.add('link-github')
linkGithub.href = 'https://github.com/NazarankaYuliya'
linkGithub.target = '_blank'

linkGithub.append(logoGithub)
footer.append(linkGithub, footerName)
outerContainer.append(footer)

// create Cart with title, order card and button

let cart = document.createElement('div')
cart.classList.add('cart')

let cartList = document.createElement('div')
cartList.classList.add('cart-list', 'stiky-cart')

const cartTitle = document.createElement('h2')
cartTitle.classList.add('cart-title')
cartTitle.innerText = 'Cart'
cartList.append(cartTitle)

const cartEmpty = document.createElement('div')
cartEmpty.classList.add('cart-empty')
cartEmpty.insertAdjacentHTML(
  'afterbegin',
  'Your cart is empty <br/><img class = "dropImg" src = "../../images/dragdrop.png">'
)

cartList.append(cartEmpty)
let cartListWrapper = document.createElement('div')
cartListWrapper.classList.add('cart-list-wrapper')
cartList.append(cartListWrapper)

let cartTotal = document.createElement('div')
cartTotal.classList.add('cart-total')
cartTotal.innerHTML = '<p>Total: $<span class ="cart-total-price">0</span></p>'

cartList.append(cartTotal)

const orderBtn = document.createElement('a')
orderBtn.href = '../form/index.html'
orderBtn.classList.add('order-btn', 'my-btn')
orderBtn.innerText = 'Confirm order'
cartList.append(orderBtn)
cart.append(cartList)
container.append(cart)

// --- create catalog content ---

const catalogContent = document.createElement('div')
catalogContent.classList.add('catalog-content')
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

  for (let el = 0; el < data.length; el++) {
    const book = document.createElement('div')
    book.classList.add('book')
    book.setAttribute('data-id', el + 1)

    const bookImg = document.createElement('div')
    bookImg.classList.add('book-img')
    book.append(bookImg)

    const image = document.createElement('img')
    image.classList.add('image')
    image.setAttribute('draggable', 'true')
    image.src = data[el].imageLink
    bookImg.append(image)

    const bookContent = document.createElement('div')
    bookContent.classList.add('book-content')
    book.append(bookContent)

    const author = document.createElement('h5')
    author.classList.add('author')
    author.innerText = data[el].author
    bookContent.append(author)

    const title = document.createElement('h3')
    title.classList.add('title')
    title.innerText = data[el].title
    bookContent.append(title)

    const price = document.createElement('div')
    price.classList.add('book-price')
    price.innerHTML = `<p>Price: $ <span class='price'>${data[el].price}</span></p>`
    bookContent.append(price)

    const showMore = document.createElement('button')
    showMore.classList.add('show-more', 'my-btn')
    showMore.innerText = 'Show More'
    bookContent.append(showMore)

    const addToBag = document.createElement('button')
    addToBag.classList.add('add-to-cart', 'my-btn')
    addToBag.innerText = 'Add To Cart'
    bookContent.append(addToBag)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    buttons.append(showMore, addToBag)
    bookContent.append(buttons)

    showMore.addEventListener('click', () => openModal(data[el]))

    fragment.append(book)
  }

  catalogContent.append(fragment)
}

let modal = document.createElement('div')
modal.classList.add('modal')
container.append(modal)

function openModal(el) {
  modal.classList.add('modal-show')
  document.body.classList.add('stop-scrolling')

  modal.innerHTML = `
  <div class='modal-card'>
      <h3 class = 'modal-title'>${el.title}</h3>
      <p class ='modal-description'>${el.description}</p>
      <button type="button" class="modal-btn-close my-btn">Close</button>
  </div>
  `

  const btnClose = document.querySelector('.modal-btn-close')
  btnClose.addEventListener('click', closeModal)
}

function closeModal() {
  modal.classList.remove('modal-show')
  document.body.classList.remove('stop-scrolling')
}

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    closeModal()
  }
})

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart')) {
    let book = event.target.closest('.book')
    addBookToCart(book)
  }
})

// const cartListWrap = document.querySelector('.cart-list-wrapper')

function addBookToCart(book) {
  const orderBook = {
    id: book.dataset.id,
    imgSrc: book.querySelector('.image').getAttribute('src'),
    author: book.querySelector('.author').innerText,
    title: book.querySelector('.title').innerText,
    price: book.querySelector('.price').innerText,
  }

  const itemInCart = cartListWrapper.querySelector(
    `[data-id = "${orderBook.id}"]`
  )

  if (itemInCart) {
    const amountEl = itemInCart.querySelector('.book-amount')
    amountEl.innerText = parseInt(amountEl.innerText) + 1
  } else {
    let orderCard = `
    <div class ='order-card' data-id = '${orderBook.id}'>
      <img class='order-img' src='${orderBook.imgSrc}'>
        <div class='order-content'>
          <h6 class = 'order-book-author'> ${orderBook.author}</h6>
          <h4 class = 'order-book-title'>${orderBook.title}</h4>
          <p class='one-book-total'>
            <span>$</span>
            <span class = 'order-book-price'>${orderBook.price}</span>
            <span>x</span>
            <span class = 'book-amount'>1 </span>
          </p>
        </div>
      <button class='delete-item-from-cart my-btn'>&times</button>
    </div>`

    cartListWrapper.insertAdjacentHTML('afterbegin', orderCard)
  }

  calcTotalPrice()
  toggleCartStatus()
}

cartListWrapper.addEventListener('click', function (event) {
  if (event.target.closest('.delete-item-from-cart')) {
    removeBookFromCart()
    toggleCartStatus()
  }
})

function removeBookFromCart() {
  event.target.closest('.order-card').remove()
  calcTotalPrice()
}

function toggleCartStatus() {
  if (cartListWrapper.children.length > 0) {
    cartEmpty.style.display = 'none'
    orderBtn.style.display = 'block'
  } else {
    cartEmpty.style.display = 'block'
    orderBtn.style.display = 'none'
  }
}

function calcTotalPrice() {
  const cartItems = cartList.querySelectorAll('.order-card')
  let totalPriceEl = document.querySelector('.cart-total-price')
  let totalPrice = 0

  cartItems.forEach((el) => {
    const amountEl = el.querySelector('.book-amount').innerText
    const priceEl = el.querySelector('.order-book-price').innerText
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
const dragLeave = function (event) {
  event.preventDefault()
}
const dragDrop = function (event) {
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
    cart.classList.add('hovered')
  }
})

window.addEventListener('dragend', function (event) {
  if (event.target.classList.contains('image')) {
    event.target.classList.remove('drag')
    cart.classList.remove('hovered')
  }
})

const confirmOrderBtn = document.querySelector('.order-btn')
confirmOrderBtn.addEventListener('click', function () {
  const itemsInCart = document.querySelector('.cart-list-wrapper').innerHTML
  let total = document.querySelector('.cart-total').outerHTML
  localStorage.setItem('book', itemsInCart)
  localStorage.setItem('total', total)
})

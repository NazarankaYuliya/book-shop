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

    showMore.addEventListener('click', () =>
      openModal(data[el].title, data[el].description)
    )

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

function openModal(title, description) {
  modalEl.classList.add('modalShow')
  document.body.classList.add('stop-scrolling')

  modalEl.innerHTML = `<div class='modalCard'>
<h3 class = 'modalTitle'>${title}</h3>
<p class ='modalDescription'>${description}</p>
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

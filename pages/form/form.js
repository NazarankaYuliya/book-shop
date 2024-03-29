const cart = document.querySelector('.cart')
const order = localStorage.getItem('book')
const total = localStorage.getItem('total')

window.onload = function () {
  cart.insertAdjacentHTML('beforeend', order)
  cart.insertAdjacentHTML('beforeend', total)
}

let today = new Date()
today.setDate(today.getDate() + 1)
let year = today.getFullYear()

let month = today.getMonth() + 1
if (month < 10) {
  month = '0' + month
}

let date = today.getDate()
if (date < 10) {
  date = '0' + date
}

let tomorrow = year + '-' + month + '-' + date

// set tomorrow as a min delivery date
const deliveryDate = document.getElementById('delivery-date')
deliveryDate.setAttribute('min', tomorrow)

// validation for inputs in personal data
const personalData = document.querySelectorAll('.personal-data > input')

for (let input of personalData) {
  input.addEventListener('blur', function () {
    let rule = this.id
    let value = this.value
    let check

    switch (rule) {
      case 'name':
        check = /^[а-яА-ЯёЁa-zA-Z]{4,}$/.test(value)
        break
      case 'surname':
        check = /^[а-яА-ЯёЁa-zA-Z]{5,}$/.test(value)
        break
      case 'street':
        check = /^[а-яА-ЯёЁa-zA-Z0-9\s]{5,}$/.test(value)
        break
      case 'house-number':
        check = /^[1-9]+[0-9]*$/.test(value)
        break
      case 'flat-number':
        check = /^[1-9]+[0-9-]*$/.test(value)
        break
      case 'delivery-date':
        check = this.value >= tomorrow
        break
    }

    if (check) {
      this.classList.remove('invalid')
      this.classList.add('valid')
      this.nextElementSibling.textContent = ''
    } else {
      this.classList.remove('valid')
      this.classList.add('invalid')
      let errorText = '*The field is invalid'
      this.nextElementSibling.textContent = errorText
    }

    isFormValid()
  })
}

// validation payment method
const paymentInfo = document.querySelector('.payment-info')
paymentInfo.addEventListener('change', function () {
  let paymentMethods = paymentInfo.querySelectorAll('input')
  for (let method of paymentMethods) {
    if (method.checked) {
      paymentInfo.classList.add('valid')
      isFormValid()
    }
  }
})

// only 2 gifts can be selected
let giftsChoose = document.querySelector('.gifts-choose')
giftsChoose.addEventListener('change', function () {
  let chosen = document.querySelectorAll('input[type=checkbox]:checked')
  let notChosen = document.querySelectorAll(
    'input[type=checkbox]:not(:checked)'
  )
  if (chosen.length == 2) {
    notChosen.forEach((el) => (el.disabled = true))
  } else {
    notChosen.forEach((el) => (el.disabled = false))
  }
})

// Complete button is disabled until the user full form with valid information

function isFormValid() {
  let validInputs = document.querySelectorAll('.valid')
  let submitFormBtn = document.querySelector('.submit-form-btn')
  if (validInputs.length === 7) {
    submitFormBtn.disabled = false
  } else {
    submitFormBtn.disabled = true
  }
}

// summarize form information

const form = document.querySelector('form')

function getFormValue() {
  event.preventDefault()

  let values = {}
  values.name = form.querySelector('[name="name"]').value
  values.surname = form.querySelector('[name="surname"]').value
  values.street = form.querySelector('[name="street"]').value
  values.houseNumber = form.querySelector('[name="house-number"]').value
  values.flatNumber = form.querySelector('[name="flat-number"]').value
  values.deliveryDate = form.querySelector('[name="delivery-date"]').value
  values.payment = form.querySelector('[name="payment"]:checked').value

  let gifts = form.querySelectorAll('[name="gifts"]:checked'),
    selectedGifts = []

  gifts.forEach((el) => {
    let label = document.querySelector(`label[for="${el.id}"]`)
    selectedGifts.push(label.innerText)
  })
  values.gifts = selectedGifts

  fillModalInfo(values)
}

function fillModalInfo(arg) {
  const modalTitle = document.querySelector('.modal-title')
  modalTitle.innerText = 'Your Order is Confirmed!'

  const modalDescription = document.querySelector('.modal-description')

  modalDescription.innerHTML = `
    <h4>Hello, ${arg.name} ${arg.surname}, </h4>
    <p>Thanks for placing your order with us. Below are the details of your order.</p>
    <h4>Delivery adress: ${arg.street} str. ${arg.houseNumber}, apt. ${arg.flatNumber} </h4>
    <h4> Delivery date: ${arg.deliveryDate} </h4>
    <h4>Payment method: ${arg.payment} </h4>
    <h4>Your order:</h4>
    <div class='modalOrderCard'>${order}</div>
    <h4>Your gifts: ${arg.gifts}</h4> ${total}`
}

const modalEl = document.querySelector('.modal')
function openModal() {
  modalEl.classList.add('modal-show')
  document.body.classList.add('stop-scrolling')
}

form.addEventListener('submit', openModal)
form.addEventListener('submit', getFormValue)

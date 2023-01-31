let cart = document.querySelector('.cart')
let order = localStorage.getItem('book')
let total = localStorage.getItem('total')

window.onload = function () {
  cart.insertAdjacentHTML('beforeend', order)
  cart.insertAdjacentHTML('beforeend', total)
}

// find today and tomorrow
let today = new Date()
today.setDate(today.getDate() + 1)

let year = today.getFullYear()
let month = today.getMonth() + 1
if (month.length !== 2) {
  month = '0' + month
}
let date = today.getDate()
if (date.length !== 2) {
  date = '0' + date
}
let tomorrow = year + '-' + month + '-' + date

// set tomorrow as a min delivery date
let deliveryDate = document.getElementById('deliveryDate')
deliveryDate.setAttribute('min', tomorrow)

// validation for inputs in personal data
let personalData = document.querySelectorAll('.personalData > input')

for (let input of personalData) {
  input.addEventListener('blur', function () {
    let rule = this.id
    let value = this.value
    let check
    switch (rule) {
      case 'name':
        check = /^[a-zA-Z]{4,}$/.test(value)
        break
      case 'surname':
        check = /^[а-яА-ЯёЁa-zA-Z]{5,}$/.test(value)
        break
      case 'street':
        check = /^[a-zA-Z0-9]{5,}$/.test(value)
        break
      case 'houseNumber':
        check = /^[1-9]+[0-9]*$/.test(value)
        break
      case 'flatNumber':
        check = /^[1-9]+[0-9-]*$/.test(value)
        break
      case 'deliveryDate':
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
let paymentInfo = document.querySelector('.paymentInfo')
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
let giftsChoose = document.querySelector('.giftsChoose')
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
  let submitFormBtn = document.querySelector('.submitFormBtn')
  if (validInputs.length === 7) {
    submitFormBtn.disabled = false
  } else {
    submitFormBtn.disabled = true
  }
}

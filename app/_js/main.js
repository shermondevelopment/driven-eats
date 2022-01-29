let cart = {};
let modalOpened = false
let client = {
  name: '',
  address: ''
}

const dishes = (titleElements) => {
 return document.querySelectorAll(`${titleElements}`);
}
/* remove o checked do alimento escolhido */

const removeChecked = (ifood) => {
  ifood.forEach( item => {  
      item.classList.remove('enable')
  } )
}

/* pega o valor do produto e convert */

const captureAndConvertNumber = (element) => {
 const value = parseFloat(element.querySelector('.options__third-title').innerHTML.replace(',', '.').match(/\d+,?.?\d+/i)[0])
 return value
}

/* adiciona o checked no alimento escolhido */

const order = (foodOption) => {
  let orders = {}
    if(!!foodOption.dataset.dishes) {
      orders = {
        ...orders,
        dishes: {
          title: foodOption.querySelector('.options__first-title').innerHTML,
          price: captureAndConvertNumber(foodOption)
        }
      }
    } else if (!!foodOption.dataset.drinks) {
      console.log(orders)
      orders = {
        ...orders,
        drinks: {
          title: foodOption.querySelector('.options__first-title').innerHTML,
          price: captureAndConvertNumber(foodOption)
        }
      }
    } else if(!!foodOption.dataset.dessert) {
      orders = {
        ...orders,
        dessert: {
          title: foodOption.querySelector('.options__first-title').innerHTML,
          price: captureAndConvertNumber(foodOption)
        }
      }
    }
    return orders;
}

/* adiciona produto ao cart */

const addToCart = (options) => {
 cart = {...cart, ...options}
 return cart;
}

const closeOrder = (cart) => {
  let enabled = false;
  if(cart.dishes && cart.drinks && cart.dessert) {
    enabled = true
  }
  return enabled
}

const enableButton = (enabled) => {
  if (enabled) {
    const button = document.querySelector('button');
    button.classList.add('enabled')
    button.innerHTML = "Fechar pedido"
  }
}

const writeOrder = () => {
  const orderList = document.querySelector('.order')
  const pedido = `
    <li>
      <span>${cart.dishes.title}</span>
      <span>${cart.dishes.price}</span>
    </li>
    <li>
      <span>${cart.drinks.title}</span>
      <span>${cart.drinks.price}</span>
    </li>
    <li>
      <span>${cart.dessert.title}</span>
      <span>${cart.dessert.price}</span>
    </li>
    <li>
      <span class="total__title">Total</span>
      <span class="total__title">${(cart.dessert.price + cart.dishes.price + cart.drinks.price).toFixed(2)}</span>
    </li>
  `;
  orderList.innerHTML = pedido;
}


const addChecked = (element, dishedList) => {
  const dishesElement = dishes(dishedList)
  removeChecked(dishesElement)
  element.classList.add('enable');
  const optionsIfood = order(element);
  const cart = addToCart(optionsIfood);
  const buttonStatus = closeOrder(cart);
  modalOpened = buttonStatus
  const button = enableButton(buttonStatus);
}

const infoClient = () => {
  const name = prompt("Informe seu nome")
  const address = prompt("Digite seu endereço")
  client.name = name
  client.address = address
  const message = `
    Olá, gostaria de fazer o pedido:
    - Prato: ${cart.dishes.title}
    - Bebida: ${cart.drinks.title}
    - Sobremesa: ${cart.dessert.title}
    Total: R$ ${(cart.dessert.price + cart.drinks.price + cart.dishes.price).toFixed(2)}
  `
  window.open(`https://wa.me/5588981225040?text=${encodeURIComponent(message)}`, '_blank')
  exitModal()
}

const openModal = () => {
  const modal = document.querySelector('.modal')
  if(modalOpened) {
    writeOrder()
    modal.setAttribute('style', 'display: flex');
  }
 }

 const exitModal = () => {
  const modal = document.querySelector('.modal')
  if(modalOpened) {
    modal.setAttribute('style', 'display: none');
  }
 }
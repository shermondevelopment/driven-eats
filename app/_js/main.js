const dishes = (titleElements) => {
 return document.querySelectorAll(`${titleElements}`);
}
/* remove o checked do alimento escolhido */

const removeChecked = (ifood) => {
  ifood.forEach( item => {  
      item.classList.remove('enable')
  } )
}

/* adiciona o checked no alimento escolhido */

const addChecked = (element, dishedList) => {
  const dishesElement = dishes(dishedList)
  removeChecked(dishesElement)
  element.classList.add('enable');
}

# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Screenshot

![screenshot mobile](https://github.com/Lo-Deck/Product-list-with-cart/blob/main/screenshot/Product%20list%20with%20cart-mobile.png).
![screenshot tablet](https://github.com/Lo-Deck/Product-list-with-cart/blob/main/screenshot/Product%20list%20with%20cart-tablet.png).
![screenshot desktop](https://github.com/Lo-Deck/Product-list-with-cart/blob/main/screenshot/Product%20list%20with%20cart-desktop.png).
![screenshot desktop-order](https://github.com/Lo-Deck/Product-list-with-cart/blob/main/screenshot/Product%20list%20with%20cart-desktop-order.png).



### Links

- Solution URL: [Repositories](https://github.com/Lo-Deck/Product-list-with-cart).
- Live Site URL: [Website](https://lo-deck.github.io/Product-list-with-cart/).



## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JS


### What I learned

I learned how to select data using `await` from a json and use it to make a website in order to command different products.

```js
async function fetchData(){

    const response = await fetch('./data.json');
    
    if(!response.ok){
        throw new Error('Could not fetch resource');
    }

    data = await response.json();

}
```

Add or cancel product in the menu element, increment or decrement and had value who change dynamically.


```js

  numberOfItem[i].children[1].children[0].innerText = `${arrayOrder[index].numberOfPlate}x`;
  numberOfItem[i].children[1].children[2].innerText = `$${arrayOrder[index].totalPricePerPlate}`; 

```

Add new node in the DOM with JS 

```js
const addPlate = `<div class="item">
                                   <p class="item-title text">${data[index].name}</p>
                                   <p><span class="text numberOfItem">${numberOfPlate}x</span><span class="text pricePerItem">@ $${(data[index].price).toFixed(2)}</span><span class="text-semiBold totalPerItem">$${(data[index].price * numberOfPlate).toFixed(2)}</span></p>
                                   <button class="item-button" onclick="deleteItem(this)"><img class="icon-close" src="./images/icon-remove-item.svg" alt=""></button>
                             </div>`;

                        divMenu.insertAdjacentHTML("afterbegin", addPlate);
                        totalPrice += data[index].price * numberOfPlate;
```

Finally erase some of the node `element.parentElement.remove();`.


### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.
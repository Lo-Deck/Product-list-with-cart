const btnAddToCart = document.querySelectorAll('.button-container');
const divMenu = document.querySelector('.item-selected');


let btnNewOrder;

let data;

async function fetchData(){

    const response = await fetch('./data.json');
    
    if(!response.ok){
        throw new Error('Could not fetch resource');
    }

    data = await response.json();

}

fetchData();


const initMenu = (element) => {

    Array.from(element.children).forEach( (item) => {

        item.remove();

    });

    const imageOrder = `<div id="imageCake">
                            <img class="image-order" src="./images/illustration-empty-cart.svg" alt="piece of cake">
                            <p class="text order-text">Your added items will appear here</p>             
                        </div>`;

    element.insertAdjacentHTML("afterbegin", imageOrder);    

};


const totalPlateMenu = () => {

    let totalPlate = 0;

    for(const number of arrayOrder)
    {
        if(number)
        {

            totalPlate += number.numberOfPlate;

        }

        document.getElementById('number-item').innerText = totalPlate;

    }

};


const confirmOrder = (data, array, totalPrice) => {

    const createConfirm = `<section class="order-confirmed">
                                <img class="image-confirmed" src="./images/icon-order-confirmed.svg" alt="">
                                <h2 class="title-confirmed text-superBold">Order Confirmed</h2>
                                <p class="text">We hope you enjoy your food!</p>
                                <div class="item-selected">
                                    <p class="total text">Order Total<span class="text-bold">$${totalPrice.toFixed(2)}</span></p>
                                    <button class="button-order text-semiBold" onclick="newOrder(divMenu)">Start New Order</button> 
                                </div>
                            </section>`            

    document.querySelector('.container').insertAdjacentHTML('afterend', createConfirm);


    for(const element of array)
    {

        if(element)
        {

            data.forEach( (item) => {

                if(element.name === item.name)
                {

                    const divItem = `<div class="item">
                                        <img class="item-image" src="${item.image.thumbnail}" alt="">
                                        <h2 class="item-title text">${item.name}</h2>
                                        <p><span class="text numberOfItem">${element.numberOfPlate}x</span><span class="text pricePerItem">@ $${(item.price).toFixed(2)}</span></p>
                                        <p class="text-semiBold totalPerItem">$${element.totalPricePerPlate}</p>
                                    </div>`;

                                    document.querySelector('.order-confirmed .item-selected').insertAdjacentHTML("afterbegin", divItem)
                        
                }

            });            
        }


    }

    document.querySelector('.order-confirmed').style.display = 'block';
    document.querySelector('.background').style.visibility = 'visible';
    document.querySelector('.order-confirmed .total span').innerText = `$${totalPrice.toFixed(2)}`;

};



const newOrder = (element) => {

    initMenu(element);

    document.querySelector('.order-confirmed').style.display = '';
    document.querySelector('.background').style.visibility = '';
    document.getElementById('number-item').innerText = 0;

    if(document.querySelector('.container-section .button-add-item'))
    {
        document.querySelector('.container-section .button-add-item').previousElementSibling.style.display = 'block';
        document.querySelector('.container-section .button-add-item').remove();
    }

    location.reload();

};



let numberOfPlate = 0;
let totalPrice = 0;
let arrayOrder = [];

btnAddToCart.forEach( (item, index) => {

    item.addEventListener('click', () => {

        numberOfPlate = arrayOrder[index]?.numberOfPlate ? arrayOrder[index]?.numberOfPlate : 0;

        for(let i = 0; i < btnAddToCart.length; i++)
        {

            if(i !== index)
            {

                if(btnAddToCart[i].nextElementSibling.classList.contains('button-add-item'))
                {
                    btnAddToCart[i].nextElementSibling.remove();
                    btnAddToCart[i].style.display = 'block';
                }
                
            }

        }

        item.style.display = 'none';

        const divElement = `<div class="button-add-item">
                                <button id="decrement"><img class="button-icon" src="./images/icon-decrement-quantity.svg" alt=""></button>
                                <span id="count">${arrayOrder[index]?.numberOfPlate ? arrayOrder[index]?.numberOfPlate : 0}</span>
                                <button id="increment"><img class="button-icon" src="./images/icon-increment-quantity.svg" alt=""></button>
                            </div>`;

        item.insertAdjacentHTML("afterend", divElement);

        const count = document.getElementById('count');
        const btnDecrement = document.getElementById('decrement');
        const btnIncrement = document.getElementById('increment');


        btnDecrement.addEventListener('click', () => {
    
            if(numberOfPlate > 0)
            {

                numberOfPlate--;

                count.innerText = numberOfPlate;


                if(arrayOrder[index])
                {

                    const numberOfItem = document.getElementsByClassName('item');

                    totalPrice -= data[index].price;

                    document.querySelector('.total span').innerText = `$${totalPrice.toFixed(2)}`;

                    arrayOrder[index].numberOfPlate -= 1;  
                    arrayOrder[index].totalPricePerPlate = (data[index].price * arrayOrder[index].numberOfPlate).toFixed(2);

                    for(let i = 0; i < numberOfItem.length; i++)
                    {

                        if(numberOfItem[i].children[0].innerText === `${data[index].name}`)
                        {

                            if(arrayOrder[index].numberOfPlate === 0)
                            {                         
                                numberOfItem[i].remove();
                                arrayOrder[index] = null;
                            }

                            else
                            {
                                numberOfItem[i].children[1].children[0].innerText = `${arrayOrder[index].numberOfPlate}x`;
                                numberOfItem[i].children[1].children[2].innerText = `$${arrayOrder[index].totalPricePerPlate}`;                                
                            }

                        }

                    }

                    if(numberOfItem.length === 0)
                    {

                        initMenu(divMenu);

                    }

                }

            }
            

            totalPlateMenu();

        });

        
        btnIncrement.addEventListener('click', () => {
            if(numberOfPlate < 10)
            {

                const imageCake = document.getElementById('imageCake');

                if(imageCake)
                {
                    imageCake.remove();                    
                }

                numberOfPlate++;

                count.innerText = numberOfPlate;   

                if(divMenu.children.length === 0)
                {

                    totalPrice += data[index].price * numberOfPlate;

                    const addPlate = `<div class="item">
                                        <p class="item-title text">${data[index].name}</p>
                                        <p><span class="text numberOfItem">${numberOfPlate}x</span><span class="text pricePerItem">@ $${(data[index].price).toFixed(2)}</span><span class="text-semiBold totalPerItem">$${(data[index].price * numberOfPlate).toFixed(2)}</span></p>
                                        <button class="item-button" onclick="deleteItem(this)"><img class="icon-close" src="./images/icon-remove-item.svg" alt=""></button>
                                    </div>
                                    <p class="total text">Order Total<span class="text-bold">$${totalPrice.toFixed(2)}</span></p>
                                    <p class="text">This is a <span>carbon-neutral</span> delivery</p>
                                    <button class="button-order text-semiBold" onclick="confirmOrder(data, arrayOrder, totalPrice)" >Confirm Order</button>`;


                    divMenu.insertAdjacentHTML("afterbegin", addPlate);

                    arrayOrder[index] = {

                        name: `${data[index].name}`,
                        numberOfPlate: 1,
                        totalPricePerPlate: (data[index].price * numberOfPlate).toFixed(2)

                    };

                }
                else
                {

                    if(arrayOrder[index])
                    {

                        const numberOfItem = document.getElementsByClassName('item');

                        totalPrice += data[index].price;

                        document.querySelector('.total span').innerText = `$${totalPrice.toFixed(2)}`;

                        arrayOrder[index].numberOfPlate += 1;

                        arrayOrder[index].totalPricePerPlate = (data[index].price * arrayOrder[index].numberOfPlate).toFixed(2);


                        for(let i = 0; i < numberOfItem.length; i++)
                        {

                            if(numberOfItem[i].children[0].innerText === `${data[index].name}`)
                            {

                                numberOfItem[i].children[1].children[0].innerText = `${arrayOrder[index].numberOfPlate}x`;
                                numberOfItem[i].children[1].children[2].innerText = `$${arrayOrder[index].totalPricePerPlate}`;

                            }

                        }

                    }
                    else
                    {

                        const addPlate = `<div class="item">
                                            <p class="item-title text">${data[index].name}</p>
                                            <p><span class="text numberOfItem">${numberOfPlate}x</span><span class="text pricePerItem">@ $${(data[index].price).toFixed(2)}</span><span class="text-semiBold totalPerItem">$${(data[index].price * numberOfPlate).toFixed(2)}</span></p>
                                            <button class="item-button" onclick="deleteItem(this)"><img class="icon-close" src="./images/icon-remove-item.svg" alt=""></button>
                                        </div>`;

                        divMenu.insertAdjacentHTML("afterbegin", addPlate);

                        totalPrice += data[index].price * numberOfPlate;

                        document.querySelector('.total span').innerText = `$${totalPrice.toFixed(2)}`;

                        arrayOrder[index] = {

                            name: `${data[index].name}`,
                            numberOfPlate: 1,
                            totalPricePerPlate: (data[index].price * numberOfPlate).toFixed(2)
    
                        };

                    }

                }


                totalPlateMenu();

            }
            
        });
        

    });

});





const deleteItem = (element) => {

    arrayOrder.forEach( (item, index) => {

        if(item)
        {

            if(element.previousElementSibling.previousElementSibling.innerText === item.name)
            {

                totalPrice = totalPrice.toFixed(2) - item.totalPricePerPlate

                document.querySelector('.total span').innerText = `$${totalPrice.toFixed(2)}`;

                arrayOrder[index] = null;

                element.parentElement.remove();

                if(document.querySelector('.container-section .button-add-item'))
                {
                    document.querySelector('.container-section .button-add-item').previousElementSibling.style.display = 'block';
                    document.querySelector('.container-section .button-add-item').remove();
                }

            }

        }

    });


    if(document.querySelectorAll('.item-selected .item').length === 0)
    {

        initMenu(divMenu);

    }

    totalPlateMenu();

};





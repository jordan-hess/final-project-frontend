const accessoriList = document.querySelector('.ass')
const saleList = document.querySelector('.onsale')
const secondassSale = document.querySelector('.for-sale')
const tHirdSale = document.querySelector('.three')
const fourSale = document.querySelector('.four')

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-access/')
    .then(res => res.json())
    .then(data => renderProduct(data))


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.access_id}>
                <img src="${item.access_image}" class="ass-card-pic"/>
                <h2 class="card-title">${item.access_name}</h2>
                <h3 class="card-desc">${item.access_desc}</h3>
                <h4 class="card-price">R${item.access_price}</h4>
                <button class="btn btn-primary shop-item-button" onclick=addtoCartclick(event) type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    accessoriList.innerHTML = output;
}


fetch('https://final-project-api1.herokuapp.com/view-sale-access/')
    .then(res => res.json())
    .then(data => renderSale(data))


const renderSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="cards-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="sale-card-pic"/>
                <h2 class="cards-title">${item.sale_pro_name}</h2>
                <h3 class="cards-desc">${item.sale_pro_desc}</h3>
                <h4 class="cards-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="btn btn-primary shop-item-button" onclick=addtoCartclick(event) type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleList.innerHTML = output;
}


function secondSale(){

    fetch('https://final-project-api1.herokuapp.com/view-sale-access2/')
    .then(res => res.json())
    .then(data => secSale(data))


    const secSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-ass">
            <div class="cards-ass" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="sale-card-ass"/>
                <h2 class="ass-cards-title">${item.sale_pro_name}</h2>
                <h3 class="ass-cards-desc">${item.sale_pro_desc}</h3>
                <h4 class="ass-cards-price">R${item.sale_pro_price}</h4>
                <h5 class="ass-cards-was-price">R${item.was_price}<h5>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    secondassSale.innerHTML = output;
}
}

secondSale()



function thirdSale(){

    fetch('https://final-project-api1.herokuapp.com/view-sale-access3/')
    .then(res => res.json())
    .then(data => thirdsSale(data))


    const thirdsSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-3">
            <div class="card-3-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card3-img"/>
                <h2 class="cards3title">${item.sale_pro_name}</h2>
                <h3 class="card3-desc">${item.sale_pro_desc}</h3>
                <h4 class="card3-price">R${item.sale_pro_price}</h4>
                <h5 class="card3-was-price">R${item.was_price}<h5>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    tHirdSale.innerHTML = output;
}
}

thirdSale()



function fourthSale(){

    fetch('https://final-project-api1.herokuapp.com/view-sale-access4/')
    .then(res => res.json())
    .then(data => fourthsSale(data))


    const fourthsSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-4">
            <div class="card-4-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card4-img"/>
                <h2 class="cards4title">${item.sale_pro_name}</h2>
                <h3 class="card4-desc">${item.sale_pro_desc}</h3>
                <h4 class="card4-price">R${item.sale_pro_price}</h4>
                <h5 class="card4-was-price">R${item.was_price}<h5>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    fourSale.innerHTML = output;
}
}

fourthSale()

function toCart(){

    var addToCartButton = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addtoCartclick)
    }
}

function addtoCartclick(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-title')[0].innerText 
    var price = shopItem.getElementsByClassName('card-price')[0].innerText
    var imageScr = shopItem.getElementsByClassName('ass-card-pic')[0].src
    addItemToCart(title , price, imageScr)
}

function addItemToCart(title, price, imageScr) {
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartItems.append(cartRow)
}
const accessoriList = document.querySelector('.ass')
const saleList = document.querySelector('.onsale')
const secondassSale = document.querySelector('.for-sale')
const tHirdSale = document.querySelector('.three')
const fourSale = document.querySelector('.four')
const cart = []
console.log(cart)

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-access/')
    .then(res => res.json())
    .then(data => renderProduct(data));


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.access_id}>
                <p style="display: none" class="class-id">${item.access_id}<p>
                <img src="${item.access_image}" class="ass-card-pic"/>
                <h2 class="card-title">${item.access_name}</h2>
                <h3 class="card-desc">${item.access_desc}</h3>
                <h4 class="card-price">R${item.access_price}</h4>
                <button class="btn btn-primary shop-item-button" value="${item.access_id}" onclick="addtoCartclick(event, ${item.access_id})" type="button">ADD TO CART</button>
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
            <div class="cards-body" value="${item.sale_pro_id}">
                <img src="${item.sale_pro_image}" class="sale-card-pic"/>
                <h2 class="cards-title">${item.sale_pro_name}</h2>
                <h3 class="cards-desc">${item.sale_pro_desc}</h3>
                <h4 class="cards-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="shop-sale sale-btn" value="${item.sale_pro_id}" onclick="addtoCartclick2(event, ${item.sale_pro_id})" type="button">ADD TO CART</button>
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

function addtoCartclick(event, id) {
    console.log(id);
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-title')[0].innerText 
    var price = shopItem.getElementsByClassName('card-price')[0].innerText
    var imageScr = shopItem.getElementsByClassName('ass-card-pic')[0].src
  
    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart(title , price, imageScr, id)
}

function addItemToCart(title, price, imageScr, cartItemId) {
    let cartPage = document.querySelector(".cart-items") 
    let inCart = document.querySelectorAll(".btn.btn-primary.shop-item-button")[cartItemId - 1]

    
    let item = {
        "name": title, 
        "price": price,
        "url": imageScr, 
        "id": cartItemId, 
        }

    if (inCart.value == item["id"]){
        cart.push(item)
        cart.forEach(() => {
        inCart.innerHTML = "";
        inCart.disabled = true;
        inCart.innerHTML += "In Cart Already";
    },
        cartPage.innerHTML +=`
        <div class="card">
        <div class="cards-body">
            <p style="display: none" class="id">${cartItemId}<p>
            <img src="${imageScr}" class="sale-card-pic"/>
            <h2 class="cards-title">${title}</h2>
            <h3 class="cards-desc">${price}</h3>
        </div>
    </div>
        `)
        console.log(cart)
    }
    
}


function saleToCart(){

    var addToCartButton2 = document.querySelectorAll('.shop-sale.btn')
    for (var i = 0; i < addToCartButton2.length; i++) {
        var button = addToCartButton2[i]
        button.addEventListener('click', addtoCartclick2)
    }
}


function addtoCartclick2(event, saleId) {
    console.log(saleId);
    var button2 = event.target
    let shopSale = button2.parentElement.parentElement
    var saleName = shopSale.getElementsByClassName('cards-title')[0].innerText 
    var salePrice = shopSale.getElementsByClassName('cards-price')[0].innerText
    var saleImg = shopSale.getElementsByClassName('sale-card-pic')[0].src
  
    let cards = [saleName, salePrice, saleImg]
    addSaleToCart( saleImg, saleName, salePrice, saleId)
}


function addSaleToCart(saleImg, saleName, salePrice, saleId) {
    let cartPage2 = document.querySelector(".cart-sale") 
    let saleCart = document.querySelector(".shop-sale.sale-btn")[saleId - 1]
    console.log(saleCart);
    let saleValue = saleCart.value
    
    let items = {
        "name": saleName, 
        "price": salePrice,
        "img": saleImg, 
        "saleId": saleId, 
        }

        console.log(items)
    if (saleValue === items["saleId"]){
        cart.push(items)
        cart.forEach(() => {
        saleValue.innerHTML = "";
        saleValue.disabled = true;
        saleValue.innerHTML += "In Cart Already";
    },
        cartPage2.innerHTML +=`
        <div class="card">
            <div class="cards-body">
                <p style="display: none" class="id">${saleId}<p>
                <img src="${saleImg}" class="sale-card-pic"/>
                <h2 class="cards-title">${saleName}</h2>
                <h3 class="cards-desc">${salePrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}
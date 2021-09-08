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
            <div class="cards-ass" data-id=${item.sale_pro_id} >
                <img src="${item.sale_pro_image}" class="sale-card-pic"/>
                <h2 class="cards-title">${item.sale_pro_name}</h2>
                <h3 class="cards-desc">${item.sale_pro_desc}</h3>
                <h4 class="cards-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="shop-sale-btn saleBtn" value="${item.sale_pro_id}" onclick="addtoCartclick3(event, ${item.sale_pro_id})" type="button">ADD TO CART</button>
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
                <button class="shop-this-sale salesBtn" value="${item.sale_pro_id}" onclick="addtoCartclick4(event, ${item.sale_pro_id})" type="button">ADD TO CART</button>
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
                <button class="last-saleBtn" value="${item.sale_pro_id}" onclick="addtoCartclick5(event, ${item.sale_pro_id})" type="button">ADD TO CART</button>
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
    console.log(inCart)

    
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
        <div class="incart-item">
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

    var addToCartButton2 = document.querySelectorAll('.shop-sale sale-btn')
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
    console.log(cards);
    addSaleToCart( saleImg, saleName, salePrice, saleId)
}


function addSaleToCart(saleImg, saleName, salePrice, saleId) {
    let cartPage2 = document.querySelector(".cart-sale") 
    let saleCart = document.querySelector(".shop-sale.sale-btn").value
    let saleCartBtn = document.querySelector('.shop-sale.sale-btn')

    let items = {
        "name": saleName, 
        "price": salePrice,
        "img": saleImg, 
        "salesId": saleId, 
        };
    let itemId = items["salesId"]
    console.log(itemId)

    if (saleId == itemId){
        cart.push(itemId)
        cart.forEach(() => {
            saleCartBtn.innerHTML = "";
            saleCartBtn.disabled = true;
            saleCartBtn.innerHTML += "In cart already";
        console.log(saleCartBtn);

    },
        cartPage2.innerHTML +=`
        <div class="card">
            <div class="incart-item">
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


function saleTwoCart(){

    var addToCartButton2 = document.querySelectorAll('.shop-sale-btn saleBtn')
    for (var i = 0; i < addToCartButton2.length; i++) {
        var button3 = addToCartButton2[i]
        button3.addEventListener('click', addtoCartclick3)
    }
}


function addtoCartclick3(event2, sale2Id) {
    console.log(sale2Id);
    var button3 = event2.target
    let shopSale2 = button3.parentElement.parentElement
    var salesName = shopSale2.getElementsByClassName('cards-title')[0].innerText 
    var salesPrice = shopSale2.getElementsByClassName('cards-price')[0].innerText
    var salesImg = shopSale2.getElementsByClassName('sale-card-pic')[0].src
  
    let cards2 = [salesName, salesPrice, salesImg]
    console.log(cards2);
    addSaleToCart2( salesImg, salesName, salesPrice, sale2Id)
}


function addSaleToCart2(salesImg, salesName, salesPrice, sale2Id) {
    let cartPage2 = document.querySelector(".cart-sale") 
    let sale2Btn = document.querySelector('.shop-sale-btn.saleBtn')

    let item = {
        "name": salesName, 
        "price": salesPrice,
        "img": salesImg, 
        "saleId": sale2Id, 
        };
    let item2Id = item["saleId"]
    console.log(item2Id)

    if (sale2Id == 10){
        cart.push(item2Id)
        cart.forEach(() => {
            sale2Btn.innerHTML = "";
            sale2Btn.disabled = true;
            sale2Btn.innerHTML += "In cart already";
        console.log(sale2Btn);
    },
    
        cartPage2.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${sale2Id}<p>
                <img src="${salesImg}" class="sale-card-pic"/>
                <h2 class="cards-title">${salesName}</h2>
                <h3 class="cards-desc">${salesPrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}



function saleThreeCart(){

    var addToCartButton3 = document.querySelectorAll('.shop-this-sale salesBtn')
    for (var i = 0; i < addToCartButton3.length; i++) {
        var button4 = addToCartButton3[i]
        button4.addEventListener('click', addtoCartclick4)
    }
}


function addtoCartclick4(event3, sale3Id) {
    console.log(sale3Id);
    var button4 = event3.target
    let shopSale3 = button4.parentElement.parentElement
    var sale3Name = shopSale3.getElementsByClassName('cards3title')[0].innerText 
    var sale3Price = shopSale3.getElementsByClassName('card3-price')[0].innerText
    var sale3Img = shopSale3.getElementsByClassName('card3-img')[0].src
  
    let cards2 = [sale3Name, sale3Price, sale3Img]
    console.log(cards2);
    addSaleToCart3( sale3Img, sale3Name, sale3Price, sale3Id)
}


function addSaleToCart3(sale3Img, sale3Name, sale3Price, sale3Id) {
    let cartPage2 = document.querySelector(".cart-sale") 
    let sale3Btn = document.querySelector('.shop-this-sale.salesBtn')

    let item = {
        "name": sale3Name, 
        "price": sale3Price,
        "img": sale3Img, 
        "sale3id": sale3Id, 
        };
    let item3Id = item["sale3id"]
    console.log(item3Id)

    if (sale3Id == 17){
        cart.push(item3Id)
        cart.forEach(() => {
            sale3Btn.innerHTML = "";
            sale3Btn.disabled = true;
            sale3Btn.innerHTML += "In cart already";
        console.log(sale3Btn);
    },
    
        cartPage2.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${sale3Id}<p>
                <img src="${sale3Img}" class="sale-card-pic"/>
                <h2 class="cards-title">${sale3Name}</h2>
                <h3 class="cards-desc">${sale3Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

function saleLastCart(){

    var addToCartButton4 = document.querySelectorAll('.last-saleBtn')
    for (var i = 0; i < addToCartButton4.length; i++) {
        var button5 = addToCartButton4[i]
        button5.addEventListener('click', addtoCartclick5)
    }
}


function addtoCartclick5(event4, sale4Id) {
    console.log(sale4Id);
    var button5 = event4.target
    let shopSale4 = button5.parentElement.parentElement
    var sale4Name = shopSale4.getElementsByClassName('cards4title')[0].innerText 
    var sale4Price = shopSale4.getElementsByClassName('card4-price')[0].innerText
    var sale4Img = shopSale4.getElementsByClassName('card4-img')[0].src
  
    let cards3 = [sale4Name, sale4Price, sale4Img]
    console.log(cards3);
    addSaleToCart5( sale4Img, sale4Name, sale4Price, sale4Id)
}


function addSaleToCart5(sale4Img, sale4Name, sale4Price, sale4Id) {
    let cartPage2 = document.querySelector(".cart-sale") 
    let sale4Btn = document.querySelector('.last-saleBtn')

    let item = {
        "name": sale4Name, 
        "price": sale4Price,
        "img": sale4Img, 
        "sale4id": sale4Id, 
        };
    let item4Id = item["sale4id"]
    console.log(item4Id)

    if (sale4Id == 14){
        cart.push(item4Id)
        cart.forEach(() => {
            sale4Btn.innerHTML = "";
            sale4Btn.disabled = true;
            sale4Btn.innerHTML += "In cart already";
        console.log(sale4Btn);
    },
    
        cartPage2.innerHTML +=`
        <div class="card">
            <div class="incart-item">
            <img src="${sale4Img}" class="sale-card-pic"/>
                <p style="display: none" class="id">${sale4Id}<p>
                <h2 class="cards-title">${sale4Name}</h2>
                <h3 class="cards-desc">${sale4Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

//   function to open modal
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}

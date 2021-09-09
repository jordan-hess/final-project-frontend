const forSale= document.querySelector('.new')
const forSale2= document.querySelector('.new2')
const saleOne = document.querySelector('.sale1')
const saleTwo = document.querySelector('.sale2')
const saleThree = document.querySelector('.sale3')
const saleFour = document.querySelector('.sale4')
const saleFive = document.querySelector('.sale5')
const saleSix = document.querySelector('.sale6')
const saleSeven = document.querySelector('.sale7')
const saleEight = document.querySelector('.sale8')
const saleNine = document.querySelector('.sale9')


function seeSale(){

    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe10/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.product_id}>
                <img src="${item.product_image}" class="card-pic"/>
                <h2 class="card-title">${item.product_name}</h2>
                <h3 class="card-desc">${item.product_desc}</h3>
                <h4 class="card-price">R${item.product_price}</h4>
                <button class="shop-it btn" value="${item.product_id}" onclick="addSaleCartclick2(event, ${item.product_id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forSale.innerHTML = output;
}
}

seeSale()


function seeSale2(){

    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe11/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.product_id}>
                <img src="${item.product_image}" class="card-pic"/>
                <h2 class="card-title">${item.product_name}</h2>
                <h3 class="card-desc">${item.product_desc}</h3>
                <h4 class="card-price">R${item.product_price}</h4>
                <button class="sale-shop btn" value="${item.product_id}" onclick="addSaleCartclick(event, ${item.product_id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forSale2.innerHTML = output;
}
}

seeSale2()

function firstSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe1/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="sale-shop btn" value="${item.product_id}" onclick="addTrendCartclick(event, ${item.product_id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleOne.innerHTML = output;
}
}
firstSale()

function secondSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe2/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleTwo.innerHTML = output;
}
}
secondSale()

function thirdSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe3/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleThree.innerHTML = output;
}
}
thirdSale()

function fourthSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe4/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleFour.innerHTML = output;
}
}
fourthSale()

function fifthSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe5/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleFive.innerHTML = output;
}
}
fifthSale()

function sixthSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe6/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleSix.innerHTML = output;
}
}
sixthSale()

function sevenSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe7/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleSeven.innerHTML = output;
}
}
sevenSale()

function eighthSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe8/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleEight.innerHTML = output;
}
}
eighthSale()

function lastSale(){
    // to view products 
    fetch('https://final-project-api1.herokuapp.com/view-sale-clothe9/')
    .then(res => res.json())
    .then(data => renderProduct(data))


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="card-pic"/>
                <h2 class="card-title">${item.sale_pro_name}</h2>
                <h3 class="card-desc">${item.sale_pro_desc}</h3>
                <h4 class="card-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleNine.innerHTML = output;
}
}
lastSale()

//   function to open Cart
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}

function saleToCart2(){

    var shopButton2 = document.querySelectorAll('.shop-it.btn')
    for (var i = 0; i < shopButton2.length; i++) {
        var addItembutton = Button[i]
        addItembutton.addEventListener('click', addSaleCartclick2)
    }
}


function addSaleCartclick2(event, salesId) {
    console.log(salesId);
    var salesButton = event.target
    let shopsSale = salesButton.parentElement.parentElement
    var salesName = shopsSale.getElementsByClassName('card-title')[0].innerText 
    var salesPrice = shopsSale.getElementsByClassName('card-price')[0].innerText
    var salesImg = shopsSale.getElementsByClassName('card-pic')[0].src
  
    let saleCard = [salesImg, salesName, salesPrice ]
    console.log(saleCard);
    addSaleToCart2( salesImg, salesName, salesPrice, salesId)
}


function addSaleToCart2(salesImg, salesName, salesPrice , salesId) {
    let cart = [];
    let salesPage = document.querySelector(".cart-sale") 
    let salesCartBtn = document.querySelector('.shop-it.btn')
    console.log(salesCartBtn);

    let items = {
        "name": salesName, 
        "price": salesPrice,
        "img": salesImg, 
        "theId": salesId, 
        };
    let itemsId = items["theId"]
    console.log(itemsId)

    if (salesId == itemsId){
        cart.push(itemsId)
        cart.forEach(() => {
        salesCartBtn.innerHTML = "";
        salesCartBtn.disabled = true;
        salesCartBtn.innerHTML += "In cart already";
        console.log(salesCartBtn);

    },
        salesPage.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${salesId}<p>
                <img src="${salesImg}" class="two-card-pic"/>
                <h2 class="two-card-title">${salesName}</h2>
                <h3 class="two-card-desc">${salesPrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}


function saleToCart(){

    var shopButton = document.querySelectorAll('.sale-shop.btn')
    for (var i = 0; i < shopButton.length; i++) {
        var addItembutton2 = Button[i]
        addItembutton2.addEventListener('click', addSaleCartclick)
    }
}


function addSaleCartclick(event, sales2Id) {
    console.log(sales2Id);
    var salesButton2 = event.target
    let shops2Sale = salesButton2.parentElement.parentElement
    var sales2Name = shops2Sale.getElementsByClassName('card-title')[0].innerText 
    var sales2Price = shops2Sale.getElementsByClassName('card-price')[0].innerText
    var sales2Img = shops2Sale.getElementsByClassName('card-pic')[0].src
  
    let saleCard = [sales2Img, sales2Name, sales2Price ]
    console.log(saleCard);
    addSaleToCart2( sales2Img, sales2Name, sales2Price, sales2Id)
}


function addSaleToCart2(sales2Img, sales2Name, sales2Price , sales2Id) {
    let cart = [];
    let sales2Page = document.querySelector(".cart-sale") 
    let sales2CartBtn = document.querySelector('.sale-shop.btn')
    console.log(sales2CartBtn);

    let item = {
        "name": sales2Name, 
        "price": sales2Price,
        "img": sales2Img, 
        "theId": sales2Id, 
        };
    let items2Id = item["theId"]
    console.log(items2Id)

    if (sales2Id == items2Id){
        cart.push(items2Id)
        cart.forEach(() => {
        sales2CartBtn.innerHTML = "";
        sales2CartBtn.disabled = true;
        sales2CartBtn.innerHTML += "In cart already";
        console.log(sales2CartBtn);

    },
        sales2Page.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${sales2Id}<p>
                <img src="${sales2Img}" class="two-card-pic"/>
                <h2 class="two-card-title">${sales2Name}</h2>
                <h3 class="two-card-desc">${sales2Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}
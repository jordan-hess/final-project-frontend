const productList = document.querySelector('.products');
const oneProduct = document.querySelector('.left-con');
const allTrends = document.querySelector('.right-con');
const thirdTrend = document.querySelector('.right-right-con');
const forthTrend = document.querySelector('.right4');
const fifthTrend = document.querySelector('.right5');
const sixTrend = document.querySelector('.right6');
const sevTrend = document.querySelector('.right7');
const form = document.getElementById('form');
const userName = document.getElementById('name');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');

let output = '';

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-product/')
    .then(res => res.json())
    .then(data => renderProduct(data))


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body first-slide" data-id=${item["product_id"]}>
                <img src="${item["product_image"]}" class="card-pic"/>
                <h2 class="card-title">${item["product_name"]}</h2>
                <h3 class="card-desc">${item["product_desc"]}</h3>
                <h4 class="card-price">R${item["product_price"]}</h4>
                <h5 class="card-cat">${item["product_cat"]}</h5>
                <button class="btn btn-primary shop-item-button" value="${item["product_id"]}" onclick="addtoCartclick(event, ${item["product_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    productList.innerHTML = output;
}

// following functions show trending products one at a time 
function viewFirst(){
    // to view #1 product on trending 
fetch('https://final-project-api1.herokuapp.com/view-trend/')
.then(response => response.json())
.then(data => {
    renderOne(data)})


const renderOne = (items) => {
    output = ""
items.forEach(items => {
    output += `
    <div class="one-card">
    <h1>Trending Kicks</h1>
        <div class="cards-body" data-id=${items.trend_id}>
            <h2 class="cards-num">#${items.trend_num}</h2>
            <img src="${items.trend_image}" class="cards-pic"/>
            <h2 class="cards-title">${items.trend_name}</h2>
            <h3 class="cards-desc">${items.trend_desc}</h3>
            <h4 class="cards-price">R${items.trend_price}</h4>
            <h5 class="cards-cat">${items.trend_cat}</h5>
            <button class="shop-trend btn" value="${items["trend_id"]}" onclick="addTrendCartclick(event, ${items["trend_id"]})" type="button">+</button>
        </div>
    </div>
    `;
});
oneProduct.innerHTML = output;
}
}
viewFirst()


function addSecond(){
    fetch('https://final-project-api1.herokuapp.com/view-trends/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="two-card">
            <div class="two-card-body" data-id=${items.trend_id}>
                <h2 class="two-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="two-card-pic"/>
                <h2 class="two-card-title">${items.trend_name}</h2>
                <h3 class="two-card-desc">${items.trend_desc}</h3>
                <h4 class="two-card-price">R${items.trend_price}</h4>
                <h5 class="two-card-cat">${items.trend_cat}</h5>
                <button class="shop-trends btnTwo" value="${items["trend_id"]}" onclick="addTrendCartclick2(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    allTrends.innerHTML = output;
}

}

addSecond()


function addThird(){
    fetch('https://final-project-api1.herokuapp.com/view-trends3/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="three-card">
            <div class="three-card-body" data-id=${items.trend_id}>
                <h2 class="three-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="three-card-pic"/>
                <h2 class="three-card-title">${items.trend_name}</h2>
                <h3 class="three-card-desc">${items.trend_desc}</h3>
                <h4 class="three-card-price">R${items.trend_price}</h4>
                <h5 class="three-card-cat">${items.trend_cat}</h5>
                <button class="shop-this-item btn" value="${items["trend_id"]}" onclick="addTrendCartclick3(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    thirdTrend.innerHTML = output;
}
}
addThird()



function addFourth(){
    fetch('https://final-project-api1.herokuapp.com/view-trends4/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="four-card">
            <div class="four-card-body" data-id=${items.trend_id}>
                <h2 class="four-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="four-card-pic"/>
                <h2 class="four-card-title">${items.trend_name}</h2>
                <h3 class="four-card-desc">${items.trend_desc}</h3>
                <h4 class="four-card-price">R${items.trend_price}</h4>
                <h5 class="four-card-cat">${items.trend_cat}</h5>
                <button class="shop-by-pressing btn" value="${items["trend_id"]}" onclick="addTrendCartclick4(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forthTrend.innerHTML = output;
}
}
addFourth()


function addFifth(){
    fetch('https://final-project-api1.herokuapp.com/view-trends5/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="five-card">
            <div class="five-card-body" data-id=${items.trend_id}>
                <h2 class="five-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="five-card-pic"/>
                <h2 class="five-card-title">${items.trend_name}</h2>
                <h3 class="five-card-desc">${items.trend_desc}</h3>
                <h4 class="five-card-price">R${items.trend_price}</h4>
                <h5 class="five-card-cat">${items.trend_cat}</h5>
                <button class="press-it-buy-it btn" value="${items["trend_id"]}" onclick="addTrendCartclick5(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    fifthTrend.innerHTML = output;
}
}
addFifth()


function addSix(){
    fetch('https://final-project-api1.herokuapp.com/view-trends6/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="six-card">
            <div class="six-card-body" data-id=${items.trend_id}>
                <h2 class="six-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="six-card-pic"/>
                <h2 class="six-card-title">${items.trend_name}</h2>
                <h3 class="six-card-desc">${items.trend_desc}</h3>
                <h4 class="six-card-price">R${items.trend_price}</h4>
                <h5 class="six-card-cat">${items.trend_cat}</h5>
                <button class="press-to-buy shopBtn" value="${items["trend_id"]}" onclick="addTrendCartclick6(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    sixTrend.innerHTML = output;
}
}
addSix()


function addSev(){
    fetch('https://final-project-api1.herokuapp.com/view-trends7/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="sev-card">
            <div class="sev-card-body" data-id=${items.trend_id}>
                <h2 class="sev-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="sev-card-pic"/>
                <h2 class="sev-card-title">${items.trend_name}</h2>
                <h3 class="sev-card-desc">${items.trend_desc}</h3>
                <h4 class="sev-card-price">R${items.trend_price}</h4>
                <h5 class="sev-card-cat">${items.trend_cat}</h5>
                <button class="shop-it-buy btn" value="${items["trend_id"]}" onclick="addTrendCartclick7(event, ${items["trend_id"]})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    sevTrend.innerHTML = output;
}
}
addSev()

//   function to open registeration
function openModal() {
    document.getElementById("modal").classList.toggle("modal-active");
}

function registerUser(){

    fetch("https://final-project-api1.herokuapp.com/view-users/")
    .then((response) => response.json())
    .then((data) => {
    //   Store the results
    let users = data;
    console.log(users)

    });

    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById("email").value;
    localStorage.setItem("user_details", JSON.stringify(users));

    let users = data.data;
        users.forEach(user => {
            
        for (i = 0; i < users.length; i++){
            if (username == user.username && password == user.password ){
                alert('You are now a registered user')
            }
            else{
                alert('There was a problem with the registeration')
                
            }
        }       
        }) 
    }
    


//   function to open Cart
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active")
    updateCartTotal()
}


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
    var shopItem = button.parentElement
    var title = shopItem.querySelector('.card-title').innerText 
    var price = shopItem.querySelector('.card-price').innerText
    var imageScr = shopItem.querySelector('.card-pic').src
  
    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart(title , price, imageScr, id, button)
}

function addItemToCart(title, price, imageScr, cartItemId, e) {
    let cart = [];
    let cartPage = document.querySelector(".cart-items")
    let inCart = document.querySelectorAll(".btn.btn-primary.shop-item-button")[cartItemId - 2]
    let cartItem = e.value
    console.log(cartItem)

    
    let item = {
        "name": title, 
        "price": price,
        "url": imageScr, 
        "id": cartItemId, 
        }
    console.log(item)

    if (cartItem == item["id"]){
        cart.push(item)
        cart.forEach((cartCard) => {
        inCart.innerHTML = "";
        inCart.disabled = true;
        inCart.innerHTML += "In Cart Already";
        console.log(cart);
        
        cartPage.innerHTML +=`
        <div class="card">
        <div class="incart-item">
            <p style="display: none" class="id">${cartCard["id"]}<p>
            <img src="${cartCard["url"]}" class="card-pic"/>
            <h2 class="cards-title">${cartCard["name"]}</h2>
            <h3 class="card-price">${cartCard["price"]}</h3>
            <input class="qty-input btn" type="number" value="1">
            <button id="remove-btn" onclick="removeBtn()" type="button">-</button>
        </div>
    </div>
        `
    }, 
        )
    }
}


function trendToCart(){

    var Button = document.querySelectorAll('.shop-trend.btn')
    for (var i = 0; i < Button.length; i++) {
        var addbutton = Button[i]
        addbutton.addEventListener('click', addTrendCartclick)
    }
}


function addTrendCartclick(event, trendId) {
    console.log(trendId);
    var button2 = event.target
    let shopTrend = button2.parentElement.parentElement
    var trendName = shopTrend.getElementsByClassName('cards-title')[0].innerText 
    var trendPrice = shopTrend.getElementsByClassName('cards-price')[0].innerText
    var trendImg = shopTrend.getElementsByClassName('cards-pic')[0].src
    document.getElementsByTagName('span')[0].innerText = trendPrice
  
    let card = [trendImg, trendName, trendPrice ]
    console.log(card);
    addTrendToCart( trendImg, trendName, trendPrice ,trendId)
}


function addTrendToCart(trendImg, trendName, trendPrice ,trendId) {
    let cart = [];
    let cartPage = document.querySelector(".cart-trend")
    let trendCartBtn = document.querySelector('.shop-trend.btn')

    let items = {
        "name": trendName, 
        "price": trendPrice,
        "img": trendImg, 
        "theId": trendId, 
        };
    let itemId = items["theId"]
    console.log(itemId)

    if (trendId == itemId){
        cart.push(itemId)
        cart.forEach(() => {
        trendCartBtn.innerHTML = "";
        trendCartBtn.disabled = true;
        trendCartBtn.innerHTML += "In cart already";
        console.log(trendCartBtn);

    },
        cartPage.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trendId}<p>
                <img src="${trendImg}" class="card-pic"/>
                <h2 class="cards-title">${trendName}</h2>
                <h3 class="cards-price">${trendPrice}</h3>
                <input class="qty-input btn" type="number" value="1">
                <button id="remove-btn" onclick="removeBtn()" type="button">-</button>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

// second trend
function trendToCart2(){

    var shopButton = document.querySelectorAll('.shop-trends.btnTwo')
    for (var i = 0; i < shopButton.length; i++) {
        var addItembutton = Button[i]
        addItembutton.addEventListener('click', addTrendCartclick2)
    }
}


function addTrendCartclick2(event, trendsId) {
    console.log(trendsId);
    var button2 = event.target
    let shopTrends = button2.parentElement.parentElement
    var trendsName = shopTrends.getElementsByClassName('two-card-title')[0].innerText 
    var trendsPrice = shopTrends.getElementsByClassName('two-card-price')[0].innerText
    var trendsImg = shopTrends.getElementsByClassName('two-card-pic')[0].src
  
    let trendCard = [trendsImg, trendsName, trendsPrice ]
    console.log(trendCard);
    addTrendToCart2( trendsImg, trendsName, trendsPrice ,trendsId)
}


function addTrendToCart2(trendsImg, trendsName, trendsPrice ,trendsId) {
    let cart = [];
    let trendPage = document.querySelector(".cart-trend") 
    let trendCartBtn2 = document.querySelector('.shop-trends.btnTwo')
    console.log(trendCartBtn2);

    let items = {
        "name": trendsName, 
        "price": trendsPrice,
        "img": trendsImg, 
        "theId": trendsId, 
        };
    let itemsId = items["theId"]
    console.log(itemsId)

    if (trendsId == itemsId){
        cart.push(itemsId)
        cart.forEach(() => {
        trendCartBtn2.innerHTML = "";
        trendCartBtn2.disabled = true;
        trendCartBtn2.innerHTML += "In cart already";
        console.log(trendCartBtn2);

    },
        trendPage.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trendsId}<p>
                <img src="${trendsImg}" class="two-card-pic"/>
                <h2 class="two-card-title">${trendsName}</h2>
                <h3 class="two-card-desc">${trendsPrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

// third trend
function trendToCart3(){

    var buttonShop = document.querySelectorAll('.shop-this-item.btn')
    for (var i = 0; i < buttonShop.length; i++) {
        var addThisItembutton = Button[i]
        addThisItembutton.addEventListener('click', addTrendCartclick3)
    }
}


function addTrendCartclick3(event, trendingId) {
    console.log(trendingId);
    var button3 = event.target
    let shopTrends = button3.parentElement.parentElement
    var trendingName = shopTrends.getElementsByClassName('three-card-title')[0].innerText 
    var trendingPrice = shopTrends.getElementsByClassName('three-card-price')[0].innerText
    var trendingImg = shopTrends.getElementsByClassName('three-card-pic')[0].src
  
    let trenCard = [trendingId, trendingImg, trendingPrice, trendingName ]
    console.log(trenCard);
    addTrendToCart3( trendingId, trendingImg, trendingPrice, trendingName)
}


function addTrendToCart3(trendingId, trendingImg, trendingPrice, trendingName) {
    let cart = [];
    let trendingPage = document.querySelector(".cart-trend") 
    let trendCartBtn3 = document.querySelector('.shop-this-item.btn')
    console.log(trendCartBtn3);

    let items = {
        "name": trendingName,
        "price":trendingPrice,
        "img":  trendingImg,    
        "theId": trendingId, 
        };
    let iteId = items["theId"]
    console.log(iteId)

    if (trendingId == iteId){
        cart.push(iteId)
        cart.forEach(() => {
        trendCartBtn3.innerHTML = "";
        trendCartBtn3.disabled = true;
        trendCartBtn3.innerHTML += "In cart already";
        console.log(trendCartBtn3);

    },
        trendingPage.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trendingId}<p>
                <img src="${trendingImg}" class="two-card-pic"/>
                <h2 class="two-card-title">${trendingName}</h2>
                <h3 class="two-card-desc">${trendingPrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}


// fourth trend
function trendToCart4(){

    var buttonShop2 = document.querySelectorAll('.shop-by-pressing.btn')
    for (var i = 0; i < buttonShop2.length; i++) {
        var addThisItembutton2 = Button[i]
        addThisItembutton2.addEventListener('click', addTrendCartclick4)
    }
}


function addTrendCartclick4(event, trend4Id) {
    console.log(trend4Id);
    var button4 = event.target
    let shop4Trends = button4.parentElement.parentElement
    var trend4Name = shop4Trends.getElementsByClassName('four-card-title')[0].innerText 
    var trend4Price = shop4Trends.getElementsByClassName('four-card-price')[0].innerText
    var trend4Img = shop4Trends.getElementsByClassName('four-card-pic')[0].src
  
    let trend4Card = [trend4Id, trend4Img, trend4Price, trend4Name ]
    console.log(trend4Card);
    addTrendToCart4( trend4Id, trend4Img, trend4Price, trend4Name)
}


function addTrendToCart4(trend4Id, trend4Img, trend4Price, trend4Name) {
    let cart = [];
    let trend4Page = document.querySelector(".cart-trend") 
    let trendCartBtn4 = document.querySelector('.shop-by-pressing.btn')
    console.log(trendCartBtn4);

    let items = {
        "name": trend4Name,
        "price":trend4Price,
        "img":  trend4Img,    
        "theId": trend4Id, 
        };
    let itId = items["theId"]
    console.log(itId)

    if (trend4Id == itId){
        cart.push(itId)
        cart.forEach(() => {
        trendCartBtn4.innerHTML = "";
        trendCartBtn4.disabled = true;
        trendCartBtn4.innerHTML += "In cart already";
        console.log(trendCartBtn4);

    },
        trend4Page.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trend4Id}<p>
                <img src="${trend4Img}" class="two-card-pic"/>
                <h2 class="two-card-title">${trend4Name}</h2>
                <h3 class="two-card-desc">${trend4Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

// fifth trend
function trendToCart5(){

    var buttonShop3 = document.querySelectorAll('.press-it-buy-it.btn')
    for (var i = 0; i < buttonShop3.length; i++) {
        var addThisItembutton2 = Button[i]
        addThisItembutton2.addEventListener('click', addTrendCartclick5)
    }
}


function addTrendCartclick5(event, trend5Id) {
    console.log(trend5Id);
    var button5 = event.target
    let shop5Trends = button5.parentElement.parentElement
    var trend5Name = shop5Trends.getElementsByClassName('five-card-title')[0].innerText 
    var trend5Price = shop5Trends.getElementsByClassName('five-card-price')[0].innerText
    var trend5Img = shop5Trends.getElementsByClassName('five-card-pic')[0].src
  
    let trend5Card = [trend5Id, trend5Img, trend5Price, trend5Name ]
    console.log(trend5Card);
    addTrendToCart5( trend5Id, trend5Img, trend5Price, trend5Name)
}


function addTrendToCart5(trend5Id, trend5Img, trend5Price, trend5Name) {
    let cart = [];
    let trend5Page = document.querySelector(".cart-trend") 
    let trendCartBtn5 = document.querySelector('.press-it-buy-it.btn')
    console.log(trendCartBtn5);

    let items = {
        "name": trend5Name,
        "price":trend5Price,
        "img":  trend5Img,    
        "theId": trend5Id, 
        };
    let idkId = items["theId"]
    console.log(idkId)

    if (trend5Id == idkId){
        cart.push(idkId)
        cart.forEach(() => {
        trendCartBtn5.innerHTML = "";
        trendCartBtn5.disabled = true;
        trendCartBtn5.innerHTML += "In cart already";
        console.log(trendCartBtn5);

    },
        trend5Page.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trend5Id}<p>
                <img src="${trend5Img}" class="two-card-pic"/>
                <h2 class="two-card-title">${trend5Name}</h2>
                <h3 class="two-card-desc">${trend5Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

// sixth trend
function trendToCart6(){

    var buttonShop4 = document.querySelectorAll('.press-to-buy.shopBtn')
    for (var i = 0; i < buttonShop4.length; i++) {
        var addThisItembutton3 = Button[i]
        addThisItembutton3.addEventListener('click', addTrendCartclick6)
    }
}


function addTrendCartclick6(event, trend6Id) {
    console.log(trend6Id);
    var button6 = event.target
    let shop6Trends = button6.parentElement.parentElement
    var trend6Name = shop6Trends.getElementsByClassName('six-card-title')[0].innerText 
    var trend6Price = shop6Trends.getElementsByClassName('six-card-price')[0].innerText
    var trend6Img = shop6Trends.getElementsByClassName('six-card-pic')[0].src
  
    let trend6Card = [trend6Id, trend6Img, trend6Price, trend6Name ]
    console.log(trend6Card);
    addTrendToCart6( trend6Id, trend6Img, trend6Price, trend6Name)
}


function addTrendToCart6(trend6Id, trend6Img, trend6Price, trend6Name) {
    let cart = [];
    let trend6Page = document.querySelector(".cart-trend") 
    let trendCartBtn6 = document.querySelector('.press-to-buy.shopBtn')
    console.log(trendCartBtn6);

    let items = {
        "name": trend6Name,
        "price":trend6Price,
        "img":  trend6Img,    
        "theId": trend6Id, 
        };
    let idkeId = items["theId"]
    console.log(idkeId)

    if (trend6Id == idkeId){
        cart.push(idkeId)
        cart.forEach(() => {
        trendCartBtn6.innerHTML = "";
        trendCartBtn6.disabled = true;
        trendCartBtn6.innerHTML += "In cart already";
        console.log(trendCartBtn6);

    },
        trend6Page.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trend6Id}<p>
                <img src="${trend6Img}" class="two-card-pic"/>
                <h2 class="two-card-title">${trend6Name}</h2>
                <h3 class="two-card-desc">${trend6Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

function trendToCart6(){

    var buttonShop4 = document.querySelectorAll('.press-to-buy.shopBtn')
    for (var i = 0; i < buttonShop4.length; i++) {
        var addThisItembutton3 = Button[i]
        addThisItembutton3.addEventListener('click', addTrendCartclick6)
    }
}

// seventh trend
function trendToCart6(){

    var buttonShop5 = document.querySelectorAll('.shop-it-buy.btn')
    for (var i = 0; i < buttonShop5.length; i++) {
        var addThisItembutton4 = Button[i]
        addThisItembutton4.addEventListener('click', addTrendCartclick7)
    }
}

function addTrendCartclick7(event, trend7Id) {
    console.log(trend7Id);
    var button7 = event.target
    let shop7Trends = button7.parentElement.parentElement
    var trend7Name = shop7Trends.getElementsByClassName('sev-card-title')[0].innerText 
    var trend7Price = shop7Trends.getElementsByClassName('sev-card-price')[0].innerText
    var trend7Img = shop7Trends.getElementsByClassName('sev-card-pic')[0].src
  
    let trend7Card = [trend7Id, trend7Img, trend7Price, trend7Name ]
    console.log(trend7Card);
    addTrendToCart7( trend7Id, trend7Img, trend7Price, trend7Name)
}


function addTrendToCart7(trend7Id, trend7Img, trend7Price, trend7Name) {
    let cart = [];
    let trend7Page = document.querySelector(".cart-trend") 
    let trendCartBtn7 = document.querySelector('.shop-it-buy.btn')
    console.log(trendCartBtn7);

    let items = {
        "name": trend7Name,
        "price":trend7Price,
        "img":  trend7Img,    
        "theId": trend7Id, 
        };
    let idkenId = items["theId"]
    console.log(idkenId)

    if (trend7Id == idkenId){
        cart.push(idkenId)
        cart.forEach(() => {
        trendCartBtn7.innerHTML = "";
        trendCartBtn7.disabled = true;
        trendCartBtn7.innerHTML += "In cart already";
        console.log(trendCartBtn7);

    },
        trend7Page.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${trend7Id}<p>
                <img src="${trend7Img}" class="two-card-pic"/>
                <h2 class="two-card-title">${trend7Name}</h2>
                <h3 class="two-card-desc">${trend7Price}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }
    
}

function removeBtn(){

    // remove section
    let removeFromCartBtn = document.getElementById('remove-btn');
    let addAgain = document.querySelector('.btn.btn-primary.shop-item-button');
    console.log(addAgain);
    cart = [];
    console.log(removeFromCartBtn);
    
    let removeButton = removeFromCartBtn
    removeButton.addEventListener('click', function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        addAgain.innerHTML = "";
        addAgain.disabled = false;
        addAgain.innerHTML += "Add To Cart";
        updateCartTotal() 
        
    })
    
function updateCartTotal(){
    let items = document.getElementsByClassName('incart-item')
    console.log(items);
    let total = 0;

    for (let i = 0; i < items.length; i++){
        let item = items[i]
        let priceElement = document.getElementsByClassName('card-price')[0]
        let price = priceElement.innerText.replace('R', '')
        console.log(price)
        let qtlElement = document.getElementsByClassName('qty-input btn')[i]
        let qauntity = qtlElement.value
        console.log(price , qauntity);
        console.log(price * qauntity);
        total = total + (price * qauntity)
        document.querySelector('.total').innerHTML ="R" + total
    }
}
}

function inputTotal(){
    let qtyInput = document.getElementsByClassName('qty-input btn')
    for (let i = 0; i < items.length; i++){
        let input = qtyInput.getElementsByClassName('incart-item')
        input.addEventListener('change', qauntityChanged)
    }
}

function qauntityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    removeButton()
}

function whenOpen(){
    alert('to remove an item click the remove button twice for confirmation')
}

//   function to open Login
function openLog() {
    document.getElementById("login").classList.toggle("login-active")
}


function logIn() {
    fetch("https://final-project-api1.herokuapp.com/view-users/")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let found = false;
        let users = data.data;
        users.forEach(user => {
            if (
                user.username == document.getElementById("logUsername").value && 
                user.password == document.getElementById("logPassword").value 
                ) {
                    found = true;
                    alert("Login successful");
                    window.location = 'index.html'
                    localStorage.setItem("user_details", JSON.stringify(user));
            }
        })
        if (!found) {
            alert("Username and password unrecognised , try again")
        }
        if(username.value == "" ||password.value.trim()==""){
            alert("No blank values allowed");
            return false;
        }
        else{
            return true;
        }

        // alert
        // let info  = data.data[0];
        // console.log(info);
        // let logUser = info["username"]
        // let logPass = info["password"]
        // let usersname = document.getElementById("logUsername").value
        // console.log(usersname);
        // let usersPassword = document.getElementById("logPassword").value
        // console.log(usersPassword); 


        // if(logUser === usersname && logPass === usersPassword){
        //     alert("Login successful");
        //     // window.location = 'index.html'

        // }else{
        //     alert("Username and password unrecognised , try again")
        // }
    })
}

function showDeatails() {
    let user_details = JSON.parse(localStorage.getItem("user_details"));

    
    document.querySelector('.mes').innerText = "Welcome back " + user_details.username + "!";

}

showDeatails(); 
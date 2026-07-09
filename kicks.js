const trendingKicks = document.querySelector('.trend')
const threeKicks = document.querySelector('.three-kicks')
const twoKicks = document.querySelector('.two-kicks')
const oneKick = document.querySelector('.one-kick')
const saleKicks = document.querySelector('.onsale-kick')
const salesKicks = document.querySelector('.sale-kick')

let output = '';

// to view products
supabase.from('products').select('*').eq('category', 'Shoes').eq('is_trending', true).order('trend_num')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderTrending(data);
    });


    const renderTrending = (items) => {
    output = ""
    items.forEach(items => {
        output += `
        <div class="card">
            <div class="cards-body" data-id=${items.id}>
                <img src="${items.image_url}" class="cards-pic"/>
                <h2 class="cards-title">${escapeHtml(items.name)}</h2>
                <h3 class="cards-desc">${escapeHtml(items.description)}</h3>
                <h4 class="cards-price">R${items.price}</h4>
                <h5 class="cards-cat">${escapeHtml(items.category)}</h5>
                <button class="shop-this-now btn" value="${items.id}" onclick="addtoCartclick(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    trendingKicks.innerHTML = output;
}



// to view products
supabase.from('products').select('*').eq('category', 'Shoes').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderThree(data);
    });


    const renderThree = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-3">
            <div class="card3-body" data-id=${items.id}>
                <img src="${items.image_url}" class="card3-pic"/>
                <h2 class="card3-title">${escapeHtml(items.name)}</h2>
                <h3 class="card3-desc">${escapeHtml(items.description)}</h3>
                <h4 class="card3-price">R${items.price}</h4>
                <h5 class="card3-cat">${escapeHtml(items.category)}</h5>
                <button class="new-kick-cop btn" value="${items.id}" onclick="addtoCartclick2(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    threeKicks.innerHTML = output;
}

// to view products
supabase.from('products').select('*').eq('category', 'Shoes').order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderTwo(data);
    });


    const renderTwo = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-2">
            <div class="card2-body" data-id=${items.id}>
                <img src="${items.image_url}" class="card2-pic"/>
                <h2 class="card2-title">${escapeHtml(items.name)}</h2>
                <h3 class="card2-desc">${escapeHtml(items.description)}</h3>
                <h4 class="card2-price">R${items.price}</h4>
                <h5 class="card2-cat">${escapeHtml(items.category)}</h5>
                <button class="new-one btn" value="${items.id}" onclick="addtoCartclick3(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    twoKicks.innerHTML = output;
}



// to view products
supabase.from('products').select('*').eq('category', 'Shoes').order('price')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderOne(data);
    });


    const renderOne = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-1">
            <div class="card1-body" data-id=${items.id}>
                <img src="${items.image_url}" class="card1-pic"/>
                <h2 class="card1-title">${escapeHtml(items.name)}</h2>
                <h3 class="card1-desc">${escapeHtml(items.description)}</h3>
                <h4 class="card1-price">R${items.price}</h4>
                <h5 class="card1-cat">${escapeHtml(items.category)}</h5>
                <button class="new-two btn" value="${items.id}" onclick="addtoCartclick4(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    oneKick.innerHTML = output;
}


supabase.from('products').select('*').eq('category', 'Shoes').eq('is_on_sale', true).order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderKick(data);
    });


    const renderKick = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items)
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${items.id}>
                <div class="info">
                    <img src="${items.image_url}" class="sale-card-pic"/>
                    <div class="details">
                    <h2 class="sale-card-title">${escapeHtml(items.name)}</h2>
                    <h3 class="sale-card-desc">${escapeHtml(items.description)}</h3>
                    <h5 class="sale-card-cat">${escapeHtml(items.category)}</h5>
                    <h4 class="sale-card-price">R${items.price}</h4>
                    <h6 class="card-was-price">R${items.was_price}</h6>
                    <button class="new-three btn" value="${items.id}" onclick="addSaleCartclick(event, ${items.id})" type="button">ADD TO CART</button>
                </div>
            </div>
        </div>
        `;
    });
    saleKicks.innerHTML = output;
}



supabase.from('products').select('*').eq('category', 'Shoes').eq('is_on_sale', true).order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderKicks(data);
    });


    const renderKicks = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items)
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${items.id}>
                <div class="info">
                    <img src="${items.image_url}" class="sale-card-pic"/>
                    <div class="details">
                    <h2 class="sale-card-title">${escapeHtml(items.name)}</h2>
                    <h3 class="sale-card-desc">${escapeHtml(items.description)}</h3>
                    <h5 class="sale-card-cat">${escapeHtml(items.category)}</h5>
                    <h4 class="sale-card-price">R${items.price}</h4>
                    <h6 class="card-was-price">R${items.was_price}</h6>
                    <button class="new-four btn" value="${items.id}" onclick="addSaleCartclick2(event, ${items.id})" type="button">ADD TO CART</button>
                </div>
            </div>
        </div>
        `;
    });
    salesKicks.innerHTML = output;
}

//   function to open Cart
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}


function toCart(){

    var addToCartButton = document.getElementsByClassName('shop-this-now btn')
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addtoCartclick)
    }
}

function addtoCartclick(event, id) {
    console.log(id);
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cards-title')[0].innerText
    var price = shopItem.getElementsByClassName('cards-price')[0].innerText
    var imageScr = shopItem.getElementsByClassName('cards-pic')[0].src

    let card = [title, price, imageScr]
    console.log(card)
    addToCart(title , price, imageScr, id, button)
}

function addToCart(title, price, imageScr, cartItemId, e) {
    cart = []
    let cartPage = document.querySelector(".cart-items")

    let item = {
        "name": title,
        "price": price,
        "url": imageScr,
        "id": cartItemId,
        }

    if (cartItemId == item["id"]){
        console.log(item["id"]);
        cart.push(item)
        cart.forEach(() => {
        e.innerHTML = "";
        e.disabled = true;
        e.innerHTML += "In Cart Already";
        alert('your product was added to your cart')
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



function addtoCart3(){

    var addToCartButton3 = document.getElementsByClassName('new-one.btn')
    for (var i = 0; i < addToCartButton3.length; i++) {
        var button3 = addToCartButton3[i]
        button3.addEventListener('click', addtoCartclick3)
    }
}

function addtoCartclick3(event, id) {
    console.log(id);
    var button3 = event.target
    var shopItem3 = button3.parentElement
    var title = shopItem3.querySelector('.card2-title').innerText
    var price = shopItem3.querySelector('.card2-price').innerText
    var imageScr = shopItem3.querySelector('.card2-pic').src

    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart(title , price, imageScr, id, button3)
}

function addItemToCart(title, price, imageScr, cartItemId, e) {
    let cart = [];
    let cartPage = document.querySelector(".cart-items")
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
        e.innerHTML = "";
        e.disabled = true;
        e.innerHTML += "In Cart Already";
        console.log(cart);

        cartPage.innerHTML +=`
        <div class="card">
        <div class="incart-item">
            <p style="display: none" class="id">${cartCard["id"]}<p>
            <img src="${cartCard["url"]}" class="card-pic"/>
            <h2 class="cards-title">${cartCard["name"]}</h2>
            <h3 class="cards-desc">${cartCard["price"]}</h3>
        </div>
    </div>
        `
    },
        )
}
}


function addtoCart4(){

    var addToCartButton4 = document.getElementsByClassName('new-two.btn')
    for (var i = 0; i < addToCartButton4.length; i++) {
        var button4 = addToCartButton4[i]
        button4.addEventListener('click', addtoCartclick4)
    }
}

function addtoCartclick4(event, id) {
    console.log(id);
    var button4 = event.target
    var shopItem4 = button4.parentElement
    var title = shopItem4.querySelector('.card1-title').innerText
    var price = shopItem4.querySelector('.card1-price').innerText
    var imageScr = shopItem4.querySelector('.card1-pic').src

    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart4(title , price, imageScr, id, button4)
}

function addItemToCart4(title, price, imageScr, cartItemId, e) {
    let cart = [];
    let cartPage = document.querySelector(".cart-items")
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
        e.innerHTML = "";
        e.disabled = true;
        e.innerHTML += "In Cart Already";
        console.log(cart);

        cartPage.innerHTML +=`
        <div class="card">
        <div class="incart-item">
            <p style="display: none" class="id">${cartCard["id"]}<p>
            <img src="${cartCard["url"]}" class="card-pic"/>
            <h2 class="cards-title">${cartCard["name"]}</h2>
            <h3 class="cards-desc">${cartCard["price"]}</h3>
        </div>
    </div>
        `
    },
        )
}
}


function saleToCart(){

    var shopButton = document.querySelectorAll('.new-three.btn')
    for (var i = 0; i < shopButton.length; i++) {
        var addItembutton = shopButton[i]
        addItembutton.addEventListener('click', addSaleCartclick)
    }
}


function addSaleCartclick(event, saleId) {
    console.log(saleId);
    var saleButton = event.target
    let shopSale = saleButton.parentElement.parentElement
    var saleName = shopSale.getElementsByClassName('sale-card-title')[0].innerText
    var salePrice = shopSale.getElementsByClassName('sale-card-price')[0].innerText
    var saleImg = shopSale.getElementsByClassName('sale-card-pic')[0].src

    let trendCard = [saleImg, saleName, salePrice ]
    console.log(trendCard);
    addSaleToCart( saleImg, saleName, salePrice, saleId)
}


function addSaleToCart(saleImg, saleName, salePrice , saleId) {
    let cart = [];
    let salePage = document.querySelector(".cart-sale")
    let saleCartBtn = document.querySelector('.new-three.btn')
    console.log(saleCartBtn);

    let items = {
        "name": saleName,
        "price": salePrice,
        "img": saleImg,
        "theId": saleId,
        };
    let itemsId = items["theId"]
    console.log(itemsId)

    if (saleId == itemsId){
        cart.push(itemsId)
        cart.forEach(() => {
        saleCartBtn.innerHTML = "";
        saleCartBtn.disabled = true;
        saleCartBtn.innerHTML += "In cart already";
        console.log(saleCartBtn);

    },
        salePage.innerHTML +=`
        <div class="card">
            <div class="incart-item">
                <p style="display: none" class="id">${saleId}<p>
                <img src="${saleImg}" class="two-card-pic"/>
                <h2 class="two-card-title">${saleName}</h2>
                <h3 class="two-card-desc">${salePrice}</h3>
            </div>
        </div>
        `)
        console.log(cart)
    }

}


function saleToCart2(){

    var shopButton2 = document.querySelectorAll('.new-four.btn')
    for (var i = 0; i < shopButton2.length; i++) {
        var addItembutton = shopButton2[i]
        addItembutton.addEventListener('click', addSaleCartclick2)
    }
}


function addSaleCartclick2(event, salesId) {
    console.log(salesId);
    var salesButton = event.target
    let shopsSale = salesButton.parentElement.parentElement
    var salesName = shopsSale.getElementsByClassName('sale-card-title')[0].innerText
    var salesPrice = shopsSale.getElementsByClassName('sale-card-price')[0].innerText
    var salesImg = shopsSale.getElementsByClassName('sale-card-pic')[0].src

    let saleCard = [salesImg, salesName, salesPrice ]
    console.log(saleCard);
    addSaleToCart2( salesImg, salesName, salesPrice, salesId)
}


function addSaleToCart2(salesImg, salesName, salesPrice , salesId) {
    let cart = [];
    let salesPage = document.querySelector(".cart-sale")
    let salesCartBtn = document.querySelector('.new-four.btn')
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

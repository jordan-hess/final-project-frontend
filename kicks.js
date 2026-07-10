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
                <img src="${items.image_url}" class="cards-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".trend .card");
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
                <img src="${items.image_url}" class="card3-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".three-kicks .card-3");
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
                <img src="${items.image_url}" class="card2-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".two-kicks .card-2");
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
                <img src="${items.image_url}" class="card1-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".one-kick .card-1");
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
                    <img src="${items.image_url}" class="sale-card-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".onsale-kick .sale-card");
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
                    <img src="${items.image_url}" class="sale-card-pic" alt="${escapeHtml(items.name)}"/>
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
    Motion.revealOnScroll(".sale-kick .sale-card");
}

//   function to open Cart
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
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
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}

// Handler for the "new arrivals" three-kicks grid (.card-3 / .new-kick-cop).
// This was referenced by the rendered button markup (addtoCartclick2) but had
// no matching function defined, which threw a ReferenceError on click.
function addtoCartclick2(event, id) {
    console.log(id);
    var button2 = event.target
    var shopItem2 = button2.parentElement
    var title = shopItem2.querySelector('.card3-title').innerText
    var price = shopItem2.querySelector('.card3-price').innerText
    var imageScr = shopItem2.querySelector('.card3-pic').src

    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart2(title , price, imageScr, id, button2)
}

function addItemToCart2(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart( saleImg, saleName, salePrice, saleId, saleButton)
}


function addSaleToCart(saleImg, saleName, salePrice, saleId, e) {
    CartStore.addItem({ id: saleId, name: saleName, price: salePrice, image: saleImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart2( salesImg, salesName, salesPrice, salesId, salesButton)
}


function addSaleToCart2(salesImg, salesName, salesPrice, salesId, e) {
    CartStore.addItem({ id: salesId, name: salesName, price: salesPrice, image: salesImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}

Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();

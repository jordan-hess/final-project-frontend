const accessoriList = document.querySelector('.ass')
const saleList = document.querySelector('.onsale')
const secondassSale = document.querySelector('.for-sale')
const tHirdSale = document.querySelector('.three')
const fourSale = document.querySelector('.four')
const cart = []
console.log(cart)

// to view products
supabase.from('products').select('*').eq('category', 'Accessories').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    });


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <p style="display: none" class="class-id">${item.id}<p>
                <img src="${item.image_url}" class="ass-card-pic"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <button class="btn btn-primary shop-item-button" value="${item.id}" onclick="addtoCartclick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    accessoriList.innerHTML = output;
}


supabase.from('products').select('*').eq('category', 'Accessories').eq('is_on_sale', true).order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderSale(data);
    });


const renderSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="cards-body" value="${item.id}">
                <img src="${item.image_url}" class="sale-card-pic"/>
                <h2 class="cards-title">${escapeHtml(item.name)}</h2>
                <h3 class="cards-desc">${escapeHtml(item.description)}</h3>
                <h4 class="cards-price">R${item.price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="shop-sale sale-btn" value="${item.id}" onclick="addtoCartclick2(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleList.innerHTML = output;
}


function secondSale(){

    supabase.from('products').select('*').eq('category', 'Accessories').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        secSale(data);
    })


    const secSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-ass">
            <div class="cards-ass" data-id=${item.id} >
                <img src="${item.image_url}" class="sale-card-pic"/>
                <h2 class="cards-title">${escapeHtml(item.name)}</h2>
                <h3 class="cards-desc">${escapeHtml(item.description)}</h3>
                <h4 class="cards-price">R${item.price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
                <button class="shop-sale-btn saleBtn" value="${item.id}" onclick="addtoCartclick3(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    secondassSale.innerHTML = output;
}
}

secondSale()



function thirdSale(){

    supabase.from('products').select('*').eq('category', 'Accessories').order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        thirdsSale(data);
    })


    const thirdsSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-3">
            <div class="card-3-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card3-img"/>
                <h2 class="cards3title">${escapeHtml(item.name)}</h2>
                <h3 class="card3-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card3-price">R${item.price}</h4>
                <h5 class="card3-was-price">R${item.was_price}<h5>
                <button class="shop-this-sale salesBtn" value="${item.id}" onclick="addtoCartclick4(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    tHirdSale.innerHTML = output;
}
}

thirdSale()



function fourthSale(){

    supabase.from('products').select('*').eq('category', 'Accessories').order('price', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        fourthsSale(data);
    })


    const fourthsSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card-4">
            <div class="card-4-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card4-img"/>
                <h2 class="cards4title">${escapeHtml(item.name)}</h2>
                <h3 class="card4-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card4-price">R${item.price}</h4>
                <h5 class="card4-was-price">R${item.was_price}<h5>
                <button class="last-saleBtn" value="${item.id}" onclick="addtoCartclick5(event, ${item.id})" type="button">ADD TO CART</button>
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
    addItemToCart(title , price, imageScr, id, button)
}

function addItemToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart( saleImg, saleName, salePrice, saleId, button2)
}


function addSaleToCart(saleImg, saleName, salePrice, saleId, e) {
    CartStore.addItem({ id: saleId, name: saleName, price: salePrice, image: saleImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart2( salesImg, salesName, salesPrice, sale2Id, button3)
}


function addSaleToCart2(salesImg, salesName, salesPrice, sale2Id, e) {
    CartStore.addItem({ id: sale2Id, name: salesName, price: salesPrice, image: salesImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart3( sale3Img, sale3Name, sale3Price, sale3Id, button4)
}


function addSaleToCart3(sale3Img, sale3Name, sale3Price, sale3Id, e) {
    CartStore.addItem({ id: sale3Id, name: sale3Name, price: sale3Price, image: sale3Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
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
    addSaleToCart5( sale4Img, sale4Name, sale4Price, sale4Id, button5)
}


function addSaleToCart5(sale4Img, sale4Name, sale4Price, sale4Id, e) {
    CartStore.addItem({ id: sale4Id, name: sale4Name, price: sale4Price, image: sale4Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}

//   function to open modal
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}

Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".ass .card, .onsale .card, .for-sale .card-ass, .three .card-3, .four .card-4");

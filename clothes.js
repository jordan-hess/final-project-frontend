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

const CLOTHES_CATEGORIES = ['Hoodie', 'T-shirt', 'Pants'];

function seeSale(){

    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <button class="shop-it btn btn-primary" value="${item.id}" onclick="addSaleCartclick2(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forSale.innerHTML = output;
    Motion.revealOnScroll(".new .card");
}
}

seeSale()


function seeSale2(){

    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <button class="sale-shop btn btn-primary" value="${item.id}" onclick="addSaleCartclick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forSale2.innerHTML = output;
    Motion.revealOnScroll(".new2 .card");
}
}

seeSale2()

function firstSale(){
    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).eq('is_on_sale', true).order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="sale-shop btn btn-primary" value="${item.id}" onclick="addTrendCartclick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleOne.innerHTML = output;
    Motion.revealOnScroll(".sale1 .card");
}
}
firstSale()

function secondSale(){
    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).eq('is_on_sale', true).order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleTwo.innerHTML = output;
    Motion.revealOnScroll(".sale2 .card");
}
}
secondSale()

function thirdSale(){
    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).eq('category', 'Hoodie').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleThree.innerHTML = output;
    Motion.revealOnScroll(".sale3 .card");
}
}
thirdSale()

function fourthSale(){
    // to view products
    supabase.from('products').select('*').eq('category', 'T-shirt').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleFour.innerHTML = output;
    Motion.revealOnScroll(".sale4 .card");
}
}
fourthSale()

function fifthSale(){
    // to view products
    supabase.from('products').select('*').eq('category', 'Pants').order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleFive.innerHTML = output;
    Motion.revealOnScroll(".sale5 .card");
}
}
fifthSale()

function sixthSale(){
    // to view products
    supabase.from('products').select('*').eq('category', 'Hoodie').order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleSix.innerHTML = output;
    Motion.revealOnScroll(".sale6 .card");
}
}
sixthSale()

function sevenSale(){
    // to view products
    supabase.from('products').select('*').eq('category', 'T-shirt').order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleSeven.innerHTML = output;
    Motion.revealOnScroll(".sale7 .card");
}
}
sevenSale()

function eighthSale(){
    // to view products
    supabase.from('products').select('*').eq('category', 'Pants').order('id', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleEight.innerHTML = output;
    Motion.revealOnScroll(".sale8 .card");
}
}
eighthSale()

function lastSale(){
    // to view products
    supabase.from('products').select('*').in('category', CLOTHES_CATEGORIES).order('price', { ascending: false })
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    })


    const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-was-price">R${item.was_price}</h5>
                <button class="btn btn-primary" value="${item.id}" onclick="addClothesCartClick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    saleNine.innerHTML = output;
    Motion.revealOnScroll(".sale9 .card");
}
}
lastSale()

//   function to open Cart
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}

function saleToCart2(){

    var shopButton2 = document.querySelectorAll('.shop-it.btn')
    for (var i = 0; i < shopButton2.length; i++) {
        var addItembutton = shopButton2[i]
        addItembutton.addEventListener('click', addSaleCartclick2)
    }
}


function addSaleCartclick2(event, salesId) {
    var salesButton = event.target
    let shopsSale = salesButton.parentElement.parentElement
    var salesName = shopsSale.getElementsByClassName('card-title')[0].innerText
    var salesPrice = shopsSale.getElementsByClassName('card-price')[0].innerText
    var salesImg = shopsSale.getElementsByClassName('card-pic')[0].src

    addSaleToCart2(salesImg, salesName, salesPrice, salesId, salesButton)
}


function addSaleToCart2(imgSrc, name, price, id, e) {
    CartStore.addItem({ id: id, name: name, price: price, image: imgSrc });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}


function saleToCart(){

    var shopButton = document.querySelectorAll('.sale-shop.btn')
    for (var i = 0; i < shopButton.length; i++) {
        var addItembutton2 = shopButton[i]
        addItembutton2.addEventListener('click', addSaleCartclick)
    }
}


function addSaleCartclick(event, sales2Id) {
    var salesButton2 = event.target
    let shops2Sale = salesButton2.parentElement.parentElement
    var sales2Name = shops2Sale.getElementsByClassName('card-title')[0].innerText
    var sales2Price = shops2Sale.getElementsByClassName('card-price')[0].innerText
    var sales2Img = shops2Sale.getElementsByClassName('card-pic')[0].src

    addSaleToCart2(sales2Img, sales2Name, sales2Price, sales2Id, salesButton2)
}


// Handler for the "sale1" grid (.card / .sale-shop rendered by firstSale()).
// The rendered button markup called addTrendCartclick, but no matching
// function was ever defined anywhere in the file, which threw a
// ReferenceError on click. Wired up following the shape of its nearest
// structural sibling, addSaleCartclick, which reads from the same card
// field classes (card-title/card-price/card-pic).
function addTrendCartclick(event, saleId) {
    var trendButton = event.target
    let shopTrend = trendButton.parentElement.parentElement
    var trendName = shopTrend.getElementsByClassName('card-title')[0].innerText
    var trendPrice = shopTrend.getElementsByClassName('card-price')[0].innerText
    var trendImg = shopTrend.getElementsByClassName('card-pic')[0].src

    addSaleToCart2(trendImg, trendName, trendPrice, saleId, trendButton)
}


// Shared handler for the .sale2-.sale9 grids (secondSale/thirdSale/
// fourthSale/fifthSale/sixthSale/sevenSale/eighthSale/lastSale). Their
// rendered card markup had no Add to Cart button at all — those 8 sections
// were entirely un-purchasable — so one is added to each below. They all
// render the same field classes (card-title/card-price/card-pic) as the
// sections addSaleCartclick/addTrendCartclick already handle, so this
// reuses addSaleToCart2 instead of adding an 8th near-duplicate handler.
function addClothesCartClick(event, id) {
    var button = event.target;
    // .closest('.card') rather than a fixed number of .parentElement hops:
    // these templates previously had a stray unclosed <h5 class="cards-was-price">
    // (written as `<h5>...<h5>` instead of `</h5>`), which used to make the
    // browser's HTML parser nest everything after it — including this button —
    // one level deeper than the template's indentation implied. That markup
    // has since been fixed, but closest() is kept because it finds the right
    // ancestor regardless of nesting depth either way.
    var shopItem = button.closest('.card');
    var title = shopItem.querySelector('.card-title').innerText;
    var price = shopItem.querySelector('.card-price').innerText;
    var imageScr = shopItem.querySelector('.card-pic').src;
    addSaleToCart2(imageScr, title, price, id, button);
}

function removeBtn(){

    // remove section
    let removeFromCartBtn = document.getElementById('remove-btn');
    let addAgain = document.querySelector('.shop-it.btn');
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
            console.log(cart)
        }
    }
}


function whenOpen(){
    showToast('Click Remove in the cart to remove an item')
}

Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();

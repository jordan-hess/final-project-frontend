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
supabase.from('products').select('*').order('id').limit(8)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderProduct(data);
    });

const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body first-slide" data-id=${item.id}>
                <img src="${item.image_url}" class="card-pic" alt="${escapeHtml(item.name)}"/>
                <h2 class="card-title">${escapeHtml(item.name)}</h2>
                <h3 class="card-desc">${escapeHtml(item.description)}</h3>
                <h4 class="card-price">R${item.price}</h4>
                <h5 class="card-cat">${escapeHtml(item.category)}</h5>
                <button class="btn btn-primary shop-item-button" value="${item.id}" onclick="addtoCartclick(event, ${item.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    productList.innerHTML = output;
    Motion.revealOnScroll(".products .card");
}

// following functions show trending products one at a time
function viewFirst(){
    // to view #1 product on trending
supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 1)
.then(({ data, error }) => {
    if (error) { console.error(error); return; }
    renderOne(data)})


const renderOne = (items) => {
    output = ""
items.forEach(items => {
    output += `
    <div class="one-card">
    <h1>Trending Kicks</h1>
        <div class="cards-body" data-id=${items.id}>
            <h2 class="cards-num">#${items.trend_num}</h2>
            <img src="${items.image_url}" class="cards-pic" alt="${escapeHtml(items.name)}"/>
            <h2 class="cards-title">${escapeHtml(items.name)}</h2>
            <h3 class="cards-desc">${escapeHtml(items.description)}</h3>
            <h4 class="cards-price">R${items.price}</h4>
            <h5 class="cards-cat">${escapeHtml(items.category)}</h5>
            <button class="shop-trend btn btn-primary" value="${items.id}" onclick="addTrendCartclick(event, ${items.id})" type="button">Add to cart</button>
        </div>
    </div>
    `;
});
oneProduct.innerHTML = output;
Motion.revealOnScroll(".one-card");
}
}
viewFirst()


function addSecond(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 2)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="two-card">
            <div class="two-card-body" data-id=${items.id}>
                <h2 class="two-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="two-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="two-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="two-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="two-card-price">R${items.price}</h4>
                <h5 class="two-card-cat">${escapeHtml(items.category)}</h5>
                <button class="shop-trends btn btn-primary" value="${items.id}" onclick="addTrendCartclick2(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    allTrends.innerHTML = output;
    Motion.revealOnScroll(".two-card");
}

}

addSecond()


function addThird(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 3)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="three-card">
            <div class="three-card-body" data-id=${items.id}>
                <h2 class="three-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="three-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="three-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="three-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="three-card-price">R${items.price}</h4>
                <h5 class="three-card-cat">${escapeHtml(items.category)}</h5>
                <button class="shop-this-item btn btn-primary" value="${items.id}" onclick="addTrendCartclick3(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    thirdTrend.innerHTML = output;
    Motion.revealOnScroll(".three-card");
}
}
addThird()



function addFourth(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 4)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="four-card">
            <div class="four-card-body" data-id=${items.id}>
                <h2 class="four-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="four-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="four-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="four-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="four-card-price">R${items.price}</h4>
                <h5 class="four-card-cat">${escapeHtml(items.category)}</h5>
                <button class="shop-by-pressing btn btn-primary" value="${items.id}" onclick="addTrendCartclick4(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    forthTrend.innerHTML = output;
    Motion.revealOnScroll(".four-card");
}
}
addFourth()


function addFifth(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 5)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="five-card">
            <div class="five-card-body" data-id=${items.id}>
                <h2 class="five-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="five-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="five-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="five-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="five-card-price">R${items.price}</h4>
                <h5 class="five-card-cat">${escapeHtml(items.category)}</h5>
                <button class="press-it-buy-it btn btn-primary" value="${items.id}" onclick="addTrendCartclick5(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    fifthTrend.innerHTML = output;
    Motion.revealOnScroll(".five-card");
}
}
addFifth()


function addSix(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 6)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="six-card">
            <div class="six-card-body" data-id=${items.id}>
                <h2 class="six-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="six-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="six-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="six-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="six-card-price">R${items.price}</h4>
                <h5 class="six-card-cat">${escapeHtml(items.category)}</h5>
                <button class="press-to-buy btn btn-primary" value="${items.id}" onclick="addTrendCartclick6(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    sixTrend.innerHTML = output;
    Motion.revealOnScroll(".six-card");
}
}
addSix()


function addSev(){
    supabase.from('products').select('*').eq('is_trending', true).eq('trend_num', 7)
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="sev-card">
            <div class="sev-card-body" data-id=${items.id}>
                <h2 class="sev-card-num">#${items.trend_num}</h2>
                <img src="${items.image_url}" class="sev-card-pic" alt="${escapeHtml(items.name)}"/>
                <h2 class="sev-card-title">${escapeHtml(items.name)}</h2>
                <h3 class="sev-card-desc">${escapeHtml(items.description)}</h3>
                <h4 class="sev-card-price">R${items.price}</h4>
                <h5 class="sev-card-cat">${escapeHtml(items.category)}</h5>
                <button class="shop-it-buy btn btn-primary" value="${items.id}" onclick="addTrendCartclick7(event, ${items.id})" type="button">ADD TO CART</button>
            </div>
        </div>
        `;
    });
    sevTrend.innerHTML = output;
    Motion.revealOnScroll(".sev-card");
}
}
addSev()

//   function to open registeration
function openModal() {
    Motion.toggleDialog(document.getElementById("modal"), "modal-active");
}

async function registerUser(){
    const name = userName.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value;
    const emailValue = email.value.trim();

    if (!name || !usernameValue || !passwordValue || !emailValue){
        showToast("No blank values allowed", "error");
        return;
    }

    const { error } = await supabase.auth.signUp({
        email: emailValue,
        password: passwordValue,
        options: {
            data: {
                username: usernameValue,
                full_name: name,
            },
        },
    });

    if (error){
        showToast("There was a problem with the registration: " + error.message, "error");
        return;
    }

    showToast("You are now a registered user");
    openModal();
}


//   function to open Cart
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
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
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart";
    e.disabled = true;
    showToast(title + " added to cart");
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

    let card = [trendImg, trendName, trendPrice ]
    console.log(card);
    addTrendToCart( trendImg, trendName, trendPrice ,trendId, button2)
}


function addTrendToCart(trendImg, trendName, trendPrice, trendId, e) {
    CartStore.addItem({ id: trendId, name: trendName, price: trendPrice, image: trendImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trendName + " added to cart");
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
    addTrendToCart2( trendsImg, trendsName, trendsPrice ,trendsId, button2)
}


function addTrendToCart2(trendsImg, trendsName, trendsPrice, trendsId, e) {
    CartStore.addItem({ id: trendsId, name: trendsName, price: trendsPrice, image: trendsImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trendsName + " added to cart");
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
    addTrendToCart3( trendingId, trendingImg, trendingPrice, trendingName, button3)
}


function addTrendToCart3(trendingId, trendingImg, trendingPrice, trendingName, e) {
    CartStore.addItem({ id: trendingId, name: trendingName, price: trendingPrice, image: trendingImg });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trendingName + " added to cart");
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
    addTrendToCart4( trend4Id, trend4Img, trend4Price, trend4Name, button4)
}


function addTrendToCart4(trend4Id, trend4Img, trend4Price, trend4Name, e) {
    CartStore.addItem({ id: trend4Id, name: trend4Name, price: trend4Price, image: trend4Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trend4Name + " added to cart");
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
    addTrendToCart5( trend5Id, trend5Img, trend5Price, trend5Name, button5)
}


function addTrendToCart5(trend5Id, trend5Img, trend5Price, trend5Name, e) {
    CartStore.addItem({ id: trend5Id, name: trend5Name, price: trend5Price, image: trend5Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trend5Name + " added to cart");
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
    addTrendToCart6( trend6Id, trend6Img, trend6Price, trend6Name, button6)
}


function addTrendToCart6(trend6Id, trend6Img, trend6Price, trend6Name, e) {
    CartStore.addItem({ id: trend6Id, name: trend6Name, price: trend6Price, image: trend6Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trend6Name + " added to cart");
}

// seventh trend
function trendToCart7(){

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
    addTrendToCart7( trend7Id, trend7Img, trend7Price, trend7Name, button7)
}


function addTrendToCart7(trend7Id, trend7Img, trend7Price, trend7Name, e) {
    CartStore.addItem({ id: trend7Id, name: trend7Name, price: trend7Price, image: trend7Img });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast(trend7Name + " added to cart");
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
    showToast('Use + / - to adjust quantity, or Remove to take an item out');
}

//   function to open Login
function openLog() {
    Motion.toggleDialog(document.getElementById("login"), "login-active");
}


async function logIn() {
    const loginEmail = document.getElementById("logEmail").value.trim();
    const loginPassword = document.getElementById("logPassword").value;

    if (!loginEmail || !loginPassword){
        showToast("No blank values allowed", "error");
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
    });

    if (error) {
        showToast("Username and password unrecognised, try again", "error");
        return;
    }

    showToast("Login successful");
    openLog();
    showDeatails();
}

async function showDeatails() {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    const label = document.querySelector('.mes');
    if (!label) return;

    if (user) {
        const displayName = user.user_metadata?.username || user.email;
        label.innerText = "Welcome back " + displayName + "!";
    } else {
        label.innerText = "";
    }
}

showDeatails();

Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();

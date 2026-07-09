const saleProducts = document.querySelector('.sale-products');
let products = [];


// Function allows users to see products on sale
function onSale(){

    supabase.from('products').select('*').eq('is_on_sale', true).order('id')
    .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        products = data;

        seeProduct(data)
    })


    const seeProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${item.id}>
                <div class="info">
                    <img src="${item.image_url}" class="sale-card-pic"/>
                    <div class="details">
                        <h2 class="sale-card-title">${escapeHtml(item.name)}</h2>
                        <h3 class="sale-card-desc">${escapeHtml(item.description)}</h3>
                        <h5 class="sale-card-cat">${escapeHtml(item.category)}</h5>
                        <h4 class="sale-card-price">R${item.price}</h4>
                        <h6 class="card-was-price">R${item.was_price}</h6>
                        <button class="shop-sale sale-btn" value="${item.id}" onclick="addtoCartclick(event, ${item.id})" type="button">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    saleProducts.innerHTML = output;
}
}
onSale()

function filterCards(category) {
    let productsContainer = document.querySelector(".sale-products");
    let filteredProducts = products.filter(product => product.category == category)
    console.log(category);
    console.log(products);
    console.log(filteredProducts);

    if (filteredProducts.length > 0) {
        productsContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            productsContainer.innerHTML += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${product.id}>
                <div class="info">
                    <img src="${product.image_url}" class="sale-card-pic"/>
                    <div class="details">
                        <h2 class="sale-card-title">${escapeHtml(product.name)}</h2>
                        <h3 class="sale-card-desc">${escapeHtml(product.description)}</h3>
                        <h5 class="sale-card-cat">${escapeHtml(product.category)}</h5>
                        <h4 class="sale-card-price">R${product.price}</h4>
                        <h6 class="card-was-price">R${product.was_price}</h6>
                        <button class="shop-sale sale-btn" value="${product.id}" onclick="addtoCartclick(event, ${product.id})" type="button">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        })
    } else {
        productsContainer.innerHTML = "<p>No items on sale in this category right now.</p>";
    }
}

//   function to open modal
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}


function toCart(){

    var addToCartButton = document.getElementsByClassName('shop-sale.sale-btn')
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addtoCartclick)
    }
}

function addtoCartclick(event, id) {
    console.log(id);
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('sale-card-title')[0].innerText
    var price = shopItem.getElementsByClassName('sale-card-price')[0].innerText
    var imageScr = shopItem.getElementsByClassName('sale-card-pic')[0].src

    let card = [title, price, imageScr]
    console.log(card)
    addItemToCart(title , price, imageScr, id, button)
}

function addItemToCart(title, price, imageScr, cartItemId, e) {
    let cartPage = document.querySelector(".cart-items")
    let cart =[]
    console.log(typeof(cartItemId));

    let item = {
        "name": title,
        "price": price,
        "url": imageScr,
        "id": cartItemId,
        }
        console.log(item);

    if (e.value == item["id"]){
        cart.push(item)
        cart.forEach(() => {
        e.innerHTML = "";
        e.disabled = true;
        e.innerHTML += "In Cart Already";
        alert("your item was added to your cart")
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

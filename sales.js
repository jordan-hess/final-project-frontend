const saleProducts = document.querySelector('.sale-products');


// Function allows users to see products on sale
function onSale(){

    fetch('https://final-project-api1.herokuapp.com/view-sale/')
    .then(res => res.json())
    .then(data => {
        products = data;

        seeProduct(data)
    })


    const seeProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${item.sale_pro_id}>
                <div class="info">
                    <img src="${item.sale_pro_image}" class="sale-card-pic"/>
                    <div class="details">
                        <h2 class="sale-card-title">${item.sale_pro_name}</h2>
                        <h3 class="sale-card-desc">${item.sale_pro_desc}</h3>
                        <h5 class="sale-card-cat">${item.sale_pro_cat}</h5>
                        <h4 class="sale-card-price">R${item.sale_pro_price}</h4>
                        <h6 class="card-was-price">R${item.was_price}</h6>
                        <button class="shop-sale sale-btn" value="${item.sale_pro_id}" onclick="addtoCartclick(event, ${item.sale_pro_id})" type="button">ADD TO CART</button>
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
    let filteredProducts = products.filter(product => product.sale_pro_cat == category)
    console.log(category);
    console.log(products);
    console.log(filteredProducts);

    if (filteredProducts.length > 0) {
        productsContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            productsContainer.innerHTML += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${product.sale_pro_id}>
                <div class="info">
                    <img src="${product.sale_pro_image}" class="sale-card-pic"/>
                    <div class="details">
                        <h2 class="sale-card-title">${product.sale_pro_name}</h2>
                        <h3 class="sale-card-desc">${product.sale_pro_desc}</h3>
                        <h5 class="sale-card-cat">${product.sale_pro_cat}</h5>
                        <h4 class="sale-card-price">R${product.sale_pro_price}</h4>
                        <h6 class="card-was-price">R${product.was_price}</h6>
                    </div>
                </div>
            </div>
        </div>
        `;
        })
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
    addItemToCart(title , price, imageScr, id)
}

function addItemToCart(title, price, imageScr, cartItemId) {
    let cartPage = document.querySelector(".cart-items") 
    let inCartbtn = document.querySelectorAll(".shop-sale.sale-btn")
    console.log(inCartbtn)
    let cart =[]
    console.log(typeof(cartItemId));
    
    let item = {
        "name": title, 
        "price": price,
        "url": imageScr, 
        "id": cartItemId, 
        }
        console.log(item);
        console.log(typeof(item["id"]));

    if (cartItemId == item["id"]){
        cart.push(item)
        cart.forEach(() => {
        inCartbtn.innerHTML = "";
        inCartbtn.disabled = true;
        inCartbtn.innerHTML += "In Cart Already";
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
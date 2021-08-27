let products;
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


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
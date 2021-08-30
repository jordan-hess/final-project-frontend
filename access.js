const accessoriList = document.querySelector('.ass')
const saleList = document.querySelector('.onsale')
const secondSale = document.querySelector('.for-sale')

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-access/')
    .then(res => res.json())
    .then(data => renderProduct(data))


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.access_id}>
                <img src="${item.access_image}" class="ass-card-pic"/>
                <h2 class="card-title">${item.access_name}</h2>
                <h3 class="card-desc">${item.access_desc}</h3>
                <h4 class="card-price">R${item.access_price}</h4>
            </div>
        </div>
        `;
    });
    accessoriList.innerHTML = output;
}


fetch('https://final-project-api1.herokuapp.com/view-sale-access/')
    .then(res => res.json())
    .then(data => renderSale(data))


const renderSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="cards-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="sale-card-pic"/>
                <h2 class="cards-title">${item.sale_pro_name}</h2>
                <h3 class="cards-desc">${item.sale_pro_desc}</h3>
                <h4 class="cards-price">R${item.sale_pro_price}</h4>
                <h5 class="cards-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    saleList.innerHTML = output;
}



fetch('https://final-project-api1.herokuapp.com/view-sale-access2/')
    .then(res => res.json())
    .then(data => itemsSale(data))
    console.log(data);


const itemsSale = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="cardss-body" data-id=${item.sale_pro_id}>
                <img src="${item.sale_pro_image}" class="sales-card-pic"/>
                <h2 class="cardss-title">${item.sale_pro_name}</h2>
                <h3 class="cardss-desc">${item.sale_pro_desc}</h3>
                <h4 class="cardss-price">R${item.sale_pro_price}</h4>
                <h5 class="cardss-was-price">R${item.was_price}<h5>
            </div>
        </div>
        `;
    });
    secondSale.innerHTML = output;
}
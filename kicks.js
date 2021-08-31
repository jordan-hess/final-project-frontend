const trendingKicks = document.querySelector('.trend')
const threeKicks = document.querySelector('.three-kicks')
const twoKicks = document.querySelector('.two-kicks')
const oneKick = document.querySelector('.one-kick')
const saleKicks = document.querySelector('.onsale-kick')
const salesKicks = document.querySelector('.sale-kick')

let output = '';

// to view products 
fetch('https://final-project-api1.herokuapp.com/all-trend/')
    .then(res => res.json())
    .then(data => renderTrending(data))


    const renderTrending = (items) => {
    output = ""
    items.forEach(items => {
        output += `
        <div class="card">
            <div class="cards-body" data-id=${items.trend_id}>
                <img src="${items.trend_image}" class="cards-pic"/>
                <h2 class="cards-title">${items.trend_name}</h2>
                <h3 class="cards-desc">${items.trend_desc}</h3>
                <h4 class="cards-price">R${items.trend_price}</h4>
                <h5 class="cards-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    trendingKicks.innerHTML = output;
}



// to view products 
fetch('https://final-project-api1.herokuapp.com/view-kicks2/')
    .then(res => res.json())
    .then(data => renderThree(data))


    const renderThree = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-3">
            <div class="card3-body" data-id=${items.product_id}>
                <img src="${items.product_image}" class="card3-pic"/>
                <h2 class="card3-title">${items.product_name}</h2>
                <h3 class="card3-desc">${items.product_desc}</h3>
                <h4 class="card3-price">R${items.product_price}</h4>
                <h5 class="card3-cat">${items.product_cat}</h5>
            </div>
        </div>
        `;
    }); 
    threeKicks.innerHTML = output;
}

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-kicks1/')
    .then(res => res.json())
    .then(data => renderTwo(data))


    const renderTwo = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-2">
            <div class="card2-body" data-id=${items.product_id}>
                <img src="${items.product_image}" class="card2-pic"/>
                <h2 class="card2-title">${items.product_name}</h2>
                <h3 class="card2-desc">${items.product_desc}</h3>
                <h4 class="card2-price">R${items.product_price}</h4>
                <h5 class="card2-cat">${items.product_cat}</h5>
            </div>
        </div>
        `;
    }); 
    twoKicks.innerHTML = output;
}



// to view products 
fetch('https://final-project-api1.herokuapp.com/view-kicks3/')
    .then(res => res.json())
    .then(data => renderOne(data))


    const renderOne = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items )
        output += `
        <div class="card-1">
            <div class="card1-body" data-id=${items.product_id}>
                <img src="${items.product_image}" class="card1-pic"/>
                <h2 class="card1-title">${items.product_name}</h2>
                <h3 class="card1-desc">${items.product_desc}</h3>
                <h4 class="card1-price">R${items.product_price}</h4>
                <h5 class="card1-cat">${items.product_cat}</h5>
            </div>
        </div>
        `;
    }); 
    oneKick.innerHTML = output;
}


fetch('https://final-project-api1.herokuapp.com/view-sale-kicks2/')
    .then(res => res.json())
    .then(data => renderKick(data))


    const renderKick = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items)
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${items.sale_pro_id}>
                <div class="info">
                    <img src="${items.sale_pro_image}" class="sale-card-pic"/>
                    <div class="details">
                    <h2 class="sale-card-title">${items.sale_pro_name}</h2>
                    <h3 class="sale-card-desc">${items.sale_pro_desc}</h3>
                    <h5 class="sale-card-cat">${items.sale_pro_cat}</h5>
                    <h4 class="sale-card-price">R${items.sale_pro_price}</h4>
                    <h6 class="card-was-price">R${items.was_price}</h6>
                </div>   
            </div>
        </div>
        `;
    }); 
    saleKicks.innerHTML = output;
}



fetch('https://final-project-api1.herokuapp.com/view-sale-kicks/')
    .then(res => res.json())
    .then(data => renderKicks(data))


    const renderKicks = (item) => {
    output = ""
    console.log(item)
    item.forEach(items => {
        console.log(items)
        output += `
        <div class="sale-card">
            <div class="sale-card-body" data-id=${items.sale_pro_id}>
                <div class="info">
                    <img src="${items.sale_pro_image}" class="sale-card-pic"/>
                    <div class="details">
                    <h2 class="sale-card-title">${items.sale_pro_name}</h2>
                    <h3 class="sale-card-desc">${items.sale_pro_desc}</h3>
                    <h5 class="sale-card-cat">${items.sale_pro_cat}</h5>
                    <h4 class="sale-card-price">R${items.sale_pro_price}</h4>
                    <h6 class="card-was-price">R${items.was_price}</h6>
                </div>   
            </div>
        </div>
        `;
    }); 
    salesKicks.innerHTML = output;
}


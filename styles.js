const productList = document.querySelector('.products');
const oneProduct = document.querySelector('.left-con');
const allTrends = document.querySelector('.right-con');
const thirdTrend = document.querySelector('.right-right-con');
const forthTrend = document.querySelector('.right4');
const fifthTrend = document.querySelector('.right5');
const sixTrend = document.querySelector('.right6')
const sevTrend = document.querySelector('.right7')



let output = '';

// to view products 
fetch('https://final-project-api1.herokuapp.com/view-product/')
    .then(res => res.json())
    .then(data => renderProduct(data))


const renderProduct = (item) => {
    output = ""
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body first-slide" data-id=${item.product_id}>
                <img src="${item.product_image}" class="card-pic"/>
                <h2 class="card-title">${item.product_name}</h2>
                <h3 class="card-desc">${item.product_desc}</h3>
                <h4 class="card-price">R${item.product_price}</h4>
                <h5 class="card-cat">${item.product_cat}</h5>
            </div>
        </div>
        `;
    });
    productList.innerHTML = output;
}

// following functions show trending products one at a time 
function viewFirst(){
    // to view #1 product on trending 
fetch('https://final-project-api1.herokuapp.com/view-trend/')
.then(response => response.json())
.then(data => {
    renderOne(data)})


const renderOne = (items) => {
    output = ""
items.forEach(items => {
    output += `
    <div class="one-card">
    <h1>Trending Kicks</h1>
        <div class="cards-body" data-id=${items.trend_id}>
            <h2 class="cards-num">#${items.trend_num}</h2>
            <img src="${items.trend_image}" class="cards-pic"/>
            <h2 class="cards-title">${items.trend_name}</h2>
            <h3 class="cards-desc">${items.trend_desc}</h3>
            <h4 class="cards-price">R${items.trend_price}</h4>
            <h5 class="cards-cat">${items.trend_cat}</h5>
        </div>
    </div>
    `;
});
oneProduct.innerHTML = output;
}
}
viewFirst()


function addSecond(){
    fetch('https://final-project-api1.herokuapp.com/view-trends/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="two-card">
            <div class="two-card-body" data-id=${items.trend_id}>
                <h2 class="two-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="two-card-pic"/>
                <h2 class="two-card-title">${items.trend_name}</h2>
                <h3 class="two-card-desc">${items.trend_desc}</h3>
                <h4 class="two-card-price">R${items.trend_price}</h4>
                <h5 class="two-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    allTrends.innerHTML = output;
}

}

addSecond()


function addThird(){
    fetch('https://final-project-api1.herokuapp.com/view-trends3/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="three-card">
            <div class="three-card-body" data-id=${items.trend_id}>
                <h2 class="three-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="three-card-pic"/>
                <h2 class="three-card-title">${items.trend_name}</h2>
                <h3 class="three-card-desc">${items.trend_desc}</h3>
                <h4 class="three-card-price">R${items.trend_price}</h4>
                <h5 class="three-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    thirdTrend.innerHTML = output;
}
}
addThird()



function addFourth(){
    fetch('https://final-project-api1.herokuapp.com/view-trends4/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="four-card">
            <div class="four-card-body" data-id=${items.trend_id}>
                <h2 class="four-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="four-card-pic"/>
                <h2 class="four-card-title">${items.trend_name}</h2>
                <h3 class="four-card-desc">${items.trend_desc}</h3>
                <h4 class="four-card-price">R${items.trend_price}</h4>
                <h5 class="four-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    forthTrend.innerHTML = output;
}
}
addFourth()


function addFifth(){
    fetch('https://final-project-api1.herokuapp.com/view-trends5/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="five-card">
            <div class="five-card-body" data-id=${items.trend_id}>
                <h2 class="five-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="five-card-pic"/>
                <h2 class="five-card-title">${items.trend_name}</h2>
                <h3 class="five-card-desc">${items.trend_desc}</h3>
                <h4 class="five-card-price">R${items.trend_price}</h4>
                <h5 class="five-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    fifthTrend.innerHTML = output;
}
}
addFifth()


function addSix(){
    fetch('https://final-project-api1.herokuapp.com/view-trends6/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="six-card">
            <div class="six-card-body" data-id=${items.trend_id}>
                <h2 class="six-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="six-card-pic"/>
                <h2 class="six-card-title">${items.trend_name}</h2>
                <h3 class="six-card-desc">${items.trend_desc}</h3>
                <h4 class="six-card-price">R${items.trend_price}</h4>
                <h5 class="six-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    sixTrend.innerHTML = output;
}
}
addSix()


function addSev(){
    fetch('https://final-project-api1.herokuapp.com/view-trends7/')
    .then(response => response.json())
    .then(data => {
        renderAll(data)})


    const renderAll = (items) => {
        output = ""
    items.forEach(items => {
        output += `
        <div class="sev-card">
            <div class="sev-card-body" data-id=${items.trend_id}>
                <h2 class="sev-card-num">#${items.trend_num}</h2>
                <img src="${items.trend_image}" class="sev-card-pic"/>
                <h2 class="sev-card-title">${items.trend_name}</h2>
                <h3 class="sev-card-desc">${items.trend_desc}</h3>
                <h4 class="sev-card-price">R${items.trend_price}</h4>
                <h5 class="sev-card-cat">${items.trend_cat}</h5>
            </div>
        </div>
        `;
    });
    sevTrend.innerHTML = output;
}
}
addSev()
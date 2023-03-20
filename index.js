let shop = document.getElementById('shop-container');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () =>{
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id,name,price,brand,img} = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id=product-id-${id} class="pro">
            <img src=${img}>
            <div class="des">
                <span>${brand}</span>
                <h5>${name}</h5>
                <h4>$${price}</h4>                
            </div>
            <div id="quantity-container">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                <a href="#" onclick="window.location.href='cart.html';"><i class="bi bi-cart2 cart"></i></a>
            </div>
        </div> `
    }).join(""));
};
generateShop();

let increment = (id) =>{
    let search = basket.find((x)=>x.id === id);

    if(search === undefined){
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    update(id);
    localStorage.setItem("data",JSON.stringify(basket));
    console.log(basket)
};

let decrement = (id) =>{
    let search = basket.find((x)=>x.id === id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(id);
    localStorage.setItem("data",JSON.stringify(basket));
    console.log(basket)
};

let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0);
}
calculation();

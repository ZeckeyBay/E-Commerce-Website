let shop = document.getElementById('shop-container');
let pdetails = document.getElementById("prodetails")

let basket = [];

let generateShop = () =>{
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id,name,price,brand,img} = x;
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
                <div id=${id} class="quantity">0</div>
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
};

let decrement = (id) =>{
    let search = basket.find((x)=>x.id === id);

    if(search.item === 0){
        return;
    } else {
        search.item -= 1;
    }
    update(id);
};

let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y);
}



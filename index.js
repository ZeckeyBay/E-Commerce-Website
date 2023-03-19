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
            <div>
                <h4>-<h4>
                <a href="#" onclick="window.location.href='cart.html';"><i class="bi bi-cart2 cart"></i></a>
            </div>
        </div> `
    }).join(""));
};


generateShop();

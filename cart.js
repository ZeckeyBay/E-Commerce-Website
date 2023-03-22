let basket = JSON.parse(localStorage.getItem("data")) || [];
let ShoppingCart = document.getElementById("cart");
let label = document.getElementById("label");
let shopItemsDatas = shopItemsData.concat(shopItemsData2);

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0);
}
calculation();

let generateCartItems = ()=>{
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id,item} = x;
            let search = shopItemsDatas.find((y) => y.id === id) || [];
            return `
            <table width="100%">
            <thead>
                <tr>
                    <td>Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="#"><i onclick="removeItem(${id})" class="bi bi-x-circle"></i></a></td>
                    <td><img src="${search.img}"></td>
                    <td>${search.name}</td>
                    <td>$${search.price}</td>
                    <td>
                    <div id="cart-quantity-container">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    </td>
                    <td>$${item*search.price}</td>
                </tr>
            </tbody>
        </table>
            `
        }).join(""));
    } else{
        ShoppingCart.innerHTML = `
        <table width="100%">
            <thead>
                <tr>
                    <td>Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                </tr>
            </thead>
        <table>`
        label.innerHTML = `
            <div id="subtotal">
                <h3>Cart Total</h3>
                <table>
                    <tr>
                        <td>Total : $0</td>
                    </tr>
                </table>
                <button class="normal">Proceed to checkout</button>
            </div>`
    }
};
generateCartItems();

let increment = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0); // delete item when its 0 from local storage
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) =>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) =>{
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let totalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemsDatas.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x+y,0);
        label.innerHTML = `
            <div id="subtotal">
                <h3>Cart Total</h3>
                <table>
                    <tr>
                        <td>Total : $${amount}</td>
                    </tr>
                </table>
                <button class="normal">Proceed to checkout</button>
            </div>`
    } else return;  
}
totalAmount();
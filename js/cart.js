import { productList, shoppingCartList } from './dataStore.js';
import Cart from "./cartClass.js";

// target first cart icon 
let firstCartIcon = document.getElementById('firstCartIcon');

// target cart icon 
let cartIcon = document.querySelector('.cart-widget');

//target close button
let closeCart = document.querySelector('.close');

//target  checkout button 
let checkOut = document.querySelector('.check');

// target body
let body = document.querySelector('body');

//target add to cart 
let addToCart = document.querySelector('.CartButton');

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

//target reset button 
let reset = document.querySelector('.reset');
reset.addEventListener('click', ()=> {


    if (shoppingCartList.size === 0) {
        alert("Cart is now empty.");
    } else {
        console.log("Cart has items.");
        // Clear all items in the cart
        shoppingCartList.clear();
    }
    localStorage.removeItem('shoppingCart'); // Clear cart data from localStorage ->shoppingCart is the key
    displayCart(); //render cart again 
   
    console.log("check display");
   
})



firstCartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

//click event to display cart or disappear cart 
cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

//click event to disappear cart 
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

//alert message to checkout 
checkOut.addEventListener('click', () => {
    alert("We're currently enhancing our payment system to serve you better. Please bear with us as this feature will be available soon.");
});


export function handleCart(e) {

    const productId = e.target.closest('.product').id; //id string type

    const SelectItem = productList.get(productId); // object 
    console.log(SelectItem.name); //  SelectItem.id = product id ,  SelectItem.name = product name ....and so

    if (shoppingCartList.has(SelectItem.pid)) {
        let existingProduct = shoppingCartList.get(SelectItem.pid);  // retrieve that item in the cart throught id 
        console.log("cart already has this item so amount +1 " + existingProduct);
          // Check if adding another would exceed the limit
          if (existingProduct.amount >= 50) {
            alert("Sorry products not available!!!");
        } else {
            existingProduct.amount++; // Since cart already has that item and limit not reached, amount++
            console.log("Product amount: " + existingProduct.amount);
        }
    }
    else {
        let tmpProduct = new Cart(SelectItem.pid, SelectItem.name, SelectItem.category, SelectItem.price, SelectItem.rating, SelectItem.imagePath);
        console.log("this is tmp :" + tmpProduct.name);
        shoppingCartList.set(tmpProduct.pid, tmpProduct);
    }

    saveCartToLocalStorage();
    displayCart();
}

function loadCartFromLocalStorage() {
    const storedCartData = localStorage.getItem('shoppingCart');
    if (storedCartData) {
        const cartArray = JSON.parse(storedCartData);
        shoppingCartList.clear(); // Clear the current Map

        for (let item of cartArray) {
            // iterate cartArray data in local storage and populate into shoppingCartList 
            const cartItem = new Cart(item.pid, item.name, item.category, item.price, item.rating, item.imagePath, item.amount);
             // Repopulate the Map
            shoppingCartList.set(item.pid, cartItem);
        }

        displayCart(); // re-render cart page 

    }
}




//cart format -> image / name / price/ minus / itemAmount / plus

export function displayCart() {
    document.querySelector('.listCart').innerHTML = ""; // reset the cart
    
    let priceSum = 0;
    let itemAmountSum = 0;
    
    for (let pr of shoppingCartList.values()) {
        let product = shoppingCartList.get(pr.pid);
        console.log("this is pr " + product.pid);
        let item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('data-pid', product.pid); // Set data attribute with product ID
        // append image to item div 
        let imageContainer = document.createElement('div');
        imageContainer.className = 'image';
        let image = document.createElement('img');
        image.src = product.imagePath;
        image.alt = `items-${product.pid}`;
        imageContainer.appendChild(image);
        // item.append(imageContainer);

        // append product name to item div 
        let nameContainer = document.createElement('div');
        nameContainer.className = 'name'
        nameContainer.innerHTML = product.name;
        // item.append(nameContainer);

        //append total price to item div 
        let priceContainer = document.createElement('div');
        priceContainer.className = 'itemPrice'
        priceContainer.innerHTML = `$${product.price}`;
        // item.append( priceContainer);

        //append amount to item div 
        let amountContainer = document.createElement('div');
        amountContainer.className = 'amount';

        //minus 
        let minusContainer = document.createElement('span');
        minusContainer.className = 'minus';
        minusContainer.innerText = '-';

        //item amount
        let itemAmountContainer = document.createElement('span');
        itemAmountContainer.className = 'itemAmount';
        itemAmountContainer.innerText = product.amount;

        //plus
        let PlusContainer = document.createElement('span');
        PlusContainer.className = 'plus';
        PlusContainer.innerText = '+';

        // priceSum  += Number(pr.cartTotal());
        // itemAmountSum +=Number(pr.amount);

        // append minus, item amount and plus into amountContainer 
        amountContainer.append(minusContainer, itemAmountContainer, PlusContainer);

        // append all in to item in a row 
        item.append(imageContainer, nameContainer, priceContainer, amountContainer)

        // listCart append all item 
        document.querySelector('.listCart').append(item);

    }


    // add click event to each minus button 
    for (let minus of document.querySelectorAll('.minus')) {
        minus.addEventListener("click", handleMinus);
    }

    // add click event to each plus button 
    for (let plus of document.querySelectorAll('.plus')) {
        plus.addEventListener("click", handlePlus);

    }

        // iterate the cart which store in localstorage
    // Retrieve the stored data from localStorage
    const storedCartData = localStorage.getItem('shoppingCart');
 
    if (storedCartData) {
        const cartArray = JSON.parse(storedCartData);
        for (let item of cartArray) {
            console.log("localStorage item amount: " + item.amount);
            itemAmountSum+=item.amount;
            let itemSum = Number(item.price)*Number(item.amount);
            console.log('this is'+itemSum);
            priceSum += itemSum;
        }
    } else {

        console.log("No cart data found in localStorage.");
        
    }


    console.log("the cart size is "+ shoppingCartList.size)
 
    document.querySelector('.total-price').innerText= priceSum; 

    // target itemNumber tag then add itemsum to there 
    document.querySelector('.itemNumber').innerText= itemAmountSum;

    document.querySelector('.cart-count').innerText=itemAmountSum;

}

function saveCartToLocalStorage() {
    console.log("this is local storage");
    const cartData = Array.from(shoppingCartList.values()); // Convert Map values to an Array
    localStorage.setItem('shoppingCart', JSON.stringify(cartData)); // Serialize and save
}

function handleMinus(e) {

    const itemContainer = e.target.closest('.item');  // Find the closest parent item container
    const productId = itemContainer.getAttribute('data-pid'); // Retrieve the product ID from the data-pid attribute
    console.log("minus product id " + productId);
    if (shoppingCartList.has(productId)) {
        let product = shoppingCartList.get(productId); // access shopping cart product through product id 

        if (product.amount > 0) {

            product.amount--;
            // note here is not document.querySelector , it's itemContainer.querySelector 
            // Find the .itemAmount element within the same .item container and update its text
            const itemAmount = itemContainer.querySelector('.itemAmount');
            itemAmount.textContent = product.amount;
            saveCartToLocalStorage()
            displayCart();
           
        }
        if (product.amount == 0) {
            
            shoppingCartList.delete(product.pid); // if amount == 0 delete product 
            saveCartToLocalStorage()
            displayCart(); //render cart again 
         
        }


    }

}

function handlePlus(e) {
    const itemContainer = e.target.closest('.item');  // Find the closest parent item container
    const productId = itemContainer.getAttribute('data-pid'); // Retrieve the product ID from the data-pid attribute

    if (shoppingCartList.has(productId)) {
        let product = shoppingCartList.get(productId); // access shopping cart product through product id 

        if (product.amount > 0 && product.amount<50) {

            product.amount++;
            // note here is not document.querySelector , it's itemContainer.querySelector 
            // Find the .itemAmount element within the same .item container and update its text
            const itemAmount = itemContainer.querySelector('.itemAmount');
            itemAmount.textContent = product.amount;
            saveCartToLocalStorage();
            displayCart();
           
        }else{
            alert("Sorry products not available!!!");
        }

       

    }
}

// target cart icon
let cartIcon = document.querySelector(".cart-widget");

//target close button
let closeCart = document.querySelector(".close");

//target  checkout button
let checkOut = document.querySelector(".check");

// target body
let body = document.querySelector("body");

//click event to display cart or disappear cart
cartIcon.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

//click event to disappear cart
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

//alert message to checkout
checkOut.addEventListener("click", () => {
  alert(
    "We're currently enhancing our payment system to serve you better. Please bear with us as this feature will be available soon."
  );
});

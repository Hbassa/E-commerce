var userCart = []
var productQuantity = []
var customerName = []

var cartCounter = document.querySelector(".cart-counter");
var counter = 0;
var total = 0;
    // writing script function for product buttons to call a function which adds the product to the cart and changes the value of buttons inner html
var cartItems = document.getElementsByClassName("cart-items")[0];
    

 // logic to change button value styling and cart item counter after click
 var productButtons = document.getElementsByClassName("product-button");

 for (var i = 0; i < productButtons.length; i++) {
     var productButton = productButtons[i];
     productButton.addEventListener("click", productClicked)
 }

 
// CheckOut Button
var checkOutButton = document.querySelector(".cart-btn-co").addEventListener("click", checkOut);
// Continue shopping Button
var continueShoppingButton = document.querySelector(".cart-btn-cs").addEventListener("click", continueShopping);
//summary buton
var summaryButton = document.querySelector(".summary-btn").addEventListener("click", clearSession);



function productClicked(event){
    //add to cart
    var buttonClicked = event.target;
    var product = buttonClicked.parentElement;
    var productName = product.getElementsByClassName("product-name")[0].innerText;
    var price = product.getElementsByClassName("price")[0].innerText;
    
    
    if (this.innerHTML == "REMOVE FROM CART"){
        //  Button Styling
        removeCartProduct();
        this.innerHTML = "ADD TO CART";
        this.classList.remove("clicked");
                 
    }
    else{
        this.innerHTML = "REMOVE FROM CART";
        this.classList.add("clicked");
        addProductToCart(price, productName);
        
    }
}

function addProductToCart(price, productName){
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
   
// Add cart counter
    for (var i = 0; i < productButtons.length; i++){
        counter = counter + 1;
        cartCounter.innerText = counter;
        break
    }
    
//Pass Products to cart Modal
    var cartItemContents = `      
                                <h5><li class="serial-numb"></li></h5>
                                <h5 class="cart-product-name">${productName}</h5>
                                <h5 class="cart-price">${price}</h5>
                                <div class="cart-quantity">
                                    <button class="qt-btn-add qt-btn">+</button>
                                    <input class="qt-numb" type="text" value="1"></input>
                                    <button class="qt-btn-sub qt-btn">-</button>
                                </div>
                                <button class="item-remove-btn" type="submit">Remove</button>
                                
                            `
    cartItem.innerHTML = cartItemContents;
    cartItems.append(cartItem);
        
    ///pushing items selected to cart array
        var j;
        j = cartItems.children
        for(var i = 0; i < j.length; i++){
            var q = j[i]
            var b = q.getElementsByClassName("cart-product-name")[0].innerText
            
        }
        userCart.push(b)

     // Qantity Increase and Decrease Buttons
     
    var increaseButtons = document.getElementsByClassName("qt-btn-add");
   

    for (var i = 0; i < increaseButtons.length; i++) {
         var addButton = increaseButtons[i];
         addButton.addEventListener("click", increaseQuantity);
    }
    
    var decreaseButtons = document.getElementsByClassName("qt-btn-sub");
    
    for (var i = 0; i < decreaseButtons.length; i++) {
        var decreaseButton = decreaseButtons[i];
        decreaseButton.addEventListener("click", decreaseQuantity);
    }
    

    //Cart Remove Buttons
    var cartRemoveButtons = document.getElementsByClassName("item-remove-btn");

    for (var i = 0; i < cartRemoveButtons.length; i++) {
         var cartRemoveButton = cartRemoveButtons[i];
         cartRemoveButton.addEventListener("click", cartProduct);
    }

    updateTotal()  
}

function removeCartProduct() {
    var cartItem = document.getElementsByClassName("cart-item")[0];
    cartItem.remove()

 //remove cart counter
    for (var i = 0; i < productButtons.length; i++){
    counter = counter - 1;
    cartCounter.innerText = counter;
    break
}
    updateTotal()
}

function cartProduct(event){
    var buttonRemoved = event.target;
    var productRemovedName = buttonRemoved.parentElement.children[1].innerText;
    
    var buttons = document.getElementsByClassName("product-button");
    for (var i = 0; i < buttons.length; i++){
        var buttonClicked = buttons[i];
        var productClickedName = buttonClicked.parentElement.children[1]
        if (productRemovedName = productClickedName){
            buttonClicked.innerText = "ADD TO CART"
            buttonClicked.classList.remove("clicked")
        }
        
    }
    
    removeCartProduct()
}

function updateTotal(){
    var cartItemsCont = document.getElementsByClassName("cart-items")[0];
    var cartItems = cartItemsCont.getElementsByClassName("cart-item");
    
    for (var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i];
        var priceEl = cartItem.getElementsByClassName("cart-price")[0];
        var quantityEl = cartItem.getElementsByClassName("qt-numb")[0];
        var price = parseFloat(priceEl.innerText.replace("N", "").replace(",", ""));
        var quantity = parseInt(quantityEl.value);

        total = total + (price * quantity);

    }
    total = Math.round(total * 100)/100;
    document.getElementsByClassName("amount-to-be-paid")[0].innerText = "N" + total;
}

function increaseQuantity(event){
    var increaseButtonClicked = event.target;
    var input = increaseButtonClicked.parentElement.children[1];
    var inputValue = input.value;
    var newValue = parseInt(inputValue) + 1;
    input.value = newValue;

    
    updateTotal()
}

function decreaseQuantity(event){
    var decreaseButtonClicked = event.target;
    var input = decreaseButtonClicked.parentElement.children[1];
    var inputValue = input.value;
    var newValue = parseInt(inputValue) - 1;

    if (isNaN(newValue) || newValue <= 0) {
        newValue = 1;
    }
    else{
        input.value = newValue;
    }

    updateTotal()
}


function continueShopping(){
    var cart = document.getElementsByClassName("cart-checkout")[0];
    cart.style.display = "none"
    

}


//cart button click
var cart = document.getElementsByClassName("cart-checkout")[0];
var cartButton = document.getElementsByClassName("cart-logo")[0];
cartButton.addEventListener("click", cartClick)



function cartClick() {
    if (cart.style.display == "none"){
        cart.style.display = "block"
    }
    else{
        cart.style.display = "none"
        }  

    
}

// cart clickoutside

window.addEventListener('mouseup', cartClickOutside)

function cartClickOutside(event){
	var box = document.getElementById("cart");

    var cartInput = document.getElementsByTagName("input")[0]
    var cartInput2 = document.getElementsByTagName("input")[1]
    var cartInput3 = document.getElementsByTagName("input")[2]

	if (event.target != box && event.target.parentNode != box && event.target != cartInput && event.target != cartInput2 && event.target != cartInput3){
        box.style.display = 'none';
    }
}


// form validation
    

function nameValidate(userName){
//Name Input Validation
    var nameError;
    var userName = document.getElementsByClassName("user-name")[0].value;

    if (userName == "") {
        nameError = "Name cannot be blank"
    }
    else {
        return true; 
    }
    
    document.getElementsByClassName("name-error")[0].innerText = nameError
}
    
// Email Validation
function emailValidate(userMail){
    var mailError;
    var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
    var userMail = document.getElementsByClassName("user-mail")[0];

    if(userMail.value.match(mailFormat)){
        return true;
    }
    else{
        mailError = "Enter a vaild mail"
    }
    document.getElementsByClassName("mail-error")[0].innerText = mailError  
}
   
//Number Validation
function numberValidate(userNumber){
    var numberError;
    var userNumber = document.getElementsByClassName("user-number")[0];
    var numb = String(userNumber.value)

    if (isNaN(numb) || numb.length < 11 || numb.length > 11) {
        numberError = "Please input a valid phone number e.g '080XXXXXXXX'"
    }
    else{
        return true;
    }
 document.getElementsByClassName("numb-error")[0].innerText = numberError
}

function showSummary() {
    
    var showSummary = document.getElementsByClassName("show-summary")[0];
    showSummary.style.display = "block"

    var userName = customerName[0]
    var customer = document.getElementsByClassName("customer")[0];

     //Salutation to div
    customerSalutation = `
    <h3>Thank you,<span class="name-style">${userName}</span>, Your Order Has Been Received</h3>
                        `
    customer.innerHTML = customerSalutation;
   

    for(var i = 0; i < userCart.length; i++){
        var customerProduct = userCart[i]
        var quantityProduct = productQuantity[i]
        
        var cart = `
        <h5><li class="serial-numb"></li></h5>
       <h5>${customerProduct}</h5>
        <h5>${quantityProduct}</h5>
                    `

    var cartSummary = document.getElementsByClassName("cart-summmary")[0];
    var  sumItem = document.createElement("div");
    sumItem.classList.add("sum-item");
    sumItem.innerHTML = cart;
    cartSummary.append(sumItem);
    
    }   
}


function checkOut(){
    nameValidate(userName)
    numberValidate(userNumber)
    emailValidate(userMail)

    var quantity = document.getElementsByClassName("qt-numb");
    for (var i = 0; i < quantity.length; i++){
        quant = quantity[i].value
        productQuantity.push(quant)
        
    }

    
    

    var userName = document.getElementsByClassName("user-name")[0].value;
    var userMail = document.getElementsByClassName("user-mail")[0];
    var userNumber = document.getElementsByClassName("user-number")[0];

    customerName.push(userName);
    
   
   if (nameValidate == true && numberValidate == true && emailValidate == true){
         payWithPaystack()
         
         var cart = document.getElementsByClassName("cart-checkout")[0];
         cart.style.display = "none"  
    }
   else{
        return false
    }
  
}


//PayStack API
function payWithPaystack() {
    var handler = PaystackPop.setup({
      key: 'pk_test_1dd67a5fcf109763dc27f41d861651e08f54cb36', // Replace with your public key
      email: document.getElementById('email-address').value,
      amount: total * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
      currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
      ref: 'YOUR_REFERENCE', // Replace with a reference you generated
      callback: function(response) {
        //this happens after the payment is completed successfully
        showSummary()
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }

function clearSession(){
    document.location.reload()
}




/*Denna funktion är avsedd för att validera ett formulär (myForm).
 Den försöker hämta värdena från formulärfälten med namnen
"fname", "email", "address", "city" och "zipcode". 
Om något av dessa fält är tomt visas ett varningsmeddelande, 
och funktionen returnerar false, vilket indikerar en valideringsfel. */

function validateForm() {
    let x = document.forms["myForm"]["fname", "email", "address", "city", "zipcode"].value;
    if (x == "") {
      alert("Du måste fylla i samtliga uppgifter");
      return false;
    }
  }

  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Hämta värdet för e-post
const email = urlParams.get('email');

// Använd värdet på sidan
console.log("E-postadress: " + email);
//document.getElementById('user-email').innerText = email;


  /*Denna kod definierar en modul för hantering av en shoppingvagn.
  Modulen använder ett IIFE (Immediately Invoked Function Expression) 
  för att skapa ett separat scope och möjliggöra privat variabelåtkomst.*/ 
  var shoppingCart = (function() {

    cart = [];
    
    
    /*Här skapas funktioner för att lägga till,
    ta bort och hantera objekt i shoppingvagnen.
    Dessutom finns funktioner för att spara och ladda 
    vagnens tillstånd från sessionStorage. */
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // spara vagnen
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // ladda cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }

    
  
    var obj = {};
    
    // Funktion för att lägga till objekt i vagnen
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
            // Om objektet redan finns i vagnen, öka antalet
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      // Skapa ett nytt objekt och lägg till det i vagnen om det inte redan finns
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    
    // Funktion för att sätta antalet för ett specifikt objekt i vagnen
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
            // Uppdatera antalet för det specifika objektet
          cart[i].count = count;
          break;
        }
      }
    };
    // Funktion för att ta bort ett objekt från vagnen
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            // Minska antalet för det specifika objektet
            cart[item].count --;
            // Ta bort objektet om antalet når 0
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Funktion för att ta bort alla förekomster av ett objekt från vagnen
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
            // Ta bort alla förekomster av objektet
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Funktion för att rensa hela vagnen
    obj.clearCart = function() {
        // Återställ vagnen till en tom array
      cart = [];
      saveCart();
    }
  
    // Funktion för att räkna det totala antalet objekt i vagnen
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Funktion för att beräkna den totala kostnaden för objekten i vagnen
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // Funktion för att skapa en kopia av vagnen med ytterligare beräkningar
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        // Lägg till en beräknad total för varje objekt
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    // Returnera den skapade objektet för att representera shoppingvagnsmodulen
    return obj;
  })();
  
/*Här fortsätter koden med händelseslyssnare som använder jQuery
 för att interagera med HTML-element och uppdatera shoppingvagnens
 gränssnitt. Det inkluderar händelseslyssnare för att lägga till objekt,
 rensa vagnen och hantera ändringar i antal objekt. */
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  // Funktion för att visa innehållet i shoppingvagnen
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  
  $('.show-cart').on("click", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  // Funktion för att visa innehållet i shoppingvagnen direkt när sidan laddas
  displayCart();
  

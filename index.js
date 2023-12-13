


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

 // för att få ut emailen på confirmations-sidan 
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
      // Loopa igenom varje objekt i vagnen
        for(var item in cart) {
          // Kolla om namnet på objektet matchar det angivna namnet
          if(cart[item].name === name) {
            // Minska antalet för det specifika objektet
            cart[item].count --;
            // Ta bort objektet om antalet når 0
            if(cart[item].count === 0) {
              // Använd splice för att ta bort objektet från arrayen
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Funktion för att ta bort ALLA förekomster av ett objekt från vagnen
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        // Kolla om namnet på objektet matchar det angivna namnet
        if(cart[item].name === name) {
            // Ta bort alla förekomster av objektet
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Funktion för att rensa hela vagnen (tömavarukorgen)
    obj.clearCart = function() {
        // Återställ vagnen till en tom array
      cart = [];
      saveCart();
    }
  
    // Funktion för att räkna det totala antalet objekt i vagnen
    obj.totalCount = function() {
      // Initialisera totalt antal till 0
      var totalCount = 0;
      // Loopa igenom varje objekt i vagnen
      for(var item in cart) {
        // Lägg till antalet för det aktuella objektet till det totala antalet
        totalCount += cart[item].count;
      }
      // Returnera det totala antalet
      return totalCount;
    }

    // Funktion för att beräkna den totala kostnaden för objekten i vagnen
    obj.totalCart = function() {
      // Initialisera totalt värdet till 0
      var totalCart = 0;
      // Loopa igenom varje objekt i vagnen
      for(var item in cart) {
        // Lägg till det totala värdet för det aktuella objektet till den totala summan
        totalCart += cart[item].price * cart[item].count;
      }
      // Returnera det totala värdet av objekt i vagnen, avrundat till två decimaler
      return Number(totalCart.toFixed(2));
    }
  
    // Funktion för att skapa en kopia av vagnen med ytterligare beräkningar
    obj.listCart = function() {
      // Skapa en tom array för att hålla kopior av objekten i vagnen med ytterligare beräkningar
      var cartCopy = [];
      // Loopa igenom varje objekt i vagnen
      for(i in cart) {
        // Hämta det aktuella objektet från vagnen
        item = cart[i];
        // Skapa en kopia av objektet
        itemCopy = {};
         // Loopa igenom varje egenskap (property) i objektet
        for(p in item) {
          // Kopiera egenskapens värde till den nya kopian
          itemCopy[p] = item[p];
  
        }
        // Lägg till en beräknad total för varje objekt och avrunda till två decimaler
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        // Lägg till den skapade kopian i arrayen av kopior
        cartCopy.push(itemCopy)
      }
      // Returnera den nya arrayen med kopior av objekten i vagnen
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
     // Förhindra standardbeteendet för klickhändelsen (till exempel att ladda om sidan)
    event.preventDefault();
    // Hämta namnet och priset från data-attributen på det klickade elementet
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    // Anropa funktionen addItemToCart i shoppingCart-modulen för att lägga till objekt i vagnen
    shoppingCart.addItemToCart(name, price, 1);
    // Uppdatera gränssnittet för att visa den uppdaterade vagnen
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    // Anropa clearCart-funktionen i shoppingCart-modulen för att tömma hela vagnen
    shoppingCart.clearCart();
    // Uppdatera gränssnittet för att visa den tomma vagnen
    displayCart();
  });
  
  // Funktion för att visa innehållet i shoppingvagnen
  function displayCart() {
     // Hämta en kopia av vagnens innehåll med ytterligare beräkningar
    var cartArray = shoppingCart.listCart();
    // Skapa en tom sträng för att bygga HTML-koden för att visa vagnens innehåll
    var output = "";
    // Loopa igenom varje objekt i den kopiade vagnen
    for(var i in cartArray) {
      // Bygg HTML-koden för varje objekt och lägg till den i output-strängen
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" 
        +  "</tr>";
    }
    // Uppdatera HTML-elementet med klassen 'show-cart' med den genererade HTML-koden
    $('.show-cart').html(output);
    // Uppdatera HTML-elementet med klassen 'total-cart' med det totala värdet av vagnen
    $('.total-cart').html(shoppingCart.totalCart());
    // Uppdatera HTML-elementet med klassen 'total-count' med det totala antalet objekt i vagnen
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
  

$(document).ready(function(){
	//get all items and bind to dragstart event
	$('.item').bind('dragstart', function (event) { 
        event.dataTransfer.setData('text/plain', this.id);//set data to be the id of the element the user is dragging e.g imac
        event.dataTransfer.effectAllowed = "move";
        $('h2').fadeIn('fast');//fade in this as prompt to the customer 
    }) 
    .hover( //display product info
        function () { $('div', this).fadeIn(); },  
        function () { $('div', this).fadeOut(); } 
    );
    //adding handlers to the cart
    $('#cart') 
    .bind('dragover', function (event) { 
        event.preventDefault(); 
    }) 
    .bind('dragenter', function (event) { 
        event.preventDefault(); 
    }) 
    .bind('drop', function (event) { 
    	//get the product we have dropped
    	var id = event.dataTransfer.getData('text/plain'),//get text data we transfered with the event e.g imac
    	item = $('#' + id),//e.g imac - use id to find elememnt that was dropped 
		cartList = $("#cart ul"),//empty at first 
		total = $("#total span"), //0.0
    	price = $('p:eq(1) span', item).text(), //select the span within the second paragraph of the item
    	prevCartItem = null,//will use it later to see if the item dragged into the cart is already there
    	//loop over each list item in the cartList to check to see if the data property id is the same as the variable id
    	notInCart = (function () { 
	        var lis = $('li', cartList), 
	            len = lis.length; 
	 
	        for (var i = 0; i < len; i++ ) { 
	            var temp = $(lis[i]); 
	            if (temp.data("id") === id) { 
	                prevCartItem = temp; 
	                return false; 
	            } 
	        } 
	        return true; 
	    } ()), 
	    quantLeftEl, quantBoughtEl, quantLeft;

	    $("h2").fadeOut('fast');
	    //if item isn't in the cart, add it to the cart
	    if (notInCart) { 
		    prevCartItem = $('<li />', { //create a list item, pass object literal
		        text : $('p:first', item).text(), //set text to product name from first paragraph of product item e.g T Shirt
		        data : { id : id } //set store product id with the item
		        //
		    }).prepend($('<span />', { 
		        'class' : 'quantity', 
		        text : '0' 
		    })).prepend($('<span />', { 
		        'class' : 'times', 
		        text : "X" 
		    })).prepend($('<span />', { 
		        'class' : 'price', 
		        text : price 
		    })).prepend($('<input />', { 
		        'class' : 'remove-item', 
		        'type' : 'button',
		        'value' : "X"
		    })).appendTo(cartList); 
		}

		quantLeftEl = $('p:last span', item); //get quantity from product item
		quantLeft   = parseInt(quantLeftEl.text(), 10) - 1; //what's really left - decrement the quantity
		if(quantLeft >= 0){
			quantLeftEl.text(quantLeft); 

			quantBoughtEl = $('.quantity', prevCartItem); //increment quantity
			quantBoughtEl.text(parseInt(quantBoughtEl.text(), 10) + 1);


			total.text((parseFloat(total.text(), 10) + parseFloat(price.split('$')[1])).toFixed(2)); 
			localStorage.setItem("total", total.text());
			//alert("Item successfully added to your cart.");
	 		//prevent event to bubble
			event.stopPropagation(); 
			return false;
		}
		//remove from product list if we run out of stock
		if (quantLeft <= 0) {
		    //item.fadeOut('fast').remove(); 
		    alert("Sorry, looks like this item is out of stock.");
		    return false;
		} 	
		
		
    });

	$('#cart').on('click','.remove-item',function(){
		var removeNum = prompt("How many would you like to remove?");
		remNum = parseInt(removeNum);
		if(isNaN(remNum) || remNum < 0){
			alert("Please enter a positive number");
			return false;
		}
		//reduce quantity bought by remNum
		var newquant = (parseInt($(this).nextAll('#cart .quantity').text(), 10) - remNum);
		if(newquant >= 0){
			//updating stock on products panels
			//get the item 
			var itemdesc = $(this).closest('li').text(); //$1099.00X10iMac
			itemdesc = itemdesc.split('X').pop().match(/\D+/).toString();//e.g iMac
						
			//Update stock after removing from cart - should increase	
			var items = $('#products li');			
			var itemsLen = items.length;

			for(var i = 0; i < itemsLen; i++){				
				if(($("#products li:eq("+i+") p:first").text()) === itemdesc){
				
				//var newStock = parseInt($("#products li:eq("+i+") p:first").nextAll('p:last').text().match(/\d+/)) + remNum;
				var newStock = parseInt($("#products li:eq("+i+") p:last span").text()) + remNum;			
				$("#products li:eq("+i+") p:last span").text(newStock);		
				}

			}
			
			$(this).nextAll('#cart .quantity').text(newquant);
			//reduce total i.e total - (price * remNum)
			var total = parseFloat(localStorage.getItem("total")).toFixed(2); //get total
			var curPrice = parseFloat($(this).nextAll('#cart .price').text().split('$')[1]).toFixed(2);//get price
			//New Total
			total = total - (curPrice * remNum)
			$("#total span").text(total.toFixed(2));
			//update Total's value in local storage
			localStorage.setItem("total", total.toFixed(2));			
		}			
		//if quantity runs to 0, remove item from cart area entirely
		if(newquant === 0){
			$(this).closest('li').remove();
		}
		else if(newquant < 0){
			alert("You cannot remove more items than you bought!")
		}
	});

});


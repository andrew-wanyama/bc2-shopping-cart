Drag and Drop Shopping Cart
===========================
Here I'm using HTML5's native drag and drop API to implement a simple Shopping Cart, so it's an entirely client side application. jQuery is used for event handling and easy DOM manipulation. 

HowTo
=====
To install this, all you need to do is download/clone the files and move them in your server, including the index.html and excluding this README.md, and you should be good to go! To 'buy' a product, you simply hover over it in the product panel on the left and *drag* it and *drop* to the cart on the right. As soon as you start dragging you should see a prompt on the right directing you where to drop which disappears after you've added the product to cart. The list of items will be dynamically inserted inserted to the cart area. The cart then collates Total Cost and Number of items. Notice that when you hover over any product, the product's info(description, price, quantity) comes up. After dragging a product to the cart, the quantity should be able to decrease by one. Look at the quantity as what we have in stock. 

Basically you should be able to drag and drop this way and get the total cost, until the product's quantity becomes zero meaning we've run out of stock, in which case you're not allowed to 'buy' the particular anymore. You can also remove items from the cart using the red close buttons next to the lists of items in the cart. Click that next to any particular one you want removed, enter how many of it you need removed and it will be done in no time. If the quantiy again runs to zero in the cart, we remove that list item from the cart entirely. Notice how the number of items and Total Costs decrease after the remove from cart operation. Also keep in mind that when you remove items like this, our quantity(stock) for that particular product should increase in our store; by the same number of number of items you removed.

Implementation Overview
=======================
- Get all items and bind to dragstart event. 
- Set data to be the id of the product the user is dragging. 
- Fade in a prompt to direct user where to drop the dragged item. 
- Also, on mouseover fade in product info, otherwise fade it out.
- Add this event's handlers to the cart.
- Grab the id that was set when we started dragging and use it to find the product that was dropped.
- Check if this item has alredy been added before, in which case you need to increment the quantity of the item in the cart and update Total cost accordingly. If it's not there, create a new list item and add it to the cart, should have a quantity of 1 and the cost of the item.
- Save the Total Cost in local storage.
- Alert user and prevent them from adding to cart if our quantity/stock in the product panel runs to zero.
- To remove item, close button is clicked and get the number specified of that item to be removed.
- Ensure it's a positive integer and user doesn't remove more of the items than they added to cart.
- Update new quantity and Total Cost in the cart after an item is removed.- 
- Update the product's stock by adding the number of items that's removed.
- Update value of Total Cost in local storage.
- If we remove everything of an item from cart i.e. quantity runs to zero, remove the item list entirely from cart area.



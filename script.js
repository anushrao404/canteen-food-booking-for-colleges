

document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const foodMenu = document.querySelector('.food-menu');
    
    const scrollAmount = 300; 

    leftButton.addEventListener('click', () => {
        foodMenu.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightButton.addEventListener('click', () => {
        foodMenu.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });


    const updateButtonState = () => {
        leftButton.disabled = foodMenu.scrollLeft === 0;
        rightButton.disabled = foodMenu.scrollLeft + foodMenu.clientWidth >= foodMenu.scrollWidth;
    };

    foodMenu.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);

 
    updateButtonState();
});


document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const foodMenu = document.querySelector('.food-menu');
    const cartContainer = document.querySelector('.cart-container');
    const cartItemsList = document.querySelector('.cart-items');
    const totalItemsEl = document.getElementById('total-items');
    const totalBillEl = document.getElementById('total-bill');
    const placeOrderButton = document.querySelector('.place-order-button');

    let cart = [];

    const scrollAmount = 300;


    leftButton.addEventListener('click', () => {
        foodMenu.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightButton.addEventListener('click', () => {
        foodMenu.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });


    const updateButtonState = () => {
        leftButton.disabled = foodMenu.scrollLeft === 0;
        rightButton.disabled = foodMenu.scrollLeft + foodMenu.clientWidth >= foodMenu.scrollWidth;
    };

    foodMenu.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);


    updateButtonState();

  
    foodMenu.addEventListener('click', (e) => {
        const foodItem = e.target.closest('.food-item');
        if (!foodItem) return;

        const name = foodItem.getAttribute('data-name');
        const price = parseFloat(foodItem.getAttribute('data-price'));

        addToCart(name, price);
        highlightSelectedItem(foodItem);
    });

    
    function addToCart(name, price) {
      
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            cart.push({ name, price, quantity: 1, total: price });
        }
        updateCartUI();
    }


    function highlightSelectedItem(item) {
        item.classList.add('selected');
        setTimeout(() => {
            item.classList.remove('selected');
        }, 300);
    }


    function updateCartUI() {
      
        cartItemsList.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${item.total.toFixed(2)}</span>
            `;
            cartItemsList.appendChild(li);
        });

    
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalBill = cart.reduce((acc, item) => acc + item.total, 0);

        totalItemsEl.textContent = totalItems;
        totalBillEl.textContent = totalBill.toFixed(2);

 
        if (cart.length > 0) {
            cartContainer.classList.remove('hidden');
        } else {
            cartContainer.classList.add('hidden');
        }
    }


    placeOrderButton.addEventListener('click', () => {
        if (cart.length === 0) return;

   

        alert(`Order placed!\nTotal Items: ${totalItemsEl.textContent}\nTotal Bill: ₹${totalBillEl.textContent}`);

      
        cart = [];
        updateCartUI();
    });
});

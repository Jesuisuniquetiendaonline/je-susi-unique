document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');

    renderCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const product = event.target.closest('.product');
        const productName = product.querySelector('h3').innerText;
        const productPrice = parseFloat(product.querySelector('.product-price').innerText.replace('.', '').replace('Precio: $', ''));
        const productImageSrc = product.querySelector('.product-image').src;

        const item = cartItems.find(item => item.name === productName);
        if (item) {
            item.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1, image: productImageSrc });
        }

        renderCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', cartTotal.textContent);
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            total += item.price * item.quantity;

            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: auto; margin-right: 10px;">
                ${item.name} - $${(item.price * item.quantity).toFixed(2)} x ${item.quantity}
                <button class="remove-from-cart" data-name="${item.name}">Eliminar</button>
            `;
            cartItemsList.appendChild(li);

            // Agregar evento para eliminar el ítem del carrito
            li.querySelector('.remove-from-cart').addEventListener('click', () => removeFromCart(item.name));
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(name) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index !== -1) {
            cartItems.splice(index, 1); // Elimina el ítem del array cartItems
            renderCart(); // Vuelve a renderizar el carrito actualizado
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('cartTotal', cartTotal.textContent);
        }
    }
});

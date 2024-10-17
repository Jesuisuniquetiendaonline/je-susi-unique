document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const product = event.target.closest('.product');
        const productName = product.querySelector('h3').innerText;
        const productPrice = parseFloat(product.querySelector('.product-price').innerText.replace('Precio: $', ''));
        const productImageSrc = product.querySelector('.product-image').src;

        const item = cartItems.find(item => item.name === productName);
        if (item) {
            item.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1, image: productImageSrc });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});

document.addEventListener('DOMContentLoaded', function () {
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const notification = document.getElementById('cart-notification');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Mostrar la notificación
        notification.classList.add('show');
        
        // Después de 3 segundos, ocultar la notificación
        setTimeout(function () {
            notification.classList.remove('show');
        }, 3000); // 3 segundos
    });
});
});
document.addEventListener('DOMContentLoaded', function () {
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const notification = document.getElementById('cart-notification');

// Asume que la cantidad de productos viene del servidor, y se actualiza aquí
addToCartButtons.forEach(button => {
const productElement = button.closest('.product');
const productStockElement = productElement.querySelector('.product-stock');
let productStock = parseInt(productStockElement.textContent);

// Si la cantidad de producto es mayor a 0, habilita el botón
if (productStock > 0) {
    button.disabled = false;
}

button.addEventListener('click', function () {
    if (productStock > 0) {
        // Enviar la solicitud al servidor para disminuir la cantidad en la base de datos
        updateProductStockOnServer(productElement.dataset.productId, productStock - 1);

        // Actualizar el stock en la interfaz de usuario
        productStockElement.textContent = productStock - 1;
        productStock--;

        // Si no hay más unidades disponibles, deshabilitar el botón
        if (productStock === 0) {
            button.disabled = true;
        }

        // Mostrar la notificación de "Producto agregado"
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Mostrar la notificación por 3 segundos
    }
});
});

// Función que envía la solicitud al servidor para actualizar la cantidad de productos
function updateProductStockOnServer(productId, newStock) {
// Este código puede realizar una solicitud Fetch a un API o enviar la información al servidor.
fetch('/update-product-stock', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: productId, stock: newStock })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log('Stock actualizado correctamente');
    } else {
        console.error('Error al actualizar stock');
    }
})
.catch(error => console.error('Error en la solicitud:', error));
}
});
document.addEventListener('DOMContentLoaded', function () {
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const notification = document.getElementById('cart-notification');

addToCartButtons.forEach(button => {
const productElement = button.closest('.product');
const productStockElement = productElement.querySelector('.product-stock');
let productStock = parseInt(productStockElement.textContent);

// Si el producto tiene stock, habilitar el botón
if (productStock > 0) {
    button.disabled = false;
}

button.addEventListener('click', function () {
    if (productStock > 0) {
        // Solicitud al servidor para actualizar el stock
        updateProductStockOnServer(productElement.dataset.productId, productStock - 1);

        // Actualizar el stock en la interfaz de usuario
        productStockElement.textContent = productStock - 1;
        productStock--;

        // Si el stock llega a 0, deshabilitar el botón
        if (productStock === 0) {
            button.disabled = true;
        }

        // Notificar que el producto fue agregado al carrito
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Mostrar notificación por 3 segundos
    }
});
});

function updateProductStockOnServer(productId, newStock) {
fetch('/update-product-stock', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: productId, stock: newStock })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log('Stock actualizado correctamente');
    } else {
        console.error('Error al actualizar stock');
    }
});
}
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Base de datos simulada
let products = [
{ id: 1, name: 'Producto 1', stock: 10 },
{ id: 2, name: 'Producto 2', stock: 5 }
];

// Ruta para actualizar el stock
app.post('/update-product-stock', (req, res) => {
const { productId, stock } = req.body;

// Encontrar el producto por ID
const product = products.find(p => p.id === productId);

if (product && stock >= 0) {
product.stock = stock; // Actualizar el stock en la base de datos
res.json({ success: true, stock: product.stock });
} else {
res.json({ success: false, message: 'Producto no encontrado o stock inválido' });
}
});

// Ruta para obtener los productos
app.get('/products', (req, res) => {
res.json(products);
});

app.listen(port, () => {
console.log(`Servidor corriendo en http://localhost:${port}`);
});

document.addEventListener('DOMContentLoaded', function () {
fetch('/products')
.then(response => response.json())
.then(products => {
    products.forEach(product => {
        const productElement = document.querySelector(`.product[data-product-id="${product.id}"]`);
        const stockElement = productElement.querySelector('.product-stock');
        const button = productElement.querySelector('.add-to-cart');
        stockElement.textContent = product.stock;

        if (product.stock > 0) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
});
});



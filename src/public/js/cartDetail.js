console.log('cartDetail.js is Alive!')

function extractCidFromURL() {
    const currentUrl = window.location.pathname;
    const cidIndex = currentUrl.lastIndexOf('/');
    const cid = currentUrl.substring(cidIndex + 1);
    return cid;
}

const baseURL = "http://localhost:8080";
const cid = extractCidFromURL();
console.log(cid);

async function getCartDetail(cartId) {
    try {
        const response = await fetch(`${baseURL}/api/carts/${cartId}`);
        if (response.ok) {
            const productos = await response.json();
            return productos;
        } else {
            console.error("Error al obtener productos: ", response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

async function renderCartDetail(cartId) {
    console.log('Detalle carrito para renderizar con ID:', cartId);
    try {
        const response = await getCartDetail(cartId);
        console.log('getCartDetail response', response);

        const ul = document.getElementById('cartDetailUl');
        const title = document.querySelector('h3');
        title.textContent = `Detalle de carrito ID ${cartId}`;

        // Limpia el contenido actual de la lista ul
        ul.innerHTML = '';

        // Si la respuesta es exitosa y contiene la información esperada
        if (response.success && response.cartById && response.cartById.products) {
            response.cartById.products.forEach((producto) => {
                const li = document.createElement('li');
                li.classList.add('cartProductLi');

                const anchor = document.createElement('a');
                anchor.href = `${response.baseURL}/products/${producto._id}`;
                anchor.textContent = `Titulo: ${producto.title} - Cantidad: ${producto.quantity} - Precio: ${producto.price} - Total: ${producto.quantity * producto.price}`;

                li.appendChild(anchor);
                ul.appendChild(li);
            });
        } else {
            console.error('La respuesta no contiene la información esperada.');
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

renderCartDetail(cid);




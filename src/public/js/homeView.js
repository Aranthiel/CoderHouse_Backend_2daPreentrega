console.log('homeView is Alive!')

function fetchProducts() {
    return fetch('/api/products')
        .then(response => response.json())
        .then(data => data.products)
        .catch(error => {
            console.error('Error al obtener productos:', error);
            return []; // Devolver un array vacío si hay un error
        });
}

function renderProductCard(product) {
	const productCard = document.createElement('div');
	productCard.classList.add('product-card');

	const productImage = document.createElement('div');
	productImage.classList.add('product-image');
	const image = document.createElement('img');
	image.src = product.tumbnail || 'https://placehold.co/200/74c1c4/69888a?text=Hello\nWorld'; // Asignar la imagen del producto
	productImage.appendChild(image);

	const productInfo = document.createElement('div');
	productInfo.classList.add('product-info');

	const titleContainer = document.createElement('div');
	titleContainer.classList.add('title-container');
	const title = document.createElement('h2');
	title.textContent = product.title; // Agregar el título del producto
	titleContainer.appendChild(title);

	const descriptionContainer = document.createElement('div');
	descriptionContainer.classList.add('description-container');

	const category = document.createElement('p');
	category.textContent = `Categoría: ${product.category}`; // Agregar la categoría del producto

	const code = document.createElement('p');
	code.textContent = `Código: ${product.code}`; // Agregar el código del producto

	const price = document.createElement('p');
	price.textContent = product.price; // Agregar el precio del producto

	// Agregar elementos category, code y price al contenedor de descripción
	descriptionContainer.appendChild(category);
	descriptionContainer.appendChild(code);
	descriptionContainer.appendChild(price);

	const actionsContainer = document.createElement('div');
	actionsContainer.classList.add('actions-container');

	const viewDetailsBtn = document.createElement('button');
	viewDetailsBtn.textContent = 'Detalles';
	viewDetailsBtn.setAttribute('id', 'viewProductDetailsBtn'); 
	viewDetailsBtn.dataset.productId = product._id; 
	viewDetailsBtn.addEventListener('click', handleDetailsClick);



	const addToCartBtn = document.createElement('button');
	addToCartBtn.textContent = 'Agregar'; 
	addToCartBtn.setAttribute('id', 'addProductToCartBtn');
	addToCartBtn.dataset.productId = product._id; 
	addToCartBtn.addEventListener('click', handleAddToCartClick);


	// Agregar botones al contenedor de acciones
	actionsContainer.appendChild(viewDetailsBtn);
	actionsContainer.appendChild(addToCartBtn);

	// Agregar contenedores al contenedor principal de la información del producto
	productInfo.appendChild(titleContainer);
	productInfo.appendChild(descriptionContainer);
	productInfo.appendChild(actionsContainer);

	// Agregar elementos al producto
	productCard.appendChild(productImage);
	productCard.appendChild(productInfo);

	return productCard; // Devolver el elemento creado
}  

function renderProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ''; // Limpiar la lista antes de renderizar

    products.forEach(product => {
        const productCard = renderProductCard(product);
        productList.appendChild(productCard);
    });
}

window.addEventListener('load', async function() {
    try {
        const products = await fetchProducts(); // Obtener productos usando la función
        renderProducts(products); // Renderizar productos
    } catch (error) {
        console.error('Hubo un error:', error);
    }
});

function handleDetailsClick(event) {
    const productId = event.target.dataset.productId;
    console.log(`Se hizo clic en Detalles del producto con ID ${productId}`);
    
    window.location.href = `/products/${productId}`;
}

async function handleAddToCartClick(event) {
    const productId = event.target.dataset.productId;
    console.log(`Se hizo clic en Agregar al carrito del producto con ID ${productId}`);

    const cartId = obtenerCartId(); // Función para obtener el cartId desde la cookie
    
    if (cartId) {
        try {
            // Obtener el carrito actual antes de actualizarlo
            const cartResponse = await fetch(`/api/carts/${cartId}`);
            const cartData = await cartResponse.json();
            
            const existingProducts = cartData.products || [];
            
            // Verificar si el producto ya está en el carrito
            const existingProductIndex = existingProducts.findIndex(product => product.productId === productId);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                existingProducts[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no está en el carrito, agregarlo
                existingProducts.push({ productId: productId, quantity: 1 });
            }

            // Realizar la actualización del carrito con los productos actualizados
            const addToCartResponse = await fetch(`/api/carts/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: existingProducts })
            });
            // Puedes manejar la respuesta de la API aquí según sea necesario
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
        }
    } else {
        console.error('No se encontró el cartId en la cookie');
        // Manejar la situación donde no se encuentra el cartId en la cookie
    }
}

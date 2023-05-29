// Esta es la nueva función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  contadorCarrito.innerText = totalProductos;
}


const agregarAlCarrito = (producto) => {
  const index = carrito.findIndex((prod) => prod.id === producto.id);

  if (index !== -1) {
    // Si el producto ya está en el carrito, incrementa la cantidad en 1
    carrito[index].cantidad += 1;
  } else {
    // Si el producto no está en el carrito, agrega el producto con cantidad 1
    producto.cantidad = 1;
    carrito.push(producto);
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  actualizarContadorCarrito();
};

contadorCarrito.innerText = carrito.length;

const mostrarCarrito = () => {

  // Mostrar los productos en el carrito
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = ""; // Limpiar el contenido previo del contenedor

  if (carrito.length === 0) {
    // El carrito está vacío
    carritoContainer.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    // El carrito tiene productos
    carrito.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.classList.add("producto-carrito","product");

      const imagenElement = document.createElement("img");
      imagenElement.src = producto.image;
      imagenElement.alt = producto.name;
      imagenElement.classList.add("producto-imagen");

      const nombreElement = document.createElement("h3");
      nombreElement.textContent = producto.name;

      const precioElement = document.createElement("p");
      precioElement.textContent = `$ ${producto.price}`;

      const cantidadElement = document.createElement("p");
      cantidadElement.textContent = `Cantidad: `;
      productoElement.appendChild(cantidadElement);

      const decrementarBtn = document.createElement("button");
      decrementarBtn.textContent = "-";
      decrementarBtn.classList.add("cantidad-btn");
      decrementarBtn.addEventListener("click", () => {
        decrementarCantidad(producto.id);
      });

      const cantidadValorElement = document.createElement("span");
      cantidadValorElement.textContent = producto.cantidad;

      const incrementarBtn = document.createElement("button");
      incrementarBtn.textContent = "+";
      incrementarBtn.classList.add("cantidad-btn");
      incrementarBtn.addEventListener("click", () => {
        incrementarCantidad(producto.id);
      });

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add("eliminar-btn");
      eliminarBtn.addEventListener("click", () =>{

      eliminarProducto(producto.id)
      mostrarTotalPagar(); 
      });

      carritoContainer.appendChild(productoElement);
      productoElement.appendChild(nombreElement);
      productoElement.appendChild(imagenElement);
      productoElement.appendChild(precioElement);
      cantidadElement.appendChild(decrementarBtn);
      cantidadElement.appendChild(cantidadValorElement);
      cantidadElement.appendChild(incrementarBtn);
      productoElement.appendChild(eliminarBtn);      
    });
    
  }
  mostrarTotalPagar(); 
};

const decrementarCantidad = (prodId) => {
  const producto = carrito.find((prod) => prod.id === prodId);
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      mostrarCarrito(); // Actualizar la interfaz
      mostrarTotalPagar(); // Actualizar el total a pagar
      // Actualizamos el contador del carrito
      actualizarContadorCarrito();
    }
  }
};

const incrementarCantidad = (prodId) => {
  const producto = carrito.find((prod) => prod.id === prodId);
  if (producto) {
    producto.cantidad++;
    mostrarCarrito(); // Actualizar la interfaz
    mostrarTotalPagar(); // Actualizar el total a pagar
    // Actualizamos el contador del carrito
    actualizarContadorCarrito();
  }
};
const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
vaciarCarritoBtn.addEventListener("click", () => {
    vaciarCarrito();
    mostrarCarrito();
});


const vaciarCarrito = () => {
  carrito = [];
  actualizarContadorCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
};

const eliminarProducto = (prodId) => {
  const index = carrito.findIndex((prod) => prod.id === prodId);
  if (index !== -1) {
    carrito.splice(index, 1);
    mostrarCarrito(); // Actualizar la interfaz
    mostrarTotalPagar(); // Actualizar el total a pagar

    // Actualizamos el contador del carrito
    actualizarContadorCarrito();
  }
};

const calcularTotalPagar = () => {
  const total = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.price,
    0
  );
  return total;
};

const mostrarTotalPagar = () => {
  const totalPagar = calcularTotalPagar();
  const precioTotalElement = document.getElementById("precioTotal");
  precioTotalElement.textContent = totalPagar.toFixed(2);

  const descuentoElement = document.getElementById("descuento");
  descuentoElement.textContent = "0.00"; // Restablecer el descuento a 0

  const totalConDescuentoElement = document.getElementById("totalConDescuento");
  totalConDescuentoElement.textContent = totalPagar.toFixed(2); // Mostrar el total a pagar sin descuento
};


const aplicarCuponBtn = document.getElementById("aplicar-cupon-btn");
aplicarCuponBtn.addEventListener("click", aplicarDescuento);

function aplicarDescuento() {
  const cuponInput = document.getElementById("cupon-input");
  const cupon = cuponInput.value.trim(); // Obtener el valor del cupón y eliminar espacios en blanco al inicio y al final

  if (cupon === "DESCUENTO15") { // Reemplaza "DESCUENTO15" con tu código de cupón válido
    const totalPagar = calcularTotalPagar();
    const descuento = totalPagar * 0.15; // Calcular el descuento como el 15% del total a pagar
    const totalConDescuento = totalPagar - descuento;

    // Mostrar el descuento y el total a pagar con descuento en la interfaz
    const descuentoElement = document.getElementById("descuento");
    descuentoElement.textContent = descuento.toFixed(2);

    const totalConDescuentoElement = document.getElementById("totalConDescuento");
    totalConDescuentoElement.textContent = totalConDescuento.toFixed(2);
  } else {
    alert("El cupón ingresado no es válido.");
  }

  // Limpiar el campo de entrada del cupón
  cuponInput.value = "";
}

const pagarBtn = document.getElementById("pagar-btn");
pagarBtn.addEventListener("click", realizarPago);

function mostrarMensajePagoExitoso(total) {
  Swal.fire({
    icon: 'success',
    title: 'Pago exitoso',
    text: `Total pagado: $${total.toFixed(2)}`,
    confirmButtonText: 'Aceptar'
  });
}
function realizarPago() {
  const totalConDescuentoElement = document.getElementById("totalConDescuento");
  const totalConDescuento = parseFloat(totalConDescuentoElement.textContent);

  mostrarMensajePagoExitoso(totalConDescuento);
  vaciarCarrito();
  mostrarTotalPagar();
  mostrarCarrito();
}

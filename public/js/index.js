let coleccionVinos = firebase.firestore().collection("Vinoteca");
let vinos = [];
var vinosTintos = [];
var vinosRosados = [];
var vinosBlancos = [];
var vinosEspumantes = [];
var arrayAFiltrar = [];
var searchContainer = document.getElementsByClassName("filtroCheck");
var tituloCarousel = document.getElementById("tituloCarousel");
var inputSearch = document.getElementById("inputSearch");
var carouselExperiencias = document.getElementById("carouselExperiencia");
var contenedor = document.getElementById("contenedor");
var nosotrosId = document.getElementById("nosotrosContain");
var contacto = document.getElementById("idContacto");
var contenedorCarrito = document.getElementById("contendorCarrito");
const contadorCarrito = document.getElementById("carrito");

let checkCheckBoxes = [];
let search = "";

coleccionVinos.get().then((results) => {
  console.log(results);
  const data = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  vinos = data;
  console.log("Toda data en la colección 'vinos' ", vinos);

  for (var i = 0; i < vinos.length; i++) {
    if (vinos[i].category == "Vinos tintos") {
      vinosTintos.push(vinos[i]);
    } else if (vinos[i].category == "Vinos rosados") {
      vinosRosados.push(vinos[i]);
    } else if (vinos[i].category == "Vinos blancos") {
      vinosBlancos.push(vinos[i]);
    } else if (vinos[i].category == "Vinos espumantes") {
      vinosEspumantes.push(vinos[i]);
    }
  }

  imprimir(vinos);
});
console.log("Toda la colección 'vinos' ", vinos);

var textoBoton = [];
//Capturando el id de la seccion a la categória que se le hizo click en el menu de navegación

var botonNav = document.getElementsByClassName("nav-link");

for (var i = 0; i < botonNav.length; i++) {
  const element = botonNav[i];
  textoBoton.push(botonNav[i].innerText);

  element.addEventListener("click", function (e) {
    document.getElementById("name").innerHTML = e.target.innerText;
    imprimir(e.target.id);
    // e.preventDefault();
  });
}

function imprimir(id) {
  const elem = document.getElementsByClassName("active")[0];
  const activoNuevo = document.getElementById(id);
  
  // Si había un elemento con la clase "active", la removemos.
  if(elem) {
    elem.classList.remove("active");
  }

  // Verificamos que el id no sea "carrito" antes de agregar la clase "active".
  if(id !== "carrito" && activoNuevo) {
    // Agregamos la clase "active" al elemento nuevo.
    activoNuevo.classList.add("active");
  }

  switch (id) {
    case "nosotros":
      searchContainer[0].classList.add("searchContainer");
      comentarioNosotros();
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "none";
      contenedor.style.display = "none";
      contenedorCarrito.style.display = "none";      
      nosotrosId.style.display = "flex";
      break;
    case "vinosTintos":
      arrayAFiltrar = vinosTintos;
      searchContainer[0].classList.remove("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";
      contenedorCarrito.style.display = "none";
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosTintos);
      imageCarousel(vinosTintos);
      eventosCategories(vinosTintos);
      break;

    case "vinosRosados":
      arrayAFiltrar = vinosRosados;
      searchContainer[0].classList.remove("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";
      contenedorCarrito.style.display = "none";
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosRosados);
      imageCarousel(vinosRosados);
      eventosCategories(vinosRosados);
      break;

    case "vinosBlancos":
      arrayAFiltrar = vinosBlancos;
      searchContainer[0].classList.remove("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      contenedorCarrito.style.display = "none";
      nosotrosId.style.display = "none";
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosBlancos);
      imageCarousel(vinosBlancos);
      eventosCategories(vinosBlancos);
      break;

    case "vinosEspumantes":
      arrayAFiltrar = vinosEspumantes;
      searchContainer[0].classList.remove("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";
      contenedorCarrito.style.display = "none";
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosEspumantes);
      imageCarousel(vinosEspumantes);
      eventosCategories(vinosEspumantes);
      break;

    case "contacto":
      searchContainer[0].classList.add("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "none";
      contenedorCarrito.style.display = "none";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";
      formulario();
      break;

    case "carrito":
      searchContainer[0].classList.add("searchContainer");
      tituloCarousel.style.display = "none"
      carouselExperiencias.style.display = "none";
      contenedor.style.display = "none";
      nosotrosId.style.display = "none";
      contenedorCarrito.style.display = "flex";      
      mostrarCarrito();
      break;

    default:
      arrayAFiltrar = vinos;
      searchContainer[0].classList.remove("searchContainer");
      tituloCarousel.style.display = "flex"
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";
      contenedorCarrito.style.display = "none";
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinos);
      imageCarousel(vinos);
      eventosCategories(vinos);
      break;
  }
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function display(array) {
  var url;
  
  if (location.pathname == "/pages/details.html") {
    url = "./details.html";
  } else {
    url = "./pages/details.html";
  }

  var html = "";

  for (i = 0; i < array.length; i++) {
    html += `
        <div class="product">
        <img class="col-12" src="${array[i].image}" alt=${array[i].name}">
        <h3>${array[i].name}</h3>
        <p>${array[i].cepa}</p>
        <div class="row item">
          <p class="col-6 price">$ ${array[i].price}</p>
          <a href="${url}?id=${array[i].id}" class="col-4 btn">Ver mas</a> 
          <button class="botonCarrito boton-agregar" id="agregar${array[i].id}" col-9">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        
    </div>

        `;
  }
  document.getElementById("contenedor").innerHTML = html;

  // Agregar evento click a los botones "Agregar al carrito"
  const botonesAgregar = document.getElementsByClassName("boton-agregar");
  for (let i = 0; i < botonesAgregar.length; i++) {
    const boton = botonesAgregar[i];
    const id = boton.id.replace("agregar", ""); // Obtener el ID del producto

    boton.addEventListener("click", () => {
      const producto = array.find((prod) => prod.id === id);
      if (producto) {
        agregarAlCarrito(producto);
        mostrarTotalPagar();
      }
    });
  }
}

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
  console.log(carrito);
};

contadorCarrito.innerText = carrito.length;
// contadorCarrito.innerText = carrito.length;

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
  console.log("Carrito vaciado");
  actualizarContadorCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
};

const eliminarProducto = (prodId) => {
  const index = carrito.findIndex((prod) => prod.id === prodId);
  if (index !== -1) {
    carrito.splice(index, 1);
    console.log(`Producto con ID ${prodId} eliminado del carrito`);
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

function imageCarousel(array) {
  var experiencia = "";

  for (i = 0; i < array.length; i++) {
    experiencia += `   
        <li class="p-2"><img src="${array[i].experiencias}" alt="${array[i].name}"></li>
        <li class="p-2"><img src="${array[i].fotosUvas}" alt="${array[i].name}"></li>          
          `;
  }
  document.getElementById("experiencias").innerHTML = experiencia;

  const root = document.documentElement;
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
    "--marquee-elements-displayed"
  );

  const marqueeContent = document.querySelector("ul.marquee-content");

  root.style.setProperty("--marquee-elements", marqueeContent.children.length);
}

//Página de nosotros
function comentarioNosotros() {
  var nosotrosDescription;
  nosotrosDescription = `
  <div class="flex-container">
	<div class="spinner"><p>
		<div class="cube1"></div>
		<div class="cube2"></div>
		Loading...
		</p>
	</div>
	<div class="flex-slide home">
		<div class="flex-title flex-title-home">Home</div>
		<div class="flex-about flex-about-home"><p>"Wine es una exquisita vinoteca que ofrece una amplia selección de vinos de alta calidad para los amantes y conocedores de esta deliciosa bebida."</p></div>
	</div>
	<div class="flex-slide about">
		<div class="flex-title">Eventos</div>
		<div class="flex-about"><p>Muchos viñedos organizan eventos especiales, como festivales de vendimia, conciertos al aire libre, cenas temáticas y celebraciones en épocas especiales del año.</p></div>
	</div>
	<div class="flex-slide work">
		<div class="flex-title">Bodegas</div>
		<div class="flex-about"><p>Muchos viñedos ofrecen visitas guiadas por sus instalaciones, donde los visitantes tienen la oportunidad de recorrer los viñedos y aprender sobre el proceso de cultivo de las uvas. </p></div>
	</div>
	<div class="flex-slide contact">
		<div class="flex-title">Viñedos</div>
				<div class="flex-about">
					<p>En los viñedos, las vides son cuidadosamente cultivadas y cosechadas en el momento óptimo de madurez. Los viticultores emplean técnicas agrícolas especializadas para garantizar que las uvas alcancen su máximo potencial en términos de sabor, aroma y equilibrio.</p>					

		</div>
	</div>
</div>
  
  `;

  document.getElementById("nosotrosContain").innerHTML = nosotrosDescription;

  (function () {
    $(".flex-container").waitForImages(
      function () {
        $(".spinner").fadeOut();
      },
      $.noop,
      true
    );

    $(".flex-slide").each(function () {
      $(this).hover(
        function () {
          $(this).find(".flex-title").css({
            transform: "rotate(0deg)",
            top: "10%",
          });
          $(this).find(".flex-about").css({
            opacity: "1",
          });
        },
        function () {
          $(this).find(".flex-title").css({
            transform: "rotate(90deg)",
            top: "15%",
          });
          $(this).find(".flex-about").css({
            opacity: "0",
          });
        }
      );
    });
  })();
}

var time = location.search.split("?time=");

switch (time[1]) {
  case "nosotros":
    document.getElementById("name").innerHTML = "Nosotros";
    imprimir("nosotros");
    break;
  case "vinosTintos":
    document.getElementById("name").innerHTML = "Tintos";
    imprimir("vinosTintos");
    break;

  case "vinosRosados":
    document.getElementById("name").innerHTML = "Rosados";
    imprimir("vinosRosados");
    break;

  case "vinosBlancos":
    document.getElementById("name").innerHTML = "Blancos";
    imprimir("vinosBlancos");
    break;

  case "vinosEspumantes":
    document.getElementById("name").innerHTML = "Espumantes";
    imprimir("vinosEspumantes");
    break;

  case "contacto":
    document.getElementById("name").innerHTML = "Contacto";
    imprimir("contacto");
    break;

    case "carrito":
      document.getElementById("name").innerHTML = "Carrito";
      imprimir("carrito");
      break;

  default:    
    document.getElementById("name").innerHTML = "Home";
    imprimir("vinos");
}

//carrusel

//función que dinamisa botón left y right

var botonLeft = document.getElementById("left");

botonLeft.addEventListener("click", function (e) {
  var page1 = document.getElementById("name").innerText;
  console.log(textoBoton);
  if (textoBoton.indexOf(page1) > 0) {
    changePage(textoBoton.indexOf(page1) - 1);
    console.log(textoBoton.indexOf(page1));
  } else {
    changePage(6);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var page = document.getElementById("name").innerText;
  console.log(textoBoton);
  console.log(page);
  if (textoBoton.indexOf(page) < 6) {
    changePage(textoBoton.indexOf(page) + 1);
    console.log(textoBoton.indexOf(page));
  } else {
    changePage(0);
  }

  console.log("Boton derecho");
  // botones();
});

function changePage(i) {
  switch (i) {
    case 0:
      display(vinos);
      eventosCategories(vinos);
      imageCarousel(vinos);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      contenedorCarrito.style.display = "none";     
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.add("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");

      break;
    case 1:
      document.getElementById("name").innerHTML = textoBoton[i];
      carouselExperiencias.style.display = "none";
      contenedor.style.display = "none";
      nosotrosId.style.display = "flex";
      contenedorCarrito.style.display = "none";
      botonNav[0].classList.remove("active");
      botonNav[1].classList.add("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.add("searchContainer");
      comentarioNosotros();
      break;
    case 2:
      display(vinosTintos);
      imageCarousel(vinosTintos);
      eventosCategories(vinosTintos);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      contenedorCarrito.style.display = "none";     
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.add("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 3:
      display(vinosRosados);
      imageCarousel(vinosRosados);
      eventosCategories(vinosRosados);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      contenedorCarrito.style.display = "none";     
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.add("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 4:
      display(vinosBlancos);
      imageCarousel(vinosBlancos);
      eventosCategories(vinosBlancos);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";   
      contenedorCarrito.style.display = "none";   
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.add("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 5:
      display(vinosEspumantes);
      imageCarousel(vinosEspumantes);
      eventosCategories(vinosEspumantes);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";    
      contenedorCarrito.style.display = "none";  
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.add("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 6:
      formulario();
      carouselExperiencias.style.display = "none";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none";   
      contenedorCarrito.style.display = "none";   
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.add("active");
      searchContainer[0].classList.add("searchContainer");
      break;
  }
}

//Input Search

inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value;

  //A los capturado le quito espacios en blanco anteriores y posteriores con trim()
  //Además a lo ingresado lo paso a minusculsa con toLowerCase()

  search = datoInput.trim().toLowerCase();

  filtroCombinado();
});

//Checkbox

//CREACIÓN DINÁMICA DE CHECKBOX POR CATEGORÍA

function eventosCategories(array) {
  let categories = array.map((evento) => evento.cepa);

  //el método SET devuelve del array un objeto con los datos unicos, no los repite
  let unica = new Set(categories);

  //trasformo en un array el contenido del abjeto unica
  let lastCategories = [...unica];
  //console.log(lastCategories);
  let selectVinos = "";
  // let categoriasVinos = "";
  lastCategories.map(
    (cepa) =>
      //       categoriasVinos += `
      // <div class="form-check">
      // <input
      //   class="form-check-input checkCuadro"
      //   type="checkbox"
      //   value="${cepa}"
      //   id="flexCheckDefault"
      // />
      // <label
      //   class="form-check-label checkCategoria"
      //   for="flexCheckDefault"
      // >
      //   ${cepa}
      // </label>
      // </div>
      // `
      (selectVinos += `
<option value="${cepa}">${cepa}</option>
`)
  );
  document.getElementById("select").innerHTML = selectVinos;
  // document.getElementById("checkcategories").innerHTML = categoriasVinos;
  document.getElementById("select").addEventListener("change", function (e) {
    checkCheckBoxes = [];
    console.log(e.target.value);
    checkCheckBoxes.push(e.target.value);
    filtroCombinado();
  });
  //checkboxListener();
}

function filtroCombinado() {
  var filtrado = [];
  if (search !== "" && checkCheckBoxes.length > 0) {
    checkCheckBoxes.map((cepa) =>
      filtrado.push(
        ...arrayAFiltrar.filter(
          (vinos) =>
            vinos.name.toLowerCase().includes(search) && vinos.cepa === cepa
        )
      )
    );

    //display(filtrado);
  } else if (search !== "" && checkCheckBoxes.length == 0) {
    filtrado = arrayAFiltrar.filter((vinos) =>
      vinos.name.toLowerCase().includes(search)
    );
    //display(filtrado);
  } else if (search === "" && checkCheckBoxes.length > 0) {
    checkCheckBoxes.map((cepa) =>
      filtrado.push(...arrayAFiltrar.filter((vinos) => vinos.cepa === cepa))
    );

    console.log(filtrado);
    //display(filtrado);
  } else {
    filtrado = arrayAFiltrar;
  }
  filtrado.length > 0
    ? display(filtrado)
    : (contenedor.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`);
  // console.log(search);
  // console.log(checkCheckBoxes);
}

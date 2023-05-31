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
  const data = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  vinos = data;

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

  default:    
    document.getElementById("name").innerHTML = "Home";
    imprimir("vinos");
}


//carrusel de desplazamiento

//función que dinamisa botón left y right

var botonLeft = document.getElementById("left");

botonLeft.addEventListener("click", function (e) {
  var page1 = document.getElementById("name").innerText;
  if (textoBoton.indexOf(page1) > 0) {
    changePage(textoBoton.indexOf(page1) - 1);
  } else {
    changePage(6);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var page = document.getElementById("name").innerText;
  if (textoBoton.indexOf(page) < 6) {
    changePage(textoBoton.indexOf(page) + 1);
  } else {
    changePage(0);
  }

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
  let selectVinos = "";
  // let categoriasVinos = "";
  lastCategories.map(
    (cepa) =>
      (selectVinos += `
<option value="${cepa}">${cepa}</option>
`)
  );
  document.getElementById("select").innerHTML = selectVinos;
  document.getElementById("select").addEventListener("change", function (e) {
    checkCheckBoxes = [];
    checkCheckBoxes.push(e.target.value);
    filtroCombinado();
  });
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

  } else if (search !== "" && checkCheckBoxes.length == 0) {
    filtrado = arrayAFiltrar.filter((vinos) =>
      vinos.name.toLowerCase().includes(search)
    );
    //display(filtrado);
  } else if (search === "" && checkCheckBoxes.length > 0) {
    checkCheckBoxes.map((cepa) =>
      filtrado.push(...arrayAFiltrar.filter((vinos) => vinos.cepa === cepa))
    );

  } else {
    filtrado = arrayAFiltrar;
  }
  filtrado.length > 0
    ? display(filtrado)
    : (contenedor.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`);

}

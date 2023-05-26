let coleccionVinos = firebase.firestore().collection("Vinoteca");
let vinos = [];
//var vinos = vinoteca.vinos;
var vinosTintos = [];
var vinosRosados = [];
var vinosBlancos = [];
var vinosEspumantes = [];
var arrayAFiltrar = [];
var searchContainer = document.getElementsByClassName("filtroCheck");
var inputSearch = document.getElementById("inputSearch");
var carouselExperiencias = document.getElementById("carouselExperiencia");
var contenedor = document.getElementById("contenedor");
var nosotrosId = document.getElementById("nosotrosContain");

let checkCheckBoxes = [];
let search = "";

coleccionVinos.get()
  .then((results) => {
    console.log(results)
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
//console.log(textoBoton);

function imprimir(id) {
  const elem = document.getElementsByClassName("active")[0];
  const activoNuevo = document.getElementById(id);
  // elem.classList.remove("active");
  // activoNuevo.classList.add("active");

  switch (id) {
    case "nosotros":
      searchContainer[0].classList.add("searchContainer");
      //comentarioNosotros();
      carouselExperiencias.style.display = "none"
      contenedor.style.display = "none";
      nosotrosId.style.display = "flex"; 
      break;
    case "vinosTintos":
      arrayAFiltrar = vinosTintos;
      searchContainer[0].classList.remove("searchContainer");
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosTintos);
      imageCarousel(vinosTintos)
      eventosCategories(vinosTintos);
      break;

    case "vinosRosados":
      arrayAFiltrar = vinosRosados;
      searchContainer[0].classList.remove("searchContainer");
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosRosados);
      imageCarousel(vinosRosados)
      eventosCategories(vinosRosados);
      break;

    case "vinosBlancos":
      arrayAFiltrar = vinosBlancos;
      searchContainer[0].classList.remove("searchContainer");
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosBlancos);
      imageCarousel(vinosBlancos)
      eventosCategories(vinosBlancos);
      break;

    case "vinosEspumantes":
      arrayAFiltrar = vinosEspumantes;
      searchContainer[0].classList.remove("searchContainer");
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosEspumantes);
      imageCarousel(vinosEspumantes)
      eventosCategories(vinosEspumantes);
      break;

    case "contacto":
      searchContainer[0].classList.add("searchContainer");
      carouselExperiencias.style.display = "none";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      //display(contacto);
      formulario();
      break;

    default:
      arrayAFiltrar = vinos;
      searchContainer[0].classList.remove("searchContainer");
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinos);
      imageCarousel(vinos);
      eventosCategories(vinos);
      break;
  }
}

function display(array) {
  var url;
  var imageUrl;
  if (location.pathname == "/pages/details.html") {
    url = "./details.html";
  } else {
    url = "./pages/details.html";
  }

  var html = "";

  for (i = 0; i < array.length; i++) {
    html += `
        <div class="product">
        <img src="${array[i].image}" alt=${array[i].name}">
        <h3>${array[i].name}</h3>
        <p>${array[i].cepa}</p>
        <div class="row item">
          <p class="col-6 price">$ ${array[i].price}</p>
          <a href="${url}?id=${array[i].id}" class="col-4 btn">Ver mas</a> 
          <button class="botonCarrito col-9">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        
    </div>

        `;
  }
  document.getElementById("contenedor").innerHTML = html;
  
}

//Página de nosotros
// function comentarioNosotros(){
//   var nosotrosDescription;
//   nosotrosDescription = 
//   `
  
//   `

//   document.getElementById("nosotrosContain").innerHTML = nosotrosDescription;
// }

//Página de contactos

// function formulario() {
//   var formulary;
//   formulary = `
//   <section id="contact">
//   <div class="contact-box">

//     <div class="contact-form-wrapper">
//       <form>
//         <div class="form-item">
//           <input class="input-date" id="nombre" type="text" name="name" required>
//           <label class="placeholder">Name:</label>
//         </div>
//         <div class="form-item">
//           <input class="input-date mb-0" id="email" type="email" name="email" required>
//           <label class="placeholder">Email:</label>
//         </div>
//         <div class="form-item">
//         <label for="type" selector required></label>
//         <select id="type" class="form-control input-date  mb-0" name="type" >
//             <option value="Varios" selected>Opciones</option>
//             <option value="Reclamo">Reclamo</option>
//             <option value="Sugerencia">Sugerencia</option>
//             <option value="Felicitaciones">Felicitaciones</option>
//         </select>
//       </div>
//       <div class="form-item form_input">
//       <label for="date"></label>
//       <input type="date" id="date" class="form-control input-date">
//   </div>     
//         <div class="form-item">
//           <textarea id="comentario" class="input-date" name="message" required></textarea>
//           <label class="placeholder">Message:</label>
//         </div>
//         <div class="submit-btn boton_form">
//         <button id="enviar" class="boton" type="submit">Enviar<i class="fa-solid fa-paper-plane"></i></button>
//         <button id="resetBtn" type="reset" class="boton">Reset<i class="fa-solid fa-arrow-rotate-right"></i></button>
//     </div>
//       </form>
//     </div>
//   </div>
// </section>
//     `;
//   document.getElementById("contenedor").innerHTML = formulary;
// }
 

function imageCarousel(array){

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

// for (let i = 0; i < marqueeElementsDisplayed; i++) {
//   marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
// }
  
}

//console.log(location.search);

var time = location.search.split("?time=");
//console.log(time[1]);

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
  // if(document.getElementById("name") !== null){} 
    document.getElementById("name").innerHTML = "Home";
    imprimir("vinos");
   
  
    
}

//carrusel

//función que dinamisa botón left y right

var botonLeft = document.getElementById("left");

botonLeft.addEventListener("click", function (e) {
  var page1 = document.getElementById("name").innerText;
  console.log(textoBoton)
  if (textoBoton.indexOf(page1) > 0) {
    changePage(textoBoton.indexOf(page1) - 1);
    console.log(textoBoton.indexOf(page1))
  } else {
    changePage(6);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var page = document.getElementById("name").innerText;
  console.log(textoBoton)
  console.log(page)
  if (textoBoton.indexOf(page) < 6) {
    changePage(textoBoton.indexOf(page) + 1);
    console.log(textoBoton.indexOf(page))
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
      imageCarousel(vinos)
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
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
      botonNav[0].classList.remove("active");
      botonNav[1].classList.add("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      botonNav[6].classList.remove("active");
      searchContainer[0].classList.add("searchContainer");
    
      break;
    case 2:
      display(vinosTintos);
      imageCarousel(vinosTintos)
      eventosCategories(vinosTintos);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
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
      imageCarousel(vinosRosados)
      eventosCategories(vinosRosados);
      carouselExperiencias.style.display = "flex";
      contenedor.style.display = "flex";
      nosotrosId.style.display = "none"; 
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
selectVinos += 
`
<option value="${cepa}">${cepa}</option>
`


  )
  document.getElementById("select").innerHTML = selectVinos;
 // document.getElementById("checkcategories").innerHTML = categoriasVinos;
 document.getElementById("select").addEventListener("change", function (e){
  checkCheckBoxes = []
  console.log(e.target.value)
  checkCheckBoxes.push(e.target.value)
  filtroCombinado()
 })
  //checkboxListener();
}

// function checkboxListener() {
//   //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
//   //por un selectorAll capturo las etiquetas input de tipo checkbox
//   var checkboxs = document.querySelectorAll("input[type=checkbox");

//   //recorro cada uno de los input checkbox y le apilico un escuachador de eventos change
//   for (i = 0; i < checkboxs.length; i++) {
//     checkboxs[i].addEventListener("change", function (e) {
//       //limpio el array donde voyaa guardar los inut con checked true ya que utilizo un método push
//       //caso contrario se van a agregar más eventos
//       checkCheckBoxes = [];

//       //recorro el array de checkbox para extraer aquellos cuyo atributo checked sea true
//       for (i = 0; i < checkboxs.length; i++) {
//         if (checkboxs[i].checked) {
//           //si se cumple la condición de checked true los empujo al array que defini para almacenar
//           //los checkbox chequeados
//           checkCheckBoxes.push(checkboxs[i].value);
//         }
//       }

//       filtroCombinado();
//     });
//   }
// }



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
  filtrado.length > 0 ?
  display(filtrado) :
  contenedor.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`
  // console.log(search);
  // console.log(checkCheckBoxes);
}



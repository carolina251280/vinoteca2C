var vinos = vinoteca.vinos;
var vinosTintos = [];
var vinosRosados = [];
var vinosBlancos = [];
var vinosEspumantes = [];
var arrayAFiltrar = [];
var searchContainer = document.getElementsByClassName("filtroCheck");
var inputSearch = document.getElementById("inputSearch");

let checkCheckBoxes = [];
let search = "";

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

var textoBoton = [];
//Capturando el id de la seccion a la categória que se le hizo click en el menu de navegación

var botonNav = document.getElementsByClassName("boton");

for (var i = 0; i < botonNav.length; i++) {
  const element = botonNav[i];
  textoBoton.push(botonNav[i].innerText);
  console.log(textoBoton)

  element.addEventListener("click", function (e) {
    document.getElementById("name").innerHTML = e.target.innerText;
    imprimir(e.target.id);
  });
}
//console.log(textoBoton);

function imprimir(id) {
  const elem = document.getElementsByClassName("active")[0];
  const activoNuevo = document.getElementById(id);
  elem.classList.remove("active");
  activoNuevo.classList.add("active");

  switch (id) {
    case "vinosTintos":
      arrayAFiltrar = vinosTintos;
      searchContainer[0].classList.remove("searchContainer");
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosTintos);
      eventosCategories(vinosTintos);
      break;

    case "vinosRosados":
      arrayAFiltrar = vinosRosados;
      searchContainer[0].classList.remove("searchContainer");
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosRosados);
      eventosCategories(vinosRosados);
      break;

    case "vinosBlancos":
      arrayAFiltrar = vinosBlancos;
      searchContainer[0].classList.remove("searchContainer");
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosBlancos);
      eventosCategories(vinosBlancos);
      break;

    case "vinosEspumantes":
      arrayAFiltrar = vinosEspumantes;
      searchContainer[0].classList.remove("searchContainer");
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinosEspumantes);
      eventosCategories(vinosEspumantes);
      break;

    case "contacto":
      searchContainer[0].classList.add("searchContainer");
      //display(contacto);
      formulario();
      break;

    default:
      arrayAFiltrar = vinos;
      searchContainer[0].classList.remove("searchContainer");
      inputSearch.value = "";
      checkCheckBoxes = [];
      display(vinos);
      eventosCategories(vinos);
  }
}

function display(array) {
  var url;
  var imageUrl;
  if (location.pathname == "/pages/details.html") {
    url = "./details.html";
    imageUrl = "../img/";
  } else {
    url = "./pages/details.html";
    imageUrl = "./img/";
  }

  var html = "";

  for (i = 0; i < array.length; i++) {
    html += `
        <div class="product">
        <img src="${imageUrl}${array[i].image}" alt="Vino tinto 1">
        <h3>${array[i].name}</h3>
        <p>${array[i].cepa}</p>
        <div class="row item">
          <p class="col-6 price">$ ${array[i].price}</p>
          <a href="${url}?id=${array[i].id}" class="col-4 btn">Ver mas</a> 
        </div>
    </div>
        `;
  }
  document.getElementById("contenedor").innerHTML = html;
}

//Página de contactos

function formulario() {
  var formulary;
  formulary = `<div class="container">
      <section id="content">
        <form action="">
          <h1 class="tituloForm">Login Form</h1>
          <div>
            <input type="text" placeholder="Username" required="" id="username" />
          </div>
          <div>
            <input type="password" placeholder="Password" required="" id="password" />
          </div>
          <div>
            <input type="submit" value="Log in" />
            <a href="#">Lost your password?</a>
            <a href="#">Register</a>
          </div>
        </form><!-- form -->
        
      </section><!-- content -->
    </div><!-- container -->`;
  document.getElementById("contenedor").innerHTML = formulary;
}

//pantalla de detalle

//console.log(location.search);

var time = location.search.split("?time=");
//console.log(time[1]);

switch (time[1]) {
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
    changePage(5);
  }
});
var botonRight = document.getElementById("right");

botonRight.addEventListener("click", function (e) {
  var page = document.getElementById("name").innerText;
  console.log(textoBoton)
  console.log(page)
  if (textoBoton.indexOf(page) < 5) {
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
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.add("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
    
      break;

    case 1:
      display(vinosTintos);
      eventosCategories(vinosTintos);
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.add("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 2:
      display(vinosRosados);
      eventosCategories(vinosRosados);
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.add("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 3:
      display(vinosBlancos);
      eventosCategories(vinosBlancos);
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.add("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 4:
      display(vinosEspumantes);
      eventosCategories(vinosEspumantes);
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.add("active");
      botonNav[5].classList.remove("active");
      searchContainer[0].classList.remove("searchContainer");
      break;

    case 5:
      formulario();
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.add("active");
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

  let categoriasVinos = "";
  lastCategories.map(
    (cepa) =>
      (categoriasVinos += `
<div class="form-check">
<input
  class="form-check-input checkCuadro"
  type="checkbox"
  value="${cepa}"
  id="flexCheckDefault"
/>
<label
  class="form-check-label checkCategoria"
  for="flexCheckDefault"
>
  ${cepa}
</label>
</div>
`)
  )

  document.getElementById("checkcategories").innerHTML = categoriasVinos;

  checkboxListener();
}

function checkboxListener() {
  //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
  //por un selectorAll capturo las etiquetas input de tipo checkbox
  var checkboxs = document.querySelectorAll("input[type=checkbox");

  //recorro cada uno de los input checkbox y le apilico un escuachador de eventos change
  for (i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function (e) {
      //limpio el array donde voyaa guardar los inut con checked true ya que utilizo un método push
      //caso contrario se van a agregar más eventos
      checkCheckBoxes = [];

      //recorro el array de checkbox para extraer aquellos cuyo atributo checked sea true
      for (i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          //si se cumple la condición de checked true los empujo al array que defini para almacenar
          //los checkbox chequeados
          checkCheckBoxes.push(checkboxs[i].value);
        }
      }

      filtroCombinado();
    });
  }
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
  filtrado.length > 0 ?
  display(filtrado) :
  contenedor.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`
  // console.log(search);
  // console.log(checkCheckBoxes);
}



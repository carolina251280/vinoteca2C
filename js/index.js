var vinos = vinoteca.vinos;
var vinosTintos = [];
var vinosRosados = [];
var vinosBlancos = [];
var vinosEspumantes = [];

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
  textoBoton.push(botonNav[i]).innerText;
  element.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("time").innerHTML = e.target.innerText;
    imprimir(e.target.id);
  });
}
console.log(textoBoton);

function imprimir(id) {
  switch (id) {
    case "vinosTintos":
      botonNav[0].classList.remove("active");
      botonNav[1].classList.add("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      console.log("Estos son los vinos tintos");
      document.getElementById("time").innerHTML = "Vinos Tintos";
      display(vinosTintos);
      break;

    case "vinosRosados":
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.add("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      console.log("Estos son los vinos rosados");
      document.getElementById("time").innerHTML = "Vinos Rosados";
      display(vinosRosados);
      break;

    case "vinosBlancos":
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.add("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      console.log("Estos son los vinos blancos");
      document.getElementById("time").innerHTML = "Vinos Blancos";
      display(vinosBlancos);
      break;

    case "vinosEspumantes":
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.add("active");
      botonNav[5].classList.remove("active");
      console.log("Estos son los vinos espumantes");
      document.getElementById("time").innerHTML = "Vinos Espumantes";
      display(vinosEspumantes);
      break;

    case "contacto":
      botonNav[0].classList.remove("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.add("active");
      console.log("Estamos en contacto");
      document.getElementById("time").innerHTML = "Contacto";
      display(contacto);
      break;

    default:
      botonNav[0].classList.add("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");
      console.log("Estos son todos los vinos");
      document.getElementById("time").innerHTML = "Vinos";
      display(vinos);
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

//pantalla de detalle

console.log(location.search);

var time = location.search.split("?time=");
console.log(time[1]);

switch (time[1]) {
  case "vinosTintos":
    document.getElementById("time").innerHTML = "Vinos Tintos";
    imprimir("vinosTintos");
    break;

  case "vinosRosados":
    document.getElementById("time").innerHTML = "Vinos Rosados";
    imprimir("vinosRosados");
    break;

  case "vinosBlancos":
    document.getElementById("time").innerHTML = "Vinos Blancos";
    imprimir("vinosBlancos");
    break;

  case "vinosEspumantes":
    document.getElementById("time").innerHTML = "Vinos Espumantes";
    imprimir("vinosEspumantes");
    break;

  case "contacto":
    document.getElementById("time").innerHTML = "Contacto";
    imprimir("contacto");
    break;

  default:
    document.getElementById("time").innerHTML = "Vinos";
    imprimir("home");
}

//carrusel

var botonLeft = document.getElementById("left");

var botonRight = document.getElementById("right");

//función que dinamisa botón left y right

botonLeft.addEventListener("click", function (e) {
  console.log("Boton izquierdo");
  botones();
});

botonRight.addEventListener("click", function (e) {
  console.log("Boton derecho");
  botones();
});

function botones() {
  if (time[1] == "vinosTintos") {
 
    botonLeft.href = "index.html?time=vinos";
    botonRight.href = "index.html?time=vinosRosados";
  } else if (time[1] == "vinosRosados") {


    botonLeft.href = "index.html?time=vinosTintos";
    botonRight.href = "index.html?time=vinosBlancos";
  } else if (time[1] == "vinosBlancos") {


    botonLeft.href = "index.html?time=vinosRosados";
    botonRight.href = "index.html?time=vinosEspumantes";
  } else if (time[1] == "vinosEspumantes") {

    botonLeft.href = "index.html?time=vinosBlancos";
    botonRight.href = "index.html?time=contacto";
  } else if (time[1] == "contacto") {

    botonLeft.href = "index.html?time=vinosEspumantes";
    botonRight.href = "index.html?time=vinos";
  } else {

    botonLeft.href = "index.html?time=contacto";
    botonRight.href = "index.html?time=vinosTintos";
  }
}

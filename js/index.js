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

var botonNav = document.getElementsByClassName("boton");

for (var i = 0; i < botonNav.length; i++) {
  const element = botonNav[i];
  element.addEventListener("click", function (e) {
    imprimir(e.target.id);
  });
}

function imprimir(id) {
  switch (id) {
    case "vinosTintos":
      console.log("Estos son los vinos tintos");
      display(vinosTintos);
      document.getElementById("tituloPrincipal").innerHTML = "Vinos tintos";
      break;

    case "vinosRosados":
      console.log("Estos son los vinos rosados");
      display(vinosRosados);
      document.getElementById("tituloPrincipal").innerHTML = "Vinos Rosados";
      break;

    case "vinosBlancos":
      console.log("Estos son los vinos blancos");
      display(vinosBlancos);
      document.getElementById("tituloPrincipal").innerHTML = "Vinos Blancos";
      break;

    case "vinosEspumantes":
      console.log("Estos son los vinos espumantes");
      display(vinosEspumantes);
      document.getElementById("tituloPrincipal").innerHTML = "Vinos Espumantes";
      break;

    default:
      console.log("Estos son todos los vinos");
      display(vinos);
      document.getElementById("tituloPrincipal").innerHTML = "Vinos";
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
        <p>${array[i].description}</p>
        <div class="row item">
          <p class="col-6">$ ${array[i].price}</p>
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

switch (time[1]){
  case "vinosTintos":
    imprimir("vinosTintos");
    break;

  case "vinosRosados":
    imprimir("vinosRosados");
    break;

    case "vinosBlancos":
      imprimir("vinosBlancos");
      break;

    case "vinosEspumantes":
      imprimir("vinosEspumantes");
      break;

  default:
    imprimir("home");
}

//carrusel

var botonLeft = document.getElementById("left");

var botonRight = document.getElementById("right");

//función que dinamisa botón left y right

botonLeft.addEventListener("click", function(e){
  botones();
})

botonRight.addEventListener("click", function(e){
  botones();
})

function botones(){
  if(time[1] == "vinosTintos"){
    botonLeft.href = "index.html?time=vinosEspumantes";
    botonRight.href = "index.html?time=vinosRosados"
  }
  else if(time[1] == "vinosRosados"){
    botonLeft.href = "index.html?time=vinosTintos";
    botonRight.href = "index.html?time=vinosBlancos"
  }
  else if(time[1] == "vinosBlancos"){
    botonLeft.href = "index.html?time=vinosRosados";
    botonRight.href = "index.html?time=vinosEspumantes"
  }
  else if(time[1] == "vinosEspumantes"){
    botonLeft.href = "index.html?time=vinosBlancos";
    botonRight.href = "index.html?time=vinosTintos"
  }

}
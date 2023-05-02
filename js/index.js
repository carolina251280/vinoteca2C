var vinos = vinoteca.vinos;
var vinosTintos = [];
var vinosRosados = [];
var vinosBlancos = [];
var vinosEspumantes = [];
var arrayAFiltrar = [];
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
  textoBoton.push(botonNav[i].innerText)
  element.addEventListener("click", function (e) {
    document.getElementById("name").innerHTML = e.target.innerText
    imprimir(e.target.id)
  });
}
console.log(textoBoton);

function imprimir(id) {
  const elem = document.getElementsByClassName('active')[0]
    const activoNuevo = document.getElementById(id)
    elem.classList.remove('active')
    activoNuevo.classList.add('active')

  switch (id) {
    case "vinosTintos":
      // botonNav[0].classList.remove("active");
      // botonNav[1].classList.add("active");
      // botonNav[2].classList.remove("active");
      // botonNav[3].classList.remove("active");
      // botonNav[4].classList.remove("active");
      // botonNav[5].classList.remove("active");
      console.log("Estos son los vinos tintos");
     //document.getElementById("time").innerHTML = "Vinos Tintos";
     arrayAFiltrar = vinosTintos;
      display(vinosTintos);
      break;

    case "vinosRosados":
      // botonNav[0].classList.remove("active");
      // botonNav[1].classList.remove("active");
      // botonNav[2].classList.add("active");
      // botonNav[3].classList.remove("active");
      // botonNav[4].classList.remove("active");
      // botonNav[5].classList.remove("active");
      console.log("Estos son los vinos rosados");
     // document.getElementById("time").innerHTML = "Vinos Rosados";
     arrayAFiltrar = vinosRosados;
      display(vinosRosados);
      break;

    case "vinosBlancos":
      // botonNav[0].classList.remove("active");
      // botonNav[1].classList.remove("active");
      // botonNav[2].classList.remove("active");
      // botonNav[3].classList.add("active");
      // botonNav[4].classList.remove("active");
      // botonNav[5].classList.remove("active");
      console.log("Estos son los vinos blancos");
     // document.getElementById("time").innerHTML = "Vinos Blancos";
     arrayAFiltrar = vinosBlancos;
      display(vinosBlancos);
      break;

    case "vinosEspumantes":
      // botonNav[0].classList.remove("active");
      // botonNav[1].classList.remove("active");
      // botonNav[2].classList.remove("active");
      // botonNav[3].classList.remove("active");
      // botonNav[4].classList.add("active");
      // botonNav[5].classList.remove("active");
      console.log("Estos son los vinos espumantes");
     // document.getElementById("time").innerHTML = "Vinos Espumantes";
     arrayAFiltrar = vinosEspumantes;
      display(vinosEspumantes);
      break;

    case "contacto":
      // botonNav[0].classList.remove("active");
      // botonNav[1].classList.remove("active");
      // botonNav[2].classList.remove("active");
      // botonNav[3].classList.remove("active");
      // botonNav[4].classList.remove("active");
      // botonNav[5].classList.add("active");
      console.log("Estamos en contacto");
     // document.getElementById("time").innerHTML = "Contacto";
      display(contacto);
      break;

    default:
      // botonNav[0].classList.add("active");
      // botonNav[1].classList.remove("active");
      // botonNav[2].classList.remove("active");
      // botonNav[3].classList.remove("active");
      // botonNav[4].classList.remove("active");
      // botonNav[5].classList.remove("active");
      console.log("Estos son todos los vinos");
     // document.getElementById("time").innerHTML = "Vinos";
     arrayAFiltrar = vinos;
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
//console.log(time[1]);

switch (time[1]) {
  case "vinosTintos":
    document.getElementById("name").innerHTML = "Vinos Tintos";
    imprimir("vinosTintos");
    break;

  case "vinosRosados":
    document.getElementById("name").innerHTML = "Vinos Rosados";
    imprimir("vinosRosados");
    break;

  case "vinosBlancos":
    document.getElementById("name").innerHTML = "Vinos Blancos";
    imprimir("vinosBlancos");
    break;

  case "vinosEspumantes":
    document.getElementById("name").innerHTML = "Vinos Espumantes";
    imprimir("vinosEspumantes");
    break;

  case "contacto":
    document.getElementById("name").innerHTML = "Contacto";
    imprimir("contacto");
    break;

  default:
    
    imprimir("vinos");
}
imprimir("vinos")

//carrusel



//función que dinamisa botón left y right

var botonLeft = document.getElementById("left");

botonLeft.addEventListener("click", function (e) {
  var page1 = document.getElementById("name").innerText

  if(textoBoton.indexOf(page1) > 0){
    changePage(textoBoton.indexOf(page1) - 1);
  }else{
    changePage(5)
  }
  
});
var botonRight = document.getElementById("right");


botonRight.addEventListener("click", function (e) {
  var page = document.getElementById("name").innerText

  if(textoBoton.indexOf(page) < 5 ){
    changePage(textoBoton.indexOf(page) + 1);
  }else{
    changePage(0)
  }
 
  console.log("Boton derecho");
 // botones();
});


function changePage(i){
  
  switch(i){
    case 0: display(vinos);
      document.getElementById("name").innerHTML = textoBoton[i];
      botonNav[0].classList.add("active");
      botonNav[1].classList.remove("active");
      botonNav[2].classList.remove("active");
      botonNav[3].classList.remove("active");
      botonNav[4].classList.remove("active");
      botonNav[5].classList.remove("active");

    break;

    case 1: display(vinosTintos);
      document.getElementById("name").innerHTML = textoBoton[i];
          botonNav[0].classList.remove("active");
          botonNav[1].classList.add("active");
          botonNav[2].classList.remove("active");
          botonNav[3].classList.remove("active");
          botonNav[4].classList.remove("active");
          botonNav[5].classList.remove("active");
    break;

    case 2: display(vinosRosados);
    document.getElementById("name").innerHTML = textoBoton[i];
          botonNav[0].classList.remove("active");
          botonNav[1].classList.remove("active");
          botonNav[2].classList.add("active");
          botonNav[3].classList.remove("active");
          botonNav[4].classList.remove("active");
          botonNav[5].classList.remove("active");
    break;

    case 3: display(vinosBlancos);
    document.getElementById("name").innerHTML = textoBoton[i];
          botonNav[0].classList.remove("active");
          botonNav[1].classList.remove("active");
          botonNav[2].classList.remove("active");
          botonNav[3].classList.add("active");
          botonNav[4].classList.remove("active");
          botonNav[5].classList.remove("active");
    break;

    case 4: display(vinosEspumantes);
    document.getElementById("name").innerHTML = textoBoton[i];
          botonNav[0].classList.remove("active");
          botonNav[1].classList.remove("active");
          botonNav[2].classList.remove("active");
          botonNav[3].classList.remove("active");
          botonNav[4].classList.add("active");
          botonNav[5].classList.remove("active");
    break;

    case 5: display(contacto);
    document.getElementById("name").innerHTML = textoBoton[i];
          botonNav[0].classList.remove("active");
          botonNav[1].classList.remove("active");
          botonNav[2].classList.remove("active");
          botonNav[3].classList.remove("active");
          botonNav[4].classList.remove("active");
          botonNav[5].classList.add("active");
    break;
  }
}

// function contacto(){
//   document.getElementById("contacto").innerHTML = `

//   <h1>Aquí va el formulario</h1>
//   `
// }

// function botones() {
//   if (time[1] == "vinosTintos") {
 
//     botonLeft.href = "index.html?time=vinos";
//     botonRight.href = "index.html?time=vinosRosados";
//   } else if (time[1] == "vinosRosados") {


//     botonLeft.href = "index.html?time=vinosTintos";
//     botonRight.href = "index.html?time=vinosBlancos";
//   } else if (time[1] == "vinosBlancos") {


//     botonLeft.href = "index.html?time=vinosRosados";
//     botonRight.href = "index.html?time=vinosEspumantes";
//   } else if (time[1] == "vinosEspumantes") {

//     botonLeft.href = "index.html?time=vinosBlancos";
//     botonRight.href = "index.html?time=contacto";
//   } else if (time[1] == "contacto") {

//     botonLeft.href = "index.html?time=vinosEspumantes";
//     botonRight.href = "index.html?time=vinos";
//   } else {

//     botonLeft.href = "index.html?time=contacto";
//     botonRight.href = "index.html?time=vinosTintos";
//   }
// }



//Input Search

var inputSearch = document.getElementById("inputSearch");

inputSearch.addEventListener("keyup",function (evento) {capturaEvento(evento)})

function capturaEvento(evento){
//Capturo lo que el usuario ingresa en el input

  var datoInput = evento.target.value;

  //A los capturado le quito espacios en blanco anteriores y posteriores con trim()
  //Además a lo ingresado lo paso a minusculsa con toLowerCase()
  var datoSinEspacio =  datoInput.trim().toLowerCase()

  //Aplico un filtro a todos lo eventos donde el nombre del evento incluya lo que ingreso el usuario
  //con los métodos trim y toLowerCase
  var filtrado = arrayAFiltrar.filter(vinos => vinos.name.toLowerCase().includes(datoSinEspacio))
  if(filtrado.length === 0){
    contenedor.innerHTML = `<h1 class="ceroResult">No se encontraron los vinos para tu búsqueda </h1>`
  }else{
    display(filtrado);
  }
 
  

}

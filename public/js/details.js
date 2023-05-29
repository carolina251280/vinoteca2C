let todosLosVinos = [];
const querySearch = document.location.search;
const id = new URLSearchParams(querySearch).get("id");
console.log(id);

let coleccionVinosRef = firebase.firestore().collection("Vinoteca");

coleccionVinosRef.get().then((results) => {
  const data = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Toda data en la colección 'vinos' ", data);
  // console.log(data)
  let vinosDetalles = data.filter((vino) => vino.id == id);

  // let sliderIndex = 1;
  // let timeout;
  // const layers = [...document.querySelectorAll(".layer")];
  // const covers = [...document.querySelectorAll(".photo-frame")];

  // function changeCoverAnimState(state = 0) {
  //   const st = state === 1 ? "running" : "paused";
  //   covers.forEach((cover) => {
  //     // cover.style['animation-play-state'] = st;
  //     cover.querySelector(".cover").style.width = `${state * 100}%`;
  //   });
  // }

  // function switchLayer(step = 1) {
  //   const nextSlide =
  //     (sliderIndex + step) % 3 === 0 ? 3 : (sliderIndex + step) % 3;

  //   changeCoverAnimState(1);
  //   clearTimeout(timeout);
  //   timeout = setTimeout(() => {
  //     changeCoverAnimState(0);
  //   }, 500);

  //   for (let i of layers) {
  //     i.classList.remove("layer-displayed");
  //     i.classList.remove("layer-displayed-exit");
  //     if (i.dataset.scene == nextSlide) {
  //       i.classList.add("layer-displayed");
  //     }
  //     if (i.dataset.scene == sliderIndex) {
  //       i.classList.add("layer-displayed-exit");
  //     }
  //   }
  //   sliderIndex = nextSlide;
  // }

  var texto = document.getElementById("idDetalle");

  texto.innerHTML = `
  <div class="contenedorDetalles row col-12">
  <div class="hero-left col-12 col-md-6 p-0">
  <div class="layers">
    <div class="layer layer-displayed" data-scene="1">
      <span>${vinosDetalles[0].name}</span>
      <div class="layer__image" style="background-image: url('${vinosDetalles[0].image}')"></div>
      <div class="layer__info">
        <div>
        <div class="detallesVinos"> </div>
          <div class="detallesVinos"> 
          <strong>Cepa:</strong>
          <p> ${vinosDetalles[0].cepa}</p>
          </div>
          <div class="detallesVinos">
          <strong>Crianza:</strong>
          <p> ${vinosDetalles[0].crianza}</p>
          </div class="detallesVinos">
          <div class="detallesVinos"> 
          <strong>Región: </strong>
          <p> ${vinosDetalles[0].region}</p>
          </div>
          <div class="detallesVinos"> 
          <strong>Graduación:</strong>
          <p>  ${vinosDetalles[0].graduacion}</p>
          </div>
          <div class="detallesVinos"> 
          <strong>Precio:</strong>
          <p> $ ${vinosDetalles[0].price}</p>
          </div>
                
        </div>

      </div>
    </div>

  </div>
</div>
<div class="hero-right col-12 col-md-6 p-0">
  <div class="layer layer-displayed" data-scene="1"></div>
  <div class="layer" data-scene="2"></div>
  <div class="layer" data-scene="3"></div>
  <div class="photo-frame" id="fotoUva">
    <div class="layer layer-displayed" style="background-image: url('${vinosDetalles[0].fotosUvas}')" data-scene="1"></div>
    <div class="cover"></div>
  </div>
  <div class="photo-name">
    <div class="photo-name__wrapper">
      <div class="layer layer-displayed" data-scene="1">
        <span class="photo-name__title">${vinosDetalles[0].description}</span>
      </div>
      
    </div>
  </div>
  <div class="photo-frame">
    <div class="layer layer-displayed" style="background-image: url('${vinosDetalles[0].experiencias}')" data-scene="1"></div>
    <div class="cover"></div>
  </div>
</div>
</div>


    `;
});

{
  /* <div class="imagen-detalle">
<img src="${vinosDetalles[0].image}" alt=${vinosDetalles[0].name}>
</div>
<div class="detalles">
<div>
<h2>${vinosDetalles[0].name}</h2>
<p class="precio">Precio: $ ${vinosDetalles[0].price}</p>
<h3>Descripción:</h3>
<p>${vinosDetalles[0].description} </p>
<h3>Detalles:</h3>
<ul>
  <li>Región: ${vinosDetalles[0].region}</li>
  <li>Añada: ${vinosDetalles[0].crianza}</li>
  <li>Cepa: ${vinosDetalles[0].cepa}</li>
  <li>Graduación alcohólica: ${vinosDetalles[0].graduacion}</li>
  <li>Tipo: ${vinosDetalles[0].category}</li>
</ul>
<p class="cantidad">Cantidad:</p>
<div class="contador">
  <button type="button" onclick="disminuir()"><i class="fa-solid fa-minus"></i></button>
  <input type="number" name="cantidad" id="cantidad" min="1" max="10" value="1">
  <button type="button" onclick="aumentar()"><i class="fa-solid fa-plus"></i></button>
  <button class="boton-carrito">Agregar al carrito</button>
</div>
</div>
</div> */
}

// var id = location.search.split("?id=").filter(Number);

// var selectId = id[0];

// const detallesEvento = [];

// for (var i = 0; i < vinos.length; i++) {
//   if (vinos[i].id == selectId) {
//     detallesEvento.push(vinos[i]);
//   }
// }

// var texto = document.getElementById("idDetalle");

//enlace a otra pagina

var navLink = document.getElementsByClassName("nav-link");

for (var i = 0; i < navLink.length; i++) {
  const elementos = navLink[i];

  elementos.addEventListener("click", function (e) {
    imprimir(e.target.id);

    document.getElementById("idDetalle").style.display = "none";
    document.getElementById("contenedor").style.display = "flex";
  });
}

//contadores

// function aumentar() {
//     var campoCantidad = document.getElementById("cantidad");
//     campoCantidad.stepUp(1);
// }

// function disminuir() {
//     var campoCantidad = document.getElementById("cantidad");
//     campoCantidad.stepDown(1);
// }

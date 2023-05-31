//let todosLosVinos = [];
const querySearch = document.location.search;
const id = new URLSearchParams(querySearch).get("id");

let coleccionVinosRef = firebase.firestore().collection("Vinoteca");

coleccionVinosRef.get().then((results) => {
  const data = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let vinosDetalles = data.filter((vino) => vino.id == id);



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

//enlace a otra pagina

var navLink = document.getElementsByClassName("nav-link");

for (var i = 0; i < navLink.length; i++) {
  const elementos = navLink[i];

  elementos.addEventListener("click", function (e) {
    imprimir(e.target.id);

    document.getElementById("idDetalle").style.display = "none";
    //document.getElementById("contenedor").style.display = "flex";
  });
}



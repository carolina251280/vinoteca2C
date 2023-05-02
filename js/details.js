var vinos = vinoteca.vinos;

var id = location.search.split("?id=").filter(Number);

var selectId = id[0];
console.log(selectId);

const detallesEvento = [];

for (var i = 0; i < vinos.length; i++) {
  if (vinos[i].id == selectId) {
    detallesEvento.push(vinos[i]);
  }
}

var texto = document.getElementById("idDetalle");

texto.innerHTML = `

  <div class="imagen-detalle">
		<img src="/img/${detallesEvento[0].image}" alt=${detallesEvento[0].name}>
	</div>
  <div class="detalles">
  <div>
  <h2>${detallesEvento[0].name}</h2>
  <p class="precio">Precio: $ ${detallesEvento[0].price}</p>
    <h3>Descripción:</h3>
    <p>${detallesEvento[0].descriptionExtensa} </p>
    <h3>Detalles:</h3>
    <ul>
      <li>Región: ${detallesEvento[0].region}</li>
      <li>Añada: ${detallesEvento[0].crianza}</li>
      <li>Cepa: ${detallesEvento[0].cepa}</li>
      <li>Graduación alcohólica: ${detallesEvento[0].graduacion}</li>
      <li>Tipo: ${detallesEvento[0].category}</li>
    </ul>
    <p class="cantidad">Cantidad:</p>
    <div class="contador">
      <button type="button" onclick="disminuir()"><i class="fa-solid fa-minus"></i></button>
      <input type="number" name="cantidad" id="cantidad" min="1" max="10" value="1">
      <button type="button" onclick="aumentar()"><i class="fa-solid fa-plus"></i></button>
      <button class="boton-carrito">Agregar al carrito</button>
    </div>
  </div>
</div> 

`;
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

contadores

function aumentar() {
    var campoCantidad = document.getElementById("cantidad");
    campoCantidad.stepUp(1);
}

function disminuir() {
    var campoCantidad = document.getElementById("cantidad");
    campoCantidad.stepDown(1);
}

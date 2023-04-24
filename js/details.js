console.log(location.search)
var id = location.search.split(Number)
console.log(id)
var selectId = id[0]
console.log(selectId)

const detallesEvento = [];
for(var i = 0; i < vinos.length ; i++){
    if(vinos[i].id == selectId){
        detallesEvento.push(vinos[i]);

    }
}

var texto = document.getElementById("idDetalle");
    texto.innerHTML = `
         
     <div class="imagen-detalle">
				<img src="../img/1.jpg" alt="Foto del Vino">
			</div>
            <div class="detalles">
            <div>
                    <h2>Nombre del Vino</h2>
                    <p class="precio">Precio: $XX</p>
                    <p class="cantidad">Cantidad:</p>
                    <div class="contador">
                        <button type="button" onclick="disminuir()"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" name="cantidad" id="cantidad" min="1" max="10" value="1">
                        <button type="button" onclick="aumentar()"><i class="fa-solid fa-plus"></i></button>
                        <button class="boton-carrito">Agregar al carrito</button>
                    </div>
                    
                </div>
                <div>
                    <h3>Descripción:</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo non ipsum tincidunt, vel lobortis magna iaculis. Proin lobortis hendrerit enim vel faucibus. Duis auctor massa vel ex sagittis congue. Vestibulum ut pharetra lacus. </p>
                    <h3>Detalles del Vino:</h3>
                    <ul>
                        <li>País de origen: </li>
                        <li>Añada: </li>
                        <li>Cepa: </li>
                        <li>Graduación alcohólica: </li>
                        <li>Tipo de vino: </li>
                    </ul>
                </div>
            </div> 
    
    `
//enlace a otra pagina

var navLink = document.getElementsByClassName("nav-link");

for(var i = 0; i < navLink.length ; i++){
    const elementos = navLink[i];
    elementos.addEventListener("click", function(e){
        imprimir(e.target.id)

        document.getElementById("idDetalle").style.display = "none";
        document.getElementById("contenedor").style.display = "flex";
    })
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





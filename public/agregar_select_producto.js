// JavaScript (script.js)
let contadorSelects = 0;

function agregarSelect() {
  contadorSelects++;

  const selectHTML = `
    <div id="select-${contadorSelects}">
      <h3>Producto ${contadorSelects}</h3>
      <select class="formulario__input" name="select_estado_venta" onchange="cambiarCantidad(${contadorSelects})">
        <option value="seleccione">Seleccionar producto</option>
        <option value="manilla1" data-precio="10">Manilla Bolitas</option>
        <option value="manilla2" data-precio="15">Manilla Artesanal</option>
        <option value="camiseta1" data-precio="20">Camiseta VidaKids</option>
        <option value="camiseta2" data-precio="25">Funavid Polo</option>
      </select>
      <input type="number" id="cantidad-${contadorSelects}" value="1" min="1" max="10" onchange="cambiarCantidad(${contadorSelects})">
      <button onclick="eliminarSelect(${contadorSelects})">Eliminar</button>
      <span id="subtotal-${contadorSelects}">$0</span>
    </div>
  `;

  const selectContainer = document.getElementById("selects-container");
  selectContainer.innerHTML += selectHTML;
}

function eliminarSelect(idSelect) {
  const selectContainer = document.getElementById("selects-container");
  const selectElement = document.getElementById(`select-${idSelect}`);

  selectContainer.removeChild(selectElement);

  calcularTotal();
}

function cambiarCantidad(idSelect) {
  const selectElement = document.getElementById(`select-${idSelect}`).querySelector("select");
  const cantidadElement = document.getElementById(`cantidad-${idSelect}`);
  const subtotalElement = document.getElementById(`subtotal-${idSelect}`);

  const cantidad = parseInt(cantidadElement.value);
  const precioUnitario = parseInt(selectElement.options[selectElement.selectedIndex].getAttribute("data-precio"));

  let subtotal = 0;
  if (selectElement.value !== "seleccione") {
    if (cantidad >= 1) {
      subtotal = cantidad * precioUnitario;
    } else {
      cantidadElement.value = 1;
      subtotal = precioUnitario;
    }
  } else {
    cantidadElement.value = 1;
  }

  subtotalElement.textContent = `$${subtotal}`;

  calcularTotal();
}

function calcularTotal() {
  const subtotalElements = document.querySelectorAll('[id^="subtotal-"]');
  let total = 0;

  subtotalElements.forEach((subtotalElement) => {
    total += parseInt(subtotalElement.innerHTML.replace("$", ""));
  });

  const totalElement = document.getElementById("total");
  totalElement.textContent = `${total === 0 ? '' : '$'}${total}`;
}

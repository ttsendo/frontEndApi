//const url = 'https://api-2670689.onrender.com/usuario'
const url = 'https://backendapi-sjqg.onrender.com/cliente'

const listarClientes = async () => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido')
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(function (data) {//Se manipulan los datos obtenidos de la url
            let listaClientes = data.msg //msg es el nombre de la lista retorna con json
            console.log(listaClientes)
            listaClientes.map(function (cliente) {
                //Configurar el objeto para enviarlo por url
                objetoCliente = Object.keys(cliente).map(key => key + '=' +
                    encodeURIComponent(cliente[key])).join('&');
                console.log(cliente)
                contenido = contenido + `<tr>` +
                    `<td style="display: none">` + cliente._id + `</td>` +
                    `<td>` + cliente.id + `</td>` +
                    `<td>` + cliente.nombre + `</td>` +
                    `<td>` + cliente.apellido + `</td>` +
                    `<td>` + cliente.email + `</td>` +
                    `<td>` + cliente.telefono + `</td>` +
                    `<td>` + cliente.password + `</td>` +
                    `<td>   <div>
                                <a href="detalle_clientes"><img src="../images/eye-svgrepo-com.svg" alt="icon"
                                    class="opc_eyes"></a>
                            </div> </td>`+
                    `<td><button style="border: none; background: none; " onclick="redireccionarEditar('${objetoCliente}')"><img src="../images/editar.png" alt="icon" class="opc_edit"></button></td>` +
                    `<td><button style="border: none; background: none;" onclick="deleteCliente('${cliente.id}')"><img src="../images/borrar.png" alt="icon"
                        class="opc_delete" onclick="mostrarAlerta()"></button></td>` +
                    `</tr>`
            })

            objectId.innerHTML = contenido
        })

    /*for(i = 1; i<10; i++){
        contenido = contenido + '<tr>'+
        '<td>nombre</td>'+
        '<td>rol</td>'+
        '<td>estado</td>'
    }
    */

}

const registrarCliente = () => {

    const id = generateUUID()
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
    const password = document.getElementById('password').value
    const confirmarPassword = document.getElementById('confirmarPassword').value


    // if(registro_envio.length == 0){
    //     alert(333)
    //     document.getElementById('registro_envioHelp').innerHTML = 'Dato requerido'
    //     return false;

    // }
    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
        alert(1)
    }
    else if (apellido.length == 0) {
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
        alert(2)
    }
    else if (email.length == 0) {
        document.getElementById('emailHelp').innerHTML = 'Dato requerido'
        alert(3)
    }
    else if (telefono.length == 0) {
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'
        alert(4)
    }
    else if (password.length == 0) {
        document.getElementById('passwordHelp').innerHTML = 'Dato requerido'
        alert(5)
    }
    else if (password != confirmarPassword) {
        alert('Las contraseñas no coinciden')
        alert(6)
    }

    // else if(rol == ""){
    //     document.getElementById('rolHelp').innerHTML = 'Dato requerido'
    // }
    // else if(estado == ""){
    //     document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    // }
    // else if(password != confirmarPassword){
    //     alert('Las contraseñas no coinciden')
    // }
    else {
        let cliente = {
            id: id,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            password: password,
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(cliente),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg)
                console.info(json); //Imprimir el mensaje de la transacción
            })
            document.location.href = 'lista_clientes'
    }
}



const actualizarCliente = () => {
    const _id = document.getElementById('_id').value;
    const id = document.getElementById('idd').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
    const password = document.getElementById('password').value
    const confirmarPassword = document.getElementById('confirmarPassword').value

    // if(registro_envio.length == 0){
    //     document.getElementById('registro_envioHelp').innerHTML = 'Dato requerido'

    // }
    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (apellido.length == 0) {
        document.getElementById('apellidoHelp').innerHTML = 'Dato requerido'
    }
    else if (email.length == 0) {
        document.getElementById('emailHelp').innerHTML = 'Dato requerido'
    }
    else if (telefono.length == 0) {
        document.getElementById('telefonoHelp').innerHTML = 'Dato requerido'
    }
    else if (password.length == 0) {
        document.getElementById('passwordHelp').innerHTML = 'Dato requerido'
    }
    if (password != confirmarPassword) {
        alert('Las contraseñas no coinciden')
    }
    // else if(rol == ""){
    //     document.getElementById('rolHelp').innerHTML = 'Dato requerido'
    // }
    // else if(estado == ""){
    //     document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    // }
    //  else if(password != confirmarPassword){
    //     alert('Las contraseñas no coinciden')
    // }
    else {
        let cliente = {

            // registro_envio: registro_envio,
            _id:_id,
            id:id,
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            password: password
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(cliente),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(JSON.stringify(json.msg)) //Imprimir el mensaje de la transacción
                window.location.href = 'lista_clientes?'
            })
    }
}

const redireccionarEditar = (objetoCliente) => {
    document.location.href = 'editar_clientes?' + objetoCliente
}

const editarCliente = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('_id').value = urlParams.get('_id')
    document.getElementById('idd').value = urlParams.get('id')
    document.getElementById('nombre').value = urlParams.get('nombre')
    document.getElementById('apellido').value = urlParams.get('apellido')
    document.getElementById('email').value = urlParams.get('email')
    document.getElementById('telefono').value = urlParams.get('telefono')
    document.getElementById('password').value = urlParams.get('password')
    document.getElementById('confirmarPassword').value = urlParams.get('condirmarPassword')

}

if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarCliente)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarCliente)
        
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function deleteCliente(id) {
    console.log(id);

    fetch('https://backendapi-sjqg.onrender.com/cliente?id=' + id, {
        method: 'DELETE',
        mode: 'cors',
        // body: JSON.stringify(id),//Convertir el objeto a JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(JSON.stringify(json.msg))
            window.location.href = 'lista_clientes?' //Imprimir el mensaje de la transacción
        })


}

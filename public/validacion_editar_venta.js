const formulario = document.getElementById('form_add_venta');
const inputs = document.querySelectorAll('#form_add_venta input');


const expresiones = {
    placa: /^[a-zA-Z]{3}\s\d{3}$/,
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    fecha: /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/,
    contraseñaFuerte: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    un_nombre: /^[A-Z\u00C0-\u00D6\u00D8-\u00DE][a-z\u00DF-\u00F6\u00F8-\u00FF ]*$/,    //valida que solo la primera letra se mayuscula y el resto min
    texto: /^[A-Z\u00C0-\u00D6\u00D8-\u00DE][a-zA-Z\u00C0-\u00D6\u00D8-\u00DE ]*$/,
    numero: /^\d+$/,
    money: /^[0-9]{1,3}(,[0-9]{3}){0,2}$/,



}


const campos = {
    nombre_cliente_venta: false,
    apellido_cliente_venta: false,
    fecha_venta: false,
    precio_total_venta: false,

}


const validarFormulario = (e) => {
    switch (e.target.name) {


        case "nombre_cliente_venta":
            validarCampo(expresiones.un_nombre, e.target, 'nombre_cliente_venta');
            break;
        case "apellido_cliente_venta":
            validarCampo(expresiones.un_nombre, e.target, 'apellido_cliente_venta');
            break;
        case "fecha_venta":
            validarCampo(expresiones.fecha, e.target, 'fecha_venta');
            break;


    }


}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}


const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('pass2');
    const inputPassword2 = document.getElementById('pass2');


    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if ( campos.select_estado_venta.value !== "seleccione") {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha guardado el registro",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

const boton_volver = document.getElementById('boton_volver')
const volver_index = () => {
    Swal.fire({
        title: "Quieres salir del formulario?",
        showDenyButton: true,
        confirmButtonText: "Seguir",
        denyButtonText: `Volver`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Seguiras en el fomrulario", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Redireccionando...", "", "info");
            location.href = 'lista_ventas'
        }
    });
}
boton_volver.addEventListener('click', e => {
    e.preventDefault()

    volver_index()
})




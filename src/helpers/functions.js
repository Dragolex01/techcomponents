//ORDENACIÓN LISTA

export function sortBy(list, key, isReverse) {
    const sortedList = list.slice().sort((item1, item2) => {

        if (typeof (item1[key]) === "number") {
            return (item1[key] || 0) - (item2[key] || 0)
        }

        if (item1[key].toLowerCase() < item2[key].toLowerCase()) {
            return -1;
        } else if (item1[key].toLowerCase() > item2[key].toLowerCase()) {
            return +1;
        } else {
            return 0;
        }
    })

    return isReverse ? sortedList.reverse() : sortedList
}

//BUSCADOR

export function removeDiacritics(texto) { //Eliminar diacriticos excepto la Ñ
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

//VALIDACION FORMULARIOS

export const regularExpressionsForm = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

export function validarFormulario(input_name, input_value) {
    console.log(regularExpressionsForm.input_name) //NO FUNCIONA
    validarCampo(regularExpressionsForm.input_name, input_value, input_name);
}

export function validarCampo(expresion, value, name) {
    console.log(expresion)
    if (expresion.test(value)) {
        document.getElementById(`grupo__${name}`).classList.remove('validacion-incorrecto');
        document.getElementById(`grupo__${name}`).classList.add('validacion-correcto');
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.remove('icon_validacion-incorrecto'); //Simbolo cruz rojo
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.add('icon_validacion-correcto'); //Simbolo tick verde
        // document.querySelector(`#grupo__${name} .icon_validacion`).setAttribute("data-icon", "faCheckCircle");
        document.querySelector(`#grupo__${name} .infoError`).classList.remove('infoError-activo');
    } else {
        document.getElementById(`grupo__${name}`).classList.remove('validacion-correcto');
        document.getElementById(`grupo__${name}`).classList.add('validacion-incorrecto');
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.remove('icon_validacion-correcto'); //Simbolo tick verde
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.add('icon_validacion-incorrecto'); //Simbolo cruz rojo
        // document.querySelector(`#grupo__${name} .icon_validacion`).setAttribute("data-icon", "faTimesCircle");
        document.querySelector(`#grupo__${name} .infoError`).classList.add('infoError-activo');
    }
}

export function validateEmpty(valor) {
    if (valor.current.value.length === 0) {
        return valor.current.style.border = "2px solid red";
    } else {
        //return valor.current.className = {prueba}; //¿?
        return false;
    }
}

//ELIMINAR ELEMENTO DE ARRAY

export function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);

    return arr;
}

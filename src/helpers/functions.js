// Ordenación lista

export function sortBy(list, key, isReverse = false) {
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

// Buscador

export function removeDiacritics(texto) { //Eliminar diacriticos excepto la Ñ
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

// Validación formularios

export const regularExpressionsForm = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/,
    postal_code: /^[a-zA-Z\d\s\-\,\#\.\+]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

export function validateInput(expresion, input, name) {
    if (expresion.test(input)) {
        changeColorsInput(name, true)
    } else {
        changeColorsInput(name, false)
    }
}

export function validateEmpty(input, name) {
    if (input.length === 0) {
        changeColorsInput(name, false)
    } else {
        changeColorsInput(name, true)
    }
}

function changeColorsInput(name, isCorrect){
    if(isCorrect){
        document.getElementById(`grupo__${name}`).classList.remove('validacion-incorrecto');
        document.getElementById(`grupo__${name}`).classList.add('validacion-correcto');
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.remove('icon_validacion-incorrecto'); //Simbolo cruz rojo
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.add('icon_validacion-correcto'); //Simbolo tick verde
        document.querySelector(`#grupo__${name} .infoError`).classList.remove('infoError-activo');
        // document.querySelector(`#grupo__${name} .icon_validacion`).setAttribute("data-icon", "faCheckCircle");
    }else{
        document.getElementById(`grupo__${name}`).classList.remove('validacion-correcto');
        document.getElementById(`grupo__${name}`).classList.add('validacion-incorrecto');
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.remove('icon_validacion-correcto'); //Simbolo tick verde
        document.querySelector(`#grupo__${name} .icon_validacion`).classList.add('icon_validacion-incorrecto'); //Simbolo cruz rojo
        document.querySelector(`#grupo__${name} .infoError`).classList.add('infoError-activo');
        // document.querySelector(`#grupo__${name} .icon_validacion`).setAttribute("data-icon", "faTimesCircle");
    }
}

//ELIMINAR ELEMENTO DE ARRAY

export function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);

    return arr;
}

// Primera letra mayúscula

export function firstLetterUppercase(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
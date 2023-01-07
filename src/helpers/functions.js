/* eslint-disable no-useless-escape */

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

// Eliminar diacriticos excepto la Ñ (Buscador)

export function removeDiacritics(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

// Validación formularios

export const regularExpressionsForm = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,20}$/,
    email: /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/,
    postal_code: /^[a-zA-Z\d\s\-\,\#\.\+]+$/,
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
        document.querySelector(`#grupo__${name} .infoError`).classList.remove('infoError-activo');
    }else{
        document.getElementById(`grupo__${name}`).classList.remove('validacion-correcto');
        document.getElementById(`grupo__${name}`).classList.add('validacion-incorrecto');
        document.querySelector(`#grupo__${name} .infoError`).classList.add('infoError-activo');
    }
}

export function firstLetterUppercase(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
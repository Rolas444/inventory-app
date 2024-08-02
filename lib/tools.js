export function updateDataForm(objetoBase, objetoValores,idName) {

    let resultado = {};
    resultado[idName] = objetoValores[idName];
    for (let clave in objetoBase) {
        if (objetoBase.hasOwnProperty(clave)) {
            resultado[clave] = objetoValores.hasOwnProperty(clave) ? objetoValores[clave] : objetoBase[clave];
        }
    }
    return resultado;
}


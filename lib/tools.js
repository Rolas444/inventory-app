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

export const convertStringToImage =(base64String)=>{
    const splitString = base64String.split(',');
    const contentType = splitString[0].split(':')[1].split(';')[0];
    const base64 = splitString[1];

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    return blob;
}


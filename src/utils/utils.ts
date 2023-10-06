export function convertToFloatWithTwoDecimals(number: number) {
    const numeroRedondeado = number.toFixed(2);

    // Si deseas que la salida siempre tenga dos decimales, incluso si son ceros, puedes usar parseFloat
    // para quitar los ceros innecesarios después del punto decimal.
    const numeroFinal = parseFloat(numeroRedondeado).toString();
  
    return numeroFinal;
}

export function stringToArray(string: string | undefined | null) {
    //If is not string return []
    if (!string) return [];
    const array = string.split(",");
    return array;
}
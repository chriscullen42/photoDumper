// Convert a decimal value to a hex representitive padded to 2 by default or padding
function decimalToHex(d, padding, fmt) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }
    if (fmt) {
        switch (fmt) {
            case 1:
                hex = hex.toUpperCase()
                break;
            case 2:
                hex = "$" + hex.toUpperCase()
                break;
            case 3:
                hex = hex.toUpperCase() + "hex"
                break;
            default:
                hex = "0x" + hex.toUpperCase()
                break;
        }
    }

    return hex;
}

module.exports = decimalToHex
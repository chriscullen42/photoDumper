// Dumps a given image to a csv file, writting 1 hex value for each pixel on a line
const d2h = require("./decimalToHex")
const fs = require("fs-extra")
const Jimp = require('jimp')

async function writeToFile(target, contents, append) {
    if (append) {
        await fs.appendFile(target, contents)
    } else {
        await fs.writeFile(target, contents)
    }
}

function breath() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 100)
    })
}

async function dumpImage(image, imageFile, targetFile, columns, format) {
    columns = columns || 1
    format = format || 0
    let toWrite = `Image file: ${imageFile}\nImage Width: ${image.bitmap.width}\n`
    toWrite += `Image Height: ${image.bitmap.height}\n`
    toWrite += `Target File: ${targetFile}\nColumns: ${columns}\n`
    toWrite += `Using Format: ${format}`
    let written = false

    // nested for loops keep things async
    for (let x = 0; x < image.bitmap.height; x++ ) {
        for (let y = 0;y < image.bitmap.width ; y++ ) {
            let colour = image.getPixelColor(x, y)
            let rgb = Jimp.intToRGBA(colour)
            switch (format*1) {
                case 0:
                    toWrite += `\nPosition X:${d2h(x, 6)}, Y:${d2h(y, 6)} `
                    toWrite += `R:${d2h(rgb.r, 2)} G:${d2h(rgb.g, 2)} B:${d2h(rgb.b, 2)}`
                    break;
                case 1:
                    toWrite += `\n${colour}`
                    break;
                case 2:
                    toWrite += `\n${d2h(x, 6)}:${d2h(y, 6)}: ${colour}`
                    break;
                    case 3:
                    toWrite += `\n${d2h(x, 6)}:${d2h(y, 6)}: ${d2h(colour,8,1)}`
                    break;
                case 4:
                    toWrite += `\n${d2h(x, 6)}:${d2h(y, 6)}: ${d2h(rgb.r, 2)},${d2h(rgb.g, 2)},${d2h(rgb.b, 2)}`
                    break;
                case 5:
                    toWrite += `\n${d2h(rgb.r, 2)},${d2h(rgb.g, 2)},${d2h(rgb.b, 2)}`
                    break;
                    case 6:
                    toWrite += `\n${d2h(rgb.r, 2,1)}${d2h(rgb.g, 2,1)}${d2h(rgb.b, 2,1)}`
                    break;
                default:
                    toWrite += "Invalid format selected"
                    break;
            }
        }
        await breath()
        await writeToFile(targetFile, toWrite, written)
        toWrite = ""
        written = true
    }
    await writeToFile(targetFile, toWrite, written)
    return
}

module.exports = dumpImage

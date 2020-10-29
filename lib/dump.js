// Dumps a given image to a csv file, writting 1 hex value for each pixel on a line
const d2h = require("./decimalToHex")
const fs = require("fs-extra")
async function writeToFile(target, contents, append) {
    if (append) {
        await fs.appendFile(target, contents)
    } else {
        await fs.writeFile(target, contents)
    }
}
async function dumpImage(image, imageFile, targetFile, columns, format) {
    columns = columns || 1
    format = format || 0
    let toWrite = `Image file: ${imageFile}\nImage Width: $(image.bitmap.width)\n`
    toWrite += `Image Height: ${image.bitmap.height}\n`
    toWrite += `Target File: ${targetFile}\nColumns: ${columns}\n`
    toWrite += `Using Format: ${format}`
    let written = false
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        let red = this.bitmap.data[idx + 0];
        let green = this.bitmap.data[idx + 1];
        let blue = this.bitmap.data[idx + 2];
        let alpha = this.bitmap.data[idx + 3];
        let toWrite = `Position X:${d2h(this.x, 6)}, Y:${d2h(this.x, 6)}`
        // rgba values run from 0 - 255
        // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
        switch (format) {
            case 0:
                toWrite += `R:${d2h(red, 2)} G:${d2h(green, 2)} B:${d2h(blue, 2)}`
                break;

            default:
                break;
        }
        if (toWrite.length > MAX_BUFFER) {
            await writeToFile(targetFile, toWrite, written)
            toWrite = ""
            written = true
        }
    });
    await writeToFile(targetFile, toWrite, true)
}

exports.dumpImage = dumpImage

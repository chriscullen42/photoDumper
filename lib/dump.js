// Dumps a given image to a csv file, writting 1 hex value for each pixel on a line
const d2h = require("./decimalToHex")
const fs = require("fs-extra")
const Jimp = require('jimp')
const _progress = require('cli-progress');
const { getPixelColor } = require("jimp");
const b1 = new _progress.Bar();

async function writeToFile(target, contents, append) {
    if (append) {
        await fs.appendFile(target, contents)
    } else {
        await fs.writeFile(target, contents)
    }
}

function breath(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            b1.update(value)
            resolve(true)
        }, 100)
    })
}

async function dumpImage(image, imageFile, targetFile, columns, format, unique, showCount) {
    let totalPixels = image.bitmap.width * image.bitmap.height
    let pixel
    let lastPixel
    let count=0
    unique = unique || false // Yes, I know but I like a definate logical false
    showCount = showCount || false
    columns = columns || 1
    format = format || 0
    let toWrite = `Image file: ${imageFile}\nImage Width: ${image.bitmap.width} `
    toWrite += `Image Height: ${image.bitmap.height} `
    toWrite += `Total Pixels: ${totalPixels}\n`
    toWrite += `Target File: ${targetFile}\nColumns: ${columns}\n`
    toWrite += `Using Format: ${format}`
    let written = false

    // Create progress bar

    b1.start(image.bitmap.height, 0);

    // nested for loops keep things async
    for (let x = 0; x < image.bitmap.height; x++) {
        for (let y = 0; y < image.bitmap.width; y++) {
            let colour = image.getPixelColor(x, y)
            let rgb = Jimp.intToRGBA(colour)
            switch (format * 1) {
                case 0:
                    pixel = `\nPosition X:${d2h(x, 6)}, Y:${d2h(y, 6)} `
                    pixel += `R:${d2h(rgb.r, 2)} G:${d2h(rgb.g, 2)} B:${d2h(rgb.b, 2)}`
                    break;
                case 1:
                    pixel = `\n${colour}`
                    break;
                case 2:
                    pixel = `\n${d2h(x, 6)}:${d2h(y, 6)}: ${colour}`
                    break;
                case 3:
                    pixel = `\n${d2h(x, 6)}:${d2h(y, 6)}: ${d2h(colour, 8, 1)}`
                    break;
                case 4:
                    pixel = `\n${d2h(x, 6)}:${d2h(y, 6)}: ${d2h(rgb.r, 2)},${d2h(rgb.g, 2)},${d2h(rgb.b, 2)}`
                    break;
                case 5:
                    pixel = `\n${d2h(rgb.r, 2)},${d2h(rgb.g, 2)},${d2h(rgb.b, 2)}`
                    break;
                case 6:
                    pixel = `\n${d2h(rgb.r, 2, 1)}${d2h(rgb.g, 2, 1)}${d2h(rgb.b, 2, 1)}`
                    break;
                case 7:
                    pixel = `\nR=${d2h(rgb.r, 2, 1)} G=${d2h(rgb.g, 2, 1)} B=${d2h(rgb.b, 2, 1)}`
                    break;
                default:
                    pixel = "Invalid format selected"
                    break;
            }
            if (pixel == lastPixel && unique) {
                pixel = ""
                count++
            } else {
                lastPixel = pixel
                if(count >0 && showCount)  toWrite += ` (${count+1})`
                count=0
            }
            toWrite += pixel 
        }
        await breath(x)
        await writeToFile(targetFile, toWrite, written)
        toWrite = ""
        written = true
    }
    await writeToFile(targetFile, toWrite, written)
    b1.update(image.bitmap.height);
    b1.stop()
    return
}

module.exports = dumpImage

// Load an image and optiomnally resize it
// resize should be falsy or {width, height} object
const Jimp = require('jimp')

async function loadImage(imageFile, resize) {
    let image 
    try {
        image = await Jimp.read(imageFile)
        if(resize && (resize.width || resize.height)) {
            // resize the image
            resize.height = resize.height || Jimp.AUTO 
            resize.width = resize.width || Jimp.AUTO
            image.resize(resize.width, resize.height)
        }
    } catch (error) {
        image = error
    }
    return image
}

exports.loadImage = loadImage

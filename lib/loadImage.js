// Load an image and optiomnally resize it
// resize should be falsy or {width, height} object
const Jimp = require('jimp')
const config = require('config')
const path = require('path')

async function loadImage(imageFile, resize) {
    let image 
    let targetFile = path.join(path.dirname(imageFile), path.basename(imageFile, path.extname(imageFile)) + '_processed.png')

    try {
        image = await Jimp.read(imageFile)
        if(resize && (resize.width || resize.height)) {
            // resize the image
            resize.height = resize.height || Jimp.AUTO 
            resize.width = resize.width || Jimp.AUTO
            image.resize(resize.width, resize.height)
        }

        // Check the image does not break the size limits
        if(config.has("images.maxHeight") || config.has("images.maxWidth")) {
            if(image.bitmap.width > config.get("images.maxWidth")) {
                image.resize(config.get("images.maxWidth"), Jimp.AUTO)
            }
         
            if(image.bitmap.height > config.get("images.maxHeight")) {
                image.resize( Jimp.AUTO, config.get("images.maxHeight"))
            }
            // write out the actual file processed
            image.write(targetFile)
        }
    } catch (error) {
        image = error
    }
    return image
}

module.exports = loadImage

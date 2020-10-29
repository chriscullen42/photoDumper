#!/usr/bin/env node
// main entry point

const { Command } = require('commander')
const program = new Command()
const path = require("path")
program.version('0.0.1')

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza')


// test - load a image and call dump

async function doIt(imageFile) {
  const loadImage = require("./lib/loadImage")
  const dumpImage = require("./lib/dump")
  let image = await loadImage(imageFile)
  if (image instanceof Error) {
    console.log("Could not load/resize image file\n%s", image.message)
    process.exit(1)
  }
  // process the file
  let targetFile = path.join(path.dirname(imageFile), path.basename(imageFile, path.extname(imageFile)) + '.txt')
  await dumpImage(image, imageFile, targetFile, 1, 0)
}

doIt(path.resolve("./sampleImage/sample1_6pc.png"))
  .then(() => {
    console.log(done)
  })

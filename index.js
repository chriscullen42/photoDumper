#!/usr/bin/env node
// main entry point

const { Command } = require('commander')
const program = new Command()
const path = require("path")
program.version('0.0.1')

program
  .command('dump <source>')
  .description('Create a hex dump of the image file')
  .option('-f, --format <fmt>', 'output format')
  .option('-x, --width <width>', 'set the width')
  .option('-y, --height <height>', 'set the height')
  .option('-u, --unique', 'Remove duplicated pixel values')
  .option('-c, --count', 'If unique, show count of remove pixels')
  .action((source, cmdObj) => {
    console.log("Running the dump command")
    doIt(source, cmdObj)
      .then(() => {
        console.log("done")
      })
  });

async function doIt(imageFile, cmdObj) {
  const loadImage = require("./lib/loadImage")
  const dumpImage = require("./lib/dump")
  let resize = {}
  if (cmdObj.width || cmdObj.height) {
    if (cmdObj.width) resize.width = cmdObj.width * 1
    if (cmdObj.height) resize.height = cmdObj.height * 1
  }
  let image = await loadImage(imageFile, resize)
  if (image instanceof Error) {
    console.log("Could not load/resize image file\n%s", image.message)
    process.exit(1)
  }
  // process the file
  let targetFile = path.join(path.dirname(imageFile), path.basename(imageFile, path.extname(imageFile)) + '.txt')
  console.log(`Processing ${imageFile}\nInto ${targetFile}`)
  await dumpImage(image, imageFile, targetFile, 1, cmdObj.format, cmdObj.unique, cmdObj.count)
}

console.log("*******************")
console.log("IMAGE HEX DUMP UTILITY")
console.log("*******************")
program.parse(process.argv)



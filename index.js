#!/usr/bin/env node
// main entry point

const { Command } = require('commander')
const program = new Command()
const path = require("path")
program.version('0.0.1')

program
  .command('dump <source>')
  .description('Create a hex dump of the image file')
  .option('-f, --format', 'output format')
  .option('-x, --resize-x <width>', 'set the width')
  .option('-y, --resize-y <height>', 'set the height')
  .action((source) => {
    doIt(source, cmdObj)
      .then(() => {
        console.log("done")
      })
  });

async function doIt(imageFile, cmdObj) {
  const loadImage = require("./lib/loadImage")
  const dumpImage = require("./lib/dump")
  let image = await loadImage(imageFile)
  if (image instanceof Error) {
    console.log("Could not load/resize image file\n%s", image.message)
    process.exit(1)
  }
  // process the file
  let targetFile = path.join(path.dirname(imageFile), path.basename(imageFile, path.extname(imageFile)) + '.txt')
  await dumpImage(image, imageFile, targetFile, 1, cmdObj.format)
}



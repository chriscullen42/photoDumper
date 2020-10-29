#!/usr/bin/env node
// main entry point

const { Command } = require('commander')
const program = new Command()
program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

  
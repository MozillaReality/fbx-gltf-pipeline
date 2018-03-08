#!/usr/bin/env node

const program = require("commander");
const convert = require("../src/index");
const fs = require("fs-extra");
const path = require("path");
const package = fs.readJSONSync(path.join(__dirname, "..", "package.json"));

program
  .version(package.version)
  .usage('<src> [options]')
  .option("-o, --out <out>", "The directory to output the file.")
  .option("-c, --components <components>", "The path to the components json file")
  .option("-u, --unlit", "Use KHR_materials-unlit.")
  .action((src, options) => {
    convert(src, program).then(() => {
      process.exit(0);
    }).catch((err) => {
      throw err;
    });
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
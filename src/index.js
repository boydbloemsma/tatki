#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

clear();

console.log(
  chalk.cyanBright(
    figlet.textSync('Tatki\n', { font: 'Bulbhead', horizontalLayout: 'full' }),
  ),
);

const existingRead = fs.existsSync('notes.md');

function buildRead() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the README?',
        default: path.basename(process.cwd()),
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildRead();
      } else {
        console.log('Goodbye');
      }
    });
}

if (existingRead) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'README.md already exists! Would you like to overwrite it?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildRead();
      } else {
        console.log('Goodbye');
      }
    });
} else {
  buildRead();
}

#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const inquirer = require('inquirer');

clear();

console.log(
  chalk.cyanBright(
    figlet.textSync('Tatki', { font: 'Bulbhead', horizontalLayout: 'full' }),
  ),
);

const existingRead = fs.existsSync('TODO.md');
const taskArray = [];
const subTaskArray = [];

const titleQs = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the TODO? (optional)',
  },
  {
    type: 'input',
    name: 'subtitle',
    message: 'Add a subtitle for the TODO (optional):',
  },
];

function title() {
  inquirer.prompt(titleQs).then((answers) => {
    console.log(answers);
    task();
  });
}

function task() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'task',
      message: 'Add a new task to the TODO:',
    },
  ]).then((answers) => {
    if (answers.task !== '') {
      if (answers.task.toLowerCase() === 'end') {
        console.log('goodbye');
      } else {
        taskArray.push(answers.task);
        subTask();
      }
    } else {
      task();
    }
  });
}

function subTask() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'subTask',
      message: 'Add a new subtask to the TODO:',
    },
  ]).then((answers) => {
    if (answers.subTask !== '') {
      if (answers.subTask.toLowerCase() === 'end') {
        console.log('goodbye');
      } else {
        subTaskArray.push(answers.subTask);
        subTask();
      }
    } else {
      task();
    }
  });
}

if (existingRead) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'TODO.md already exists! Would you like to overwrite it?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        title();
      } else {
        console.log('Goodbye');
      }
    });
} else {
  title();
}

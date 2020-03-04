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
    taskArray.push(answers.task);
    subTaskConfirm();
  });
}

function taskConfirm() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'taskConfirm',
      message: 'Want to add another task?',
      default: true,
    },
  ])
    .then((answers) => {
      if (answers.taskConfirm) {
        task();
      } else {
        console.log(taskArray, subTaskArray);
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
    subTaskArray.push(answers.subTask);
    subTaskConfirm();
  });
}

function subTaskConfirm() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'subTaskConfirm',
      message: 'Want to add a subtask?',
      default: true,
    },
  ])
    .then((answers) => {
      if (answers.subTaskConfirm) {
        subTask();
      } else {
        taskConfirm();
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

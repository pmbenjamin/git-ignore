#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const cwd = process.cwd()
const fullPath = path.join(cwd, '.gitignore')
const chalk = require('chalk')

const { choices, createGitignoreFile, capitalizeFirstLetter } = require('../lib/index')

const question = {
  type: 'list',
  message: 'Select Language',
  name: 'language',
  choices
}

if (process.argv.length === 3) {
  const lang = capitalizeFirstLetter(process.argv[2])
  createGitignoreFile(lang)
    .then((resp) => {
      fs.createWriteStream(fullPath).write(resp.data)
      console.log(chalk.green('Success!'))
      console.log(`${lang} gitignore file created: ${fullPath}`)
    })
    .catch((err) => {
      console.log(chalk.red('Uh Oh!'))
      console.log(err)
    })
} else {
  inquirer.prompt([question]).then((response) => {
    const lang = capitalizeFirstLetter(response.language)
    createGitignoreFile(lang)
      .then((resp) => {
        fs.createWriteStream(fullPath).write(resp.data)
        console.log(chalk.green('Success!'))
        console.log(`${lang} gitignore file created: ${fullPath}`)
      })
      .catch((err) => {
        console.log(chalk.red('Uh Oh!'))
        console.log(err)
      })
  })
}

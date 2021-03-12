const chalk = require('chalk')
const package = require('../../package.json');

module.exports = function() {
    console.log('')
    console.log(chalk.bold('Examples:'));
    console.log('')
    console.log(`   $ ${package.name} create <my-app>`)
    console.log('')
}
const chalk = require('chalk');
const package = require('../../package.json');

module.exports = function() {
    console.log('')
    console.log(chalk.bold('Examples:'));
    console.log('')
    console.log('   Add the current project as a template:')
    console.log((`   $ ${package.name} add <template-name> ./`))
    console.log('')
    console.log('   or:')
    console.log('')
    console.log('   Add GitHub remote address as template:')
    console.log((`   $ ${package.name} add <template-name> https://github.com/user/project`))
    console.log((`   $ ${package.name} add <template-name> https://github.com/user/project#branch`))
    console.log('')
}
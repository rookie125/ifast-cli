const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'confirm',
        name: CONFIG.INSTALL_DEP,
        message: 'Do you need to install dependencies'
    }]);
};
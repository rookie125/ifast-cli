const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function confirmRemove() {
    return inquirer.prompt([{
        type: 'confirm',
        name: CONFIG.CONFIRM_REMOVE,
        message: 'Are you sure you want to remove it'
    }]);
};
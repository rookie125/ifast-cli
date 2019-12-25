const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'confirm',
        name: CONFIG.USE_CSS_MODULE,
        message: 'Whether to enable the CSS Module'
    }]);
};
const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'confirm',
        name: CONFIG.USE_CSS_MODULE,
        message: '是否开发CSS Module'
    }]);
};
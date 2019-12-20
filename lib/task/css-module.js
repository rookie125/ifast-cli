const inquirer = require('inquirer');
const { USE_CSS_MODULE } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'confirm',
        name: USE_CSS_MODULE,
        message: '是否开发CSS Module'
    }]);
};
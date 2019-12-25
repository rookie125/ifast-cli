const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: CONFIG.CSS_PREPROCESSOR,
        message: 'Please choose a CSS preprocessor',
        choices: [
            {
                name: 'LESS',
                value: 'less'
            },
            {
                name: 'CSS',
                value: 'css'
            }
        ]
    }]);
};
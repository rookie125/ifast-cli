const inquirer = require('inquirer');
const { CONFIG, ES, REACT, VUE } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: CONFIG.FE_FRAME,
        message: 'Please choose the front frame',
        choices: [
            {
                name: 'React',
                value: REACT
            }, 
            {
                name: 'Vue',
                value: VUE
            },
            {
                name: 'ES2015+',
                value: ES
            }
        ]
    }]);
};
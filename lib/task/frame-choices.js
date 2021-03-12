const inquirer = require('inquirer');
const { CONFIG, ES, REACT, VUE, NASA } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: CONFIG.FE_FRAME,
        message: 'Please choose the front frame',
        choices: [
            {
                name: NASA,
                value: NASA
            }, 
            {
                name: REACT,
                value: REACT
            }, 
            {
                name: VUE,
                value: VUE
            },
            {
                name: ES,
                value: ES
            }
        ]
    }]);
};
const inquirer = require('inquirer');
const { CONFIG, ES, REACT, VUE } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: CONFIG.FE_FRAME,
        message: '请选择技术栈',
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
                name: 'es2015+',
                value: ES
            }
        ]
    }]);
};
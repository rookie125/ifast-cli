const inquirer = require('inquirer');
const { FE_FRAME } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: FE_FRAME,
        message: '请选择技术栈',
        choices: [
            {
                name: 'React',
                value: 'react'
            }, 
            {
                name: 'Vue',
                value: 'vue'
            }
        ]
    }]);
};
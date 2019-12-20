const inquirer = require('inquirer');
const { CSS_PREPROCESSOR } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'rawlist',
        name: CSS_PREPROCESSOR,
        message: '请选择CSS预处理器',
        choices: [
            {
                name: 'LESS 预处理器',
                value: 'less'
            }, 
            {
                name: 'SASS 预处理器',
                value: 'sass'
            },
            {
                name: '不使用 CSS 预处理器',
                value: 'css'
            }
        ]
    }]);
};
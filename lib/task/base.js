const fs = require('fs');
const inquirer = require('inquirer');
const { CONFIG } = require('../constants');

module.exports = function() {
    return inquirer.prompt([{
        type: 'input',
        name: CONFIG.PROJECT_NAME,
        message: '请输入项目名称',
        validate: function(name) {
            if (!name) {
                return '项目名称不能为空';
            }

            if (fs.existsSync(name)) {
                return '项目名称已经存在';
            }

            return true;
        }
    }, {
        type: 'input',
        name: CONFIG.PROJECT_DESC,
        message: '请输入项目描述'
    }]);
};
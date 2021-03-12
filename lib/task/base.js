const fs = require('fs');
const inquirer = require('inquirer');
const { CONFIG } = require('../constants');
const utils = require('../utils');

module.exports = function() {
    return inquirer.prompt([{
        type: 'input',
        name: CONFIG.PROJECT_NAME,
        message: 'Please enter a project name',
        validate: function(name) {
            if (!name) {
                return 'Project name cannot be empty';
            }

            if (fs.existsSync(name)) {
                return 'Project already exists';
            }

            return true;
        }
    }/*, {
        type: 'input',
        name: CONFIG.PROJECT_DESC,
        message: 'Please enter a project description'
    }*/]);
};
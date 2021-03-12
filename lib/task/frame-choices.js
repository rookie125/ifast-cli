const inquirer = require('inquirer');
const template = require('../Template');
const { CONFIG, FRAME_DEFAULT_LIST } = require('../constants');

module.exports = function() {
    const templates = template.get();
    const CUSTOM_LIST = Object.keys(templates).map(key => templates[key]);

    return inquirer.prompt([{
        type: 'list',
        name: CONFIG.FE_FRAME,
        message: 'Please choose the front frame',
        choices: CUSTOM_LIST.length ? [
            ...FRAME_DEFAULT_LIST,
            new inquirer.Separator(),
            ...CUSTOM_LIST
        ] : FRAME_DEFAULT_LIST
    }]);
};
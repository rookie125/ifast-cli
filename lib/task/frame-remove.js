const inquirer = require('inquirer');
const template = require('../Template');
const { CONFIG } = require('../constants');

module.exports = function() {
    const templates = template.get();
    const CUSTOM_LIST = Object.keys(templates).map(key => templates[key]);

    if (!CUSTOM_LIST.length) {
        console.log('');
        console.log('No custom template found');
        console.log('');
        console.log('Others:');
        console.log('   You can add templates through `$ ifast add <template-name> <repo>`')
        console.log('');
        process.exit(1);
    }

    return inquirer.prompt([{
        type: 'list',
        name: CONFIG.FE_FRAME,
        message: 'Please select the template to delete',
        choices: CUSTOM_LIST
    }]);
};
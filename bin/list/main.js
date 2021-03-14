const chalk = require('chalk');
const template = require('../../lib/Template');
const { FRAME_DEFAULT_LIST } = require('../../lib/constants');

const INDENT_TAG = '       ';

module.exports = function() {
    const templates = template.get();

    const CUSTOM_LIST = Object.keys(templates).map(key => templates[key]);
    const defaultList = FRAME_DEFAULT_LIST.map(_ => `${INDENT_TAG}${_.name}`);
    const customList = CUSTOM_LIST.map(_ => `${INDENT_TAG}${_.name}`);

    console.log('');
    console.log(chalk.bold('Template list:'));
    console.log('');
    console.log('   Defaults:')
    console.log(defaultList.join('\n'));
    console.log('   Customs:');
    console.log(customList.join('\n'));
    console.log('');
}
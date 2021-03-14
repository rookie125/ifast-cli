const os = require('os');
const path = require('path');
const package = require('../../package.json');
const fsExtra = require('fs-extra');
const utils = require('../../lib/utils');
const {  TEMPLATE_CONFIG_FILE, TEMPLATE_CONFIG_IGNORE } = require('../../lib/constants');

const rootPath = path.resolve(os.homedir(), '.' + package.name);
const configPath = path.resolve(rootPath, TEMPLATE_CONFIG_FILE);
const templatePath = path.resolve(rootPath, 'templates');

module.exports = function generator() {
    if (utils.fsExistsSync(rootPath)) {
        return;
    }

    fsExtra.mkdirSync(rootPath);
    fsExtra.mkdirSync(templatePath);
    fsExtra.writeJSONSync(configPath, {
        templates: {},
        ignore: TEMPLATE_CONFIG_IGNORE
    });
}
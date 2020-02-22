const fs = require('fs');
const path = require('path');

const { CONFIG } = require('../lib/constants');
const { PROJECT_NAME, PROJECT_DESC } = CONFIG;

function newReplaceRegExp(prop) {
    return new RegExp(`"${prop}":\\s*"(.*)"`);
}

module.exports = function replacePackageConf(projectPath, config) {
    const filePath = path.resolve(projectPath, 'package.json');

    let packageConf = fs.readFileSync(filePath, 'utf-8');
    
    // repalce name
    const nameProp = 'name';
    packageConf = packageConf.replace(newReplaceRegExp(nameProp), `"${nameProp}": "${config[PROJECT_NAME]}"`);

    // reaplce description
    const descProp = 'description';
    packageConf = packageConf.replace(newReplaceRegExp(descProp), `"${descProp}": "${config[PROJECT_DESC] || '$1'}"`);

    fs.writeFileSync(filePath, packageConf);
}
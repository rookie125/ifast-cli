#! /usr/bin/env node 

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const chalk = require('chalk');
const ora = require('ora');

const utils = require('../../lib/utils');

const installDep = require('../../lib/install-dep');
const replacePackageConf = require('../../lib/replace-package-conf');

// task
const { frameTask, installTask } = require('../../lib/task');

// const
const { CONFIG, TEMPLATES, LOCAL } = require('../../lib/constants');
const { FE_FRAME } = CONFIG;

module.exports = async function create(name, opts) {
    if (fs.existsSync(name)) {
        console.log(chalk.red('Project already exists'));
        process.exit(1);
    }

    const config = await frameTask();
    const dirPath = `./${name}`;
    const spinner = ora();
    const feFrame = config[FE_FRAME];

    // The file path of the current project
    const projectPath = path.resolve(process.cwd() || process.env.PWD, name);

    // downloading template
    spinner.start(chalk.green('☕️ Downloading template'));

    // local custom-template
    if (typeof feFrame === 'object' && feFrame.type === LOCAL) {
        await new Promise(resolve => {
            try {
                fsExtra.copySync(feFrame.value, dirPath);
                setTimeout(resolve, 2000);
            } catch {
                console.log(chalk.red('☠️ TypeError...'));
                process.exit(1);
            }
        })
    } else {
        const remoteURL = feFrame.value ? utils.transformUrl(feFrame.value) : TEMPLATES[feFrame];
        const repError = await utils.cloneRepo(remoteURL, dirPath);

        if (repError) {
            console.log(chalk.red('☠️ Network connection timed out'));
            process.exit(1);
        }

        // replace package.name|description
        replacePackageConf(projectPath, config)
    }

    spinner.succeed(chalk.green('✨ Download successful'));

    // Install dependencies
    const installRes = await installTask();

    if (installRes[CONFIG.INSTALL_DEP]) {
        installDep(path.resolve(process.cwd() || process.env.PWD, name), name);
    } else {
        console.log('')
        console.log(`You can execute ${chalk.green(`\`cd ${name} && npm install\``)} to install dependencies`);
    }
}
const fs = require('fs');
const os = require('os');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const package = require('../../package.json');
const fsExtra = require('fs-extra');
const short = require('short-uuid')();

const utils = require('../../lib/utils');
const template = require('../../lib/Template');
const { LOCAL, REMOTE, TEMPLATE_CONFIG_FILE } = require('../../lib/constants');

const URL_REG = /^https:\/\/.+/i;
const rootPath = path.resolve(os.homedir(), '.' + package.name);

module.exports = async function create(name, repo) {
    const id = short.new();
    const spinner = ora();

    spinner.start(chalk.green('☕️ Adding template'));

    if (URL_REG.test(repo)) {
        template.set(id, {
            name: `[Remote] ${name}（custom-template）`,
            value: {
                id,
                value: repo,
                type: REMOTE
            }
        });
    } else if (utils.fsExistsSync(repo)) {
        const templatePath = path.resolve(rootPath, 'templates');
        const config = fsExtra.readJSONSync(path.resolve(rootPath, TEMPLATE_CONFIG_FILE));
        const dirs = utils.fsEachFiles(repo, config.ignore);

        while (dirs.length) {
            const dir = dirs.shift();

            fsExtra.copySync(
                path.resolve(repo, dir),
                path.resolve(templatePath, id, dir)
            );
        }
        template.set(id, {
            name: `[Local] ${name}（custom-template）`,
            value: {
                id,
                value: path.resolve(templatePath, id),
                type: LOCAL
            }
        });
    } else {
        console.log(chalk.red(`There is an exception in \`${name}\``));
        console.log(chalk.red(`\`${name}\`存在异常`));
        process.exit(1);
    }

    spinner.succeed(chalk.green('✨ Added successfully'));
}
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const short = require('short-uuid')();

const utils = require('../../lib/utils');
const template = require('../../lib/Template');
const { LOCAL, REMOTE } = require('../../lib/constants');

const URL_REG = /^https:\/\/.+/i;
const rootPath = path.resolve(__dirname, '../../');
const templatePath = path.resolve(rootPath, 'templates');
const templateignore = fsExtra.readFileSync(path.resolve(rootPath, '.templateignore'), 'utf-8').split('\n');

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
        const dirs = utils.fsEachFiles(repo, templateignore);

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
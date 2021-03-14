const ora = require('ora');
const chalk = require('chalk');
const fsExtra = require('fs-extra');

const template = require('../../lib/Template');
const { CONFIG } = require('../../lib/constants');
const { confirmRemoveTask, removeTemplateTask } = require('../../lib/task');

module.exports = async function removeTemplate() {
    const config = await removeTemplateTask();
    const confirm = await confirmRemoveTask();

    if (!confirm[CONFIG.CONFIRM_REMOVE]) {
        process.exit(1);
    }

    const choiceTemplate = config[CONFIG.FE_FRAME];
    const spinner = ora();

    spinner.start('Retrieving templates');

    try {
        template.remove(choiceTemplate.id)
        await new Promise(resolve => {
            fsExtra.removeSync(choiceTemplate.value);

            setTimeout(resolve, 1500);
        });

        spinner.succeed(chalk.green('Removed successfully'));
    } catch {
        spinner.fail(chalk.red('Removal failed'));
    }
}
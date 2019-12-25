const chalk = require('chalk');
const ora = require('ora');
const exec = require('child_process').exec;

let spinner = null;

function execCmd(cmd) {
    return new Promise((resolve, reject) => {
        try {
            exec(cmd, (err, stdout) => resolve([err, stdout]));
        } catch (e) {
            reject(e)
        }
    })
}

function execResponse(projectName, [err, stdout]) {
    console.log('');

    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(stdout);
    spinner.succeed(chalk.green('Successfully installed dependencies'));

    console.log(`You can execute ${chalk.green(`\`cd ${projectName} && npm start\``)} to start the application`);
}

module.exports = function installDep(projectName) {

    const yarnCmd = `cd ${projectName} && yarn install`;
    const npmCmd = `cd ${projectName} && npm i --registry=http://r.cnpmjs.org`;

    spinner = ora();

    spinner.start(chalk.green('Installing dependent packages'));

    execCmd(yarnCmd)
        .then(execResponse.bind(null, projectName))
        .catch(() => execCmd(npmCmd).then(execResponse.bind(null, projectName)))
};
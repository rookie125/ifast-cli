const chalk = require('chalk');
const ora = require('ora');
const spawn = require('child_process').spawn;

module.exports = function installDep(projectName) {
    let cmd = null;

    const args = ['install'];
    const opts = { cwd: projectName, stdio: 'inherit' };

    console.log(`☕️ ${chalk.green('Start installing dependencies')}`);
    console.log('');

    try {
        cmd = spawn('yarn', [...args], opts)
    } catch (e) {
        cmd = spawn('npm', [...args, '--registry=https://registry.npm.taobao.org'], opts)
    }

    cmd.on('close', () => {
        console.log('');
        console.log(`You can execute ${chalk.green(`\`cd ${projectName} && npm start\``)} to start the application`);
    });
};
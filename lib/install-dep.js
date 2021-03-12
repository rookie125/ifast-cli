const chalk = require('chalk');
const { spawn } = require('child_process');
const { sync: spawnSync } = require('cross-spawn')

function done(projectName) {
    console.log('');
    console.log(`You can execute ${chalk.green(`\`cd ${projectName} && npm start\``)} to start the application`);
}

module.exports = function installDep(pwd, projectName) {
    let cmd = null;

    const args = ['install'];
    const opts = {
        cwd: pwd,
        stdio: 'inherit'
    };

    console.log(`☕️ ${chalk.green('Start installing dependencies')}`);
    console.log('');

    cmd = spawnSync('yarn', [...args], opts);

    if (!cmd.error) {
        done(projectName);
    } else {
        cmd = spawnSync('npm', [...args, '--registry=http://r.cnpmjs.org'], opts)

        if (!cmd.error) done(projectName)
    }
};
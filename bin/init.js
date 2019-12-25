#! /usr/bin/env node 

const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('child_process').exec;
const download = require('download-git-repo');
const package = require('../package.json');

// task
const {
	baseTask,
	frameTask,
	cssChoicesTask,
	installTask
} = require('../lib/task');

// const
const { CONFIG, TEMPLATES } = require('../lib/constants');
const { PROJECT_NAME, PROJECT_DESC, FE_FRAME, CSS_PREPROCESSOR, USE_CSS_MODULE } = CONFIG;

program
	.version(package.version)
	.command('init')
	.description('Create a new project')
	.action(async () => {

		const config = {
			[PROJECT_NAME]: '',
			[PROJECT_DESC]: '',
			[FE_FRAME]: '',
			[CSS_PREPROCESSOR]: '',
			[USE_CSS_MODULE]: false
		};

		// exec task
		Object.assign(config, {
			...await baseTask(),
			...await frameTask(),
			...await cssChoicesTask()
		});
		
		let spinner = ora();

		// downloading template
		spinner.start(chalk.green('Downloading template'));
		const err = await new Promise(resolve => download(TEMPLATES[config[FE_FRAME]], config[PROJECT_NAME], { clone: true }, resolve));
		
		if (err) {
			console.log(chalk.red('Network connection timed out'));
			process.exit(1);
		}
		spinner.succeed(chalk.green('Download successful'));


		// install dependencies
		const installRes = await installTask();

		if (installRes[CONFIG.INSTALL_DEP]) {
			spinner = ora();

			spinner.start(chalk.green('Installing dependent packages'));

			exec(`cd ${config[PROJECT_NAME]} && yarn install`, (err, stdout) => {
				if (err) process.exit(1);

				console.log('');
				console.log(stdout);
				spinner.succeed(chalk.green('Successfully installed dependencies'));

				console.log(`You can execute ${chalk.green(`\`cd ${config[PROJECT_NAME]} && npm start\``)} to start the application`);
				process.exit(0);
			});
		} else {
			console.log('')
			console.log(`You can execute ${chalk.green(`\`cd ${config[PROJECT_NAME]} && npm install\``)} to install dependencies`);
		}

	})
	.on('--help', function() {
		console.log('  Examples:')
		console.log('')
		console.log(`$ ${package.name} init`)
	})

program.parse(process.argv)
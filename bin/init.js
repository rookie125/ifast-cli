#! /usr/bin/env node 

const path = require('path')
const fs = require('fs');

const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const exec = require('child_process').exec;
const download = require('download-git-repo');

const package = require('../package.json');
const installDep = require('../lib/install-dep');

// task
const {
	baseTask,
	frameTask,
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
			// 
			// ...await cssChoicesTask()
		});
		
		let spinner = ora();

		// downloading template
		spinner.start(chalk.green('Downloading template'));
		const err = await new Promise(resolve => download(TEMPLATES[config[FE_FRAME]], config[PROJECT_NAME], { clone: true }, resolve));

		if (err) {
			console.log(chalk.red('Network connection timed out'));
			process.exit(1);
		}

		// The file path of the current project
		// const projectPath = path.resolve(process.env.PWD, config[PROJECT_NAME]);

		// Do something...
		// console.log(JSON.parse(fs.readFileSync(path.resolve(projectPath, 'package.json'), 'utf-8')))


		spinner.succeed(chalk.green('Download successful'));


		// Install dependencies
		const installRes = await installTask();

		if (installRes[CONFIG.INSTALL_DEP]) {
			installDep(config[PROJECT_NAME]);
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
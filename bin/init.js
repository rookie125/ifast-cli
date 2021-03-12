#! /usr/bin/env node 

const path = require('path')

const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');

const utils = require('../lib/utils');

const package = require('../package.json');
const installDep = require('../lib/install-dep');
const replacePackageConf = require('../lib/replace-package-conf');

// task
const { baseTask, frameTask, installTask } = require('../lib/task');

// const
const { CONFIG, TEMPLATES } = require('../lib/constants');
const { PROJECT_NAME, PROJECT_DESC, FE_FRAME, CSS_PREPROCESSOR, USE_CSS_MODULE } = CONFIG;

program
	.version(package.version)
	.command('create')
	.description('Create a new project')
	.action(async () => {
		const config = Object.assign({
			[PROJECT_NAME]: '',
			[PROJECT_DESC]: '',
			[FE_FRAME]: '',
			[CSS_PREPROCESSOR]: '',
			[USE_CSS_MODULE]: false
		}, {
			...await baseTask(),
			...await frameTask(),
		});;

		const projectName = config[PROJECT_NAME];
		const dirPath = `./${projectName}`;
		const spinner = ora();

		// downloading template
		spinner.start(chalk.green('Downloading template'));

		const err = await utils.cloneRepo(TEMPLATES[config[FE_FRAME]], dirPath);

		if (err) {
			console.log(chalk.red('Network connection timed out'));
			process.exit(1);
		}

		// The file path of the current project
		const projectPath = path.resolve(process.cwd() || process.env.PWD, projectName);
	
		// replace package.name|description
		replacePackageConf(projectPath, config)

		spinner.succeed(chalk.green('Download successful'));

		// Install dependencies
		const installRes = await installTask();

		if (installRes[CONFIG.INSTALL_DEP]) {
			installDep(projectPath, projectName);
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
#! /usr/bin/env node 

const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const package = require('../package.json');

// task
const {
	baseTask,
	frameTask,
	cssChoicesTask,
	cssModuleTask
} = require('../lib/task');

// const
const {
	PROJECT_NAME,
	PROJECT_DESC,
	FE_FRAME,
	CSS_PREPROCESSOR,
	USE_CSS_MODULE
} = require('../lib/constants');

const templateUrl = 'github:https://github.com:ShuyunFF2E/ccms-angular-styleguide#master';

program
	.version(package.version)
	.command('init')
    .description('Create a new project')
    .action(async option => {

        const config = {
			[PROJECT_NAME]: '',
			[PROJECT_DESC]: '',
			[FE_FRAME]: '',
			[CSS_PREPROCESSOR]: '',
			[USE_CSS_MODULE]: false
		};

		Object.assign(config, {
			...await baseTask(),
			...await frameTask(),
			...await cssChoicesTask()
		});

		if (['less', 'sass'].includes(config[CSS_PREPROCESSOR])) {
			Object.assign(config, await cssModuleTask());
		} else {
			delete config[USE_CSS_MODULE];
		}
		
		const spinner = ora();

		spinner.start(chalk.green('Downloading template'));

		await new Promise(resolve => download(templateUrl, config[PROJECT_NAME], { clone: true }, resolve));

		spinner.succeed(chalk.green('Download successful'));
    })
    .on('--help', function() {
        console.log('  Examples:')
        console.log('')
        console.log(`$ ${package.name} init`)
    })

program.parse(process.argv)
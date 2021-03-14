#!/usr/bin/env node

const os = require('os');
const program = require('commander');
const package = require('../package.json');

require('./add/generator')();

// create project by template
program
	.command('create <app-name>')
	.description('Create a new project')
	.action((name) => {
		if (!name) process.exit(1);

		require('./create/main')(name);
	})
	.on('--help', require('./create/help'))


// add template
program
	.command('add <template-name> <repo>')
	.description('Add custom template to ifast')
	.action((name, repo) => {
		if (!name || !repo) process.exit(1);

		require('./add/main')(name, repo);
	})
	.on('--help', require('./add/help'))

// remove template
program
	.command('remove')
	.description('Remove custom template from ifast')
	.action(require('./remove/main'))


// show list
program
	.command('list')
	.description('list all available project template')
	.action(require('./list/main'))


program
	.usage('<command> [options]')
	.version(package.version)
	.parse(process.argv)
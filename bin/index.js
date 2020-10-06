#!/usr/bin/env node
const program = require('commander')
program
    .version(require('../package').version, '-v, --version')
    .command('init', 'generate a new project from a template')
    .command('init', 'generate a new project from a template')
    .command('list', 'list available official templates')
    .command('wx', 'prototype a new project')
    .command('swan', 'prototype a new project')
    .command('qq', 'prototype a new project')
    .command('ali', 'prototype a new project')
    .parse(process.argv);
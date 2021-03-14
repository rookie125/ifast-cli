const baseTask = require('./base');
const frameTask = require('./frame-choices');
const installTask = require('./install');
const confirmRemoveTask = require('./confirm-remove');
const removeTemplateTask = require('./frame-remove');

module.exports = {
    baseTask,
    frameTask,
    installTask,
    confirmRemoveTask,
    removeTemplateTask
};
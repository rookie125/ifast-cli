const os = require('os');
const path = require('path');
const fsExtra = require('fs-extra');
const package = require('../package.json');
const { TEMPLATE_CONFIG_FILE, TEMPLATE_CONFIG_IGNORE } = require('./constants');

const configPath = path.resolve(
    os.homedir(),
    '.' + package.name,
    TEMPLATE_CONFIG_FILE
);

class Template {
    constructor() {
        let config = {
            templates: {},
            ignore: TEMPLATE_CONFIG_IGNORE
        };
        let templates = {};

        try {
            config = fsExtra.readJSONSync(configPath);
            templates = config.templates;
        } catch {
            fsExtra.writeJSONSync(configPath, config);
        }

        this.config = config;
        this.templates = new Proxy(templates, {
            get(target, prop, receiver) {
                return target[prop];
            },
            set(obj, prop, value) {
                
                // delete
                if (/^DELETE_/.test(prop)) {
                    delete obj[prop.split('_')[1]];
                } else {
                    obj[prop] = value;
                }

                // writeJson
                fsExtra.writeJSONSync(configPath, {
                    ...config,
                    templates: obj
                });

                return obj;
            }
        })
    }

    get(name) {
        if (!name) {
            return {...this.templates};
        }

        return this.templates[name];
    }

    set(name, value) {
        this.templates[name] = value;
    }

    remove(name) {
        if (!this.get(name)) {
            return;
        }

        this.templates[`DELETE_${name}`] = null;
    }
}

const template = new Template()

module.exports = {
    get: (...args) => template.get(...args),
    set: (...args) => template.set(...args),
    remove: (name) => template.remove(name)
};

const path = require('path');
const fsExtra = require('fs-extra');
const { TEMPLATE_CONFIG_FILE } = require('./constants');

const templateConfPath = path.resolve(__dirname, '../', TEMPLATE_CONFIG_FILE);

class Template {
    constructor() {
        let templates = {};

        try {
            templates = fsExtra.readJSONSync(templateConfPath);
        } catch {
            fsExtra.writeJSONSync(templateConfPath, {});
        }

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
                fsExtra.writeJSONSync(templateConfPath, obj);

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

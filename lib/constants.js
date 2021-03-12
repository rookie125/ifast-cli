const ES = 'vanilla';
const VUE = 'vue';
const REACT = 'react';
const NASA = 'nasa';

const LOCAL = 0;
const REMOTE = 1;

const TEMPLATE_CONFIG_FILE = '.template.json';

const CONFIG = {
    // 项目名称
    PROJECT_NAME: 'projectName',

    // 项目描述
    PROJECT_DESC: 'projectDesc',

    // Front frame
    FE_FRAME: 'feFrame',

    // CSS Preprocessor
    CSS_PREPROCESSOR: 'cssPreprocessor',

    // Install dependencies
    INSTALL_DEP: 'installDep',

    // Config remote template
    CONFIRM_REMOVE: 'confirmRemove'
};

const TEMPLATES = {
    [NASA]: 'github:rookie125/nasa-react-project',
    [REACT]: 'github:rookie125/react-project',
    [VUE]: 'github:rookie125/vue-project',
    [ES]: 'github:rookie125/es2015-project',
}

const FRAME_DEFAULT_LIST = [{
    name: `${NASA}（Taro and React）`,
    value: NASA
}, {
    name: `${REACT}（A JavaScript library for building user interfaces）`,
    value: REACT
}, {
    name: VUE,
    value: VUE
}, {
    name: ES,
    value: ES
}];

module.exports = {
    ES,
    VUE,
    REACT,
    NASA,
    CONFIG,
    TEMPLATES,
    FRAME_DEFAULT_LIST,
    TEMPLATE_CONFIG_FILE,
    LOCAL,
    REMOTE
};
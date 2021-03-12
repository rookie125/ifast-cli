const ES = 'vanilla';
const VUE = 'vue';
const REACT = 'react';
const NASA = 'nasa';

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
};

const TEMPLATES = {
    [NASA]: 'github:rookie125/nasa-react-project',
    [REACT]: 'github:rookie125/react-project',
    [VUE]: 'github:rookie125/vue-project',
    [ES]: 'github:rookie125/es2015-project',
}

module.exports = {
    ES,
    VUE,
    REACT,
    NASA,
    CONFIG,
    TEMPLATES
};
const fs = require('fs');
const clone = require('git-clone');
const download = require('download-git-repo');

/**
 * 检测文件/文件夹是否存在
 * @param {string} path 
 * @returns 
 */
function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
    } catch(e) {
        return false;
    }
    return true;
}

function cloneRepo(repo, targetPath) {
    return new Promise((resolve, reject) => {
        download(repo, targetPath, { clone: true }, err => {
            err ? reject() : resolve()
        })
    })
}

module.exports = {
    fsExistsSync,
    cloneRepo
}
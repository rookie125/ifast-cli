const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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
            err ? reject(true) : resolve()
        })
    })
}

function transformUrl(sourceUrl) {
    if (/github\.com/i.test(sourceUrl)) {
        return sourceUrl.replace(/^https:\/\/(github)\.com\//, '$1:');
    }

    return sourceUrl;
}

function fsEachFiles(startPath, ignoreDirs = []) {
    let result = [];
    let files = fs.readdirSync(startPath).filter(v => !ignoreDirs.includes(v));

    files.forEach(val => {
        let file = path.join(startPath, val);
        let stats = fs.statSync(file);

        if(stats.isDirectory()) {
            result.push(...fsEachFiles(file));
        } else if(stats.isFile()) {
            result.push(file);
        }
    });

    return result;
}

module.exports = {
    fsExistsSync,
    fsEachFiles,
    cloneRepo,
    transformUrl
}
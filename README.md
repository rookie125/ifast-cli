## ifast-cli

> Quickly create react, Vue or applications without front-end framework

[![npm Package](https://img.shields.io/npm/v/ifast-cli.svg)](https://www.npmjs.org/package/ifast-cli)

## Install
```bash
# yarn
$ yarn global add ifast-cli

# npm
$ npm install -g ifast-cli
```

## Help

```bash
# Help information
$ ifast -h

# Usage: ifast <command> [options]

# Options:
#   -V, --version               output the version number
#   -h, --help                  output usage information

# Commands:
#   create <app-name>           Create a new project
#   add <template-name> <repo>  Add custom template to ifast
#   remove                      Remove custom template from ifast
#   list                        list all available project template
```

## Examples

#### create
```bash
$ ifast create <app-name>

? Please choose the front frame
  ❯ nasa（Taro and React）
    react（A JavaScript library for building user interfaces）
    vue
    vanilla
    ──────────────
    [Local] custom-demo-local（custom-template）
    [Remote] custom-demo-remote（custom-template）

# 1. . Downloading template
# 2. ✔ Download successful

? Do you need to install dependencies (Y/n): Y
# cd name && npm install
```

#### add
```bash
$ ifast add <template-name> <repo>

# 1. ☕️ Adding template
# 2. ✨ Added successfully

# Examples:
#
# Local:
# 1. Go to the template root directory (cd /template)
# 2. $ ifast add local ./
#
# or
#
# Remote:
# 1. $ ifast add remote https://github.com/user/project
```

#### list
```bash
$ ifast list

# Template list:

#    Defaults:
#        nasa（Taro and React）
#        react（A JavaScript library for building user interfaces）
#        vue
#        vanilla
#    Customs:
#        [Local] custom-demo-local（custom-template）
#        [Remote] custom-demo-remote（custom-template）

```

#### remove
```bash
$ ifast remove

? Please select the template to delete
  ❯ [Local] custom-demo-local（custom-template）
    [Remote] custom-demo-remote（custom-template）

# ✔ [Remote] custom-demo-remote（custom-template）

? Are you sure you want to remove it (Y/n)
# ✔ Removed successfully
```
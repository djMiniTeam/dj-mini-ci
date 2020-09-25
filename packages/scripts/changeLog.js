var fs = require('fs'),
    path = require('path');

let jenkinsVersion = process.env.npm_config_appversion || "";
let mainAppPath = process.env.npm_config_apppath;
let desc = process.env.npm_config_appdesc || "迭代";
let changeAuthor = process.env.npm_config_changeauthor || 30;
let buildNumber = process.env.npm_config_buildnumber || 30;
let buildUrl = process.env.npm_config_buildurl || "";

let filePath = path.resolve(__dirname, mainAppPath, 'common/util/releaseVersion.js'),//版本文件路径
    changeLogPath = path.resolve(__dirname, mainAppPath, 'CHANGELOG.md')
    configPath = path.resolve(__dirname, '../config/', 'index.js')
appPath = path.resolve(__dirname, mainAppPath, 'app.js');//app.js路径

let xcxVersion = ""
let pushMsg = {
    publishVersion: '',//打包版本号
    changeAuthor,
    description: desc,
    buildNumber,
    buildUrl
}
//获取node命令参数
if (jenkinsVersion) {
    xcxVersion = jenkinsVersion || ""
    //转小写
    xcxVersion = xcxVersion.toLowerCase()
    if (xcxVersion.indexOf('v') > -1) {
        xcxVersion = xcxVersion.replace(/v/g, "")
    }
}

function getTimeStmpFun() {
    var date = new Date();//实例一个时间对象；
    var year = date.getFullYear();//获取系统的年；
    var month = date.getMonth() + 1;//获取系统月份，由于月份是从0开始计算，所以要加1
    var day = date.getDate(); //获取系统日
    var hour = date.getHours();//获取系统时间
    var minute = date.getMinutes(); //分
    var second = date.getSeconds();//秒
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (second < 10) {
        second = '0' + second
    }
    console.log(`${year},${month},${day},${hour},${minute},${second},00`)
    return `${year}${month}${day}${hour}${minute}${second}00`
}

/**
 * 自动修改版本号
 * @type {*|string[]}
 */
const data = fs.readFileSync(filePath, 'utf8').split('\n')
let getTimeStmp = ''
data.forEach((item, index) => {
    if (item.includes('xcxVersion:')) {
        //有外部入参 如Jenkins优先，
        // 没有则在xcxVersion的最后一位自动+1
        if (xcxVersion) {
            data[index] = `    xcxVersion:"${xcxVersion}",`
        } else {
            let releaseVersion = data[index].split(':')[1]
            releaseVersion = releaseVersion.replace(/("|'|,)/g, '')
            let version = releaseVersion.split('.').join('')
            if (version.length === 3) {
                version = String(version - 0 + 1)
                if (version.length === 3) {
                    xcxVersion = version.split('').join('.')
                    data[index] = `    xcxVersion:"${xcxVersion}",`
                }
            }
        }
    }
    if (item.includes('xcxUpdateVersionTimes:')) {
        getTimeStmp = getTimeStmpFun()
        data[index] = `    xcxUpdateVersionTimes:${getTimeStmp}`
    }
})
pushMsg.publishVersion = xcxVersion + '.' + getTimeStmp
fs.writeFileSync(filePath, data.join('\n'), 'utf8')

/**
 * 强制关闭环境开关
 */
const appData = fs.readFileSync(appPath, 'utf8').split('\n')
appData.forEach((item, index) => {
    //包含 let handleControlChangeBtn = 直接写死 let handleControlChangeBtn = false
    if (item.includes('handleControlChangeBtn') && item.includes('let') && item.includes('=')) {
        appData[index] = `let handleControlChangeBtn = false`
    }
})
fs.writeFileSync(appPath, appData.join('\n'), 'utf8')


/**
 * 写入打包记录
 */
let logMessage = `### 版本号：${pushMsg.publishVersion} \n    构建编号：${pushMsg.buildNumber}\n    打包人：${pushMsg.changeAuthor}\n    版本内容：${pushMsg.description}\n    编译地址：${pushMsg.buildUrl}\n`

const changeLogData = fs.appendFile(changeLogPath, logMessage, 'utf8', (err) => {
    console.error(err)
})

console.log('pushMsg', pushMsg)

/**
 * 修改版本号
 */
const configData = fs.readFileSync(configPath, 'utf8').split('\n')
configData.forEach((item, index) => {
    //包含 let handleControlChangeBtn = 直接写死 let handleControlChangeBtn = false
    if (xcxVersion && item.includes('let') && item.includes('version') && item.includes('npm_config_appversion')) {
        configData[index] = `let version = "${xcxVersion}";`
    }
})
fs.writeFileSync(configPath, configData.join('\n'), 'utf8')


// var request = require("request");
// let message = `小程序正在打版\n版本号：${pushMsg.publishVersion} \n构建编号：${pushMsg.buildNumber}\n打包人：${pushMsg.changeAuthor}\n版本内容：${pushMsg.description}\n编译地址：${pushMsg.buildUrl}`

// request({
//     url: "http://monitorapi.jddj.com/wechat",
//     method: "post",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//         "code": "MeeceoEoMhhJvDRiuur1wUwm0WlvgdhIZMvYI4lEOuICgt2l",
//         "sign": "66204f1e8526933835930d9e074bd969"
//     },
//     body: {
//         "content": message,
//         "contact": {
//             "users": [
//                 "dengshuhai"
//             ]
//         }
//     }
// }, function (error, response, body) {
//     console.log('error',error)
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// });

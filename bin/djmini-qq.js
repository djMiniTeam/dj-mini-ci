console.log('index-qq')
console.log(process.argv)

var exec = require('child_process').exec; 
var cmdStr = 'docker pull qqminiapp/build:latest';
var cmdStr1 = 'docker run -e PLUGIN_VERSION=1.0.0 -e PLUGIN_DESC=版本描述 -e PLUGIN_APPTOKEN=** -e PLUGIN_EXPERIENCE=true -e PLUGIN_BUILDUSER=user -e PLUGIN_FIRSTPAGE=pages/logs/logs -e PLUGIN_USEPACKAGEJSON=false -e PLUGIN_NPMBUILD=false -e PLUGIN_SOURCECODEPATH=./src -v "E:/miniapptest":"/tmp" -w /tmp "qqminiapp/build:latest';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
        // var data = JSON.parse(stdout);
        console.log(stdout);
    }
});
exec(cmdStr1, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
        // var data = JSON.parse(stdout);
        console.log(data);
    }
});
const path = require("path");
let appId = process.env.npm_config_appid || "";
let mainAppPath =
  process.env.npm_config_apppath || "";
let version = process.env.npm_config_appversion || "V5.0.0";
let keyPath = process.env.npm_config_keypath || "";
let desc = process.env.npm_config_appdesc || "迭代";
let robot = process.env.npm_config_robot || 2;
let pagePath = process.env.npm_config_pagepath || "pages/home/home";
let searchQuery = process.env.npm_config_searchquery || "";
//项目配置
const projectOptions = {
  //appid
  appid: appId,
  type: "miniProgram",
  projectPath: path.join(__dirname, mainAppPath),
  //自己的私钥路径
  privateKeyPath: keyPath,
  ignores: ["node_modules/**/*"],
};
//上传配置参数
const uploadOptions = {
  version: `${version}.1`,
  desc: `正式版-${desc}`,
  setting: {
    es6: true,
    es7: true,
    minify: true,
    autoPrefixWXSS: true,
  },
  robot:robot,//
  onProgressUpdate: (info) => {   
    //  console.log(info);
  },
};

//预览配置
const previewOptions = {
  version: `${version}.1`,
  desc: `开发版-${desc}`,
  setting: {
    es6: true,
    es7: true,
    minify: true,
    autoPrefixWXSS: true,
  },
  robot: robot,
  pagePath:pagePath,
  searchQuery:searchQuery,
  qrcodeFormat: "image",
  qrcodeOutputDest: path.join(__dirname, "../output/preview.jpg"),
  onProgressUpdate: (info) => {
    // console.log(info);
  },
};
const packNpmOptions = {
  //   ignores: ['pack_npm_ignore_list'],
  reporter: (infos) => {
    // console.log(infos);
  },
};
// export { uploadOptions, previewOptions, packNpmOptions, projectOptions };
module.exports = {
  uploadOptions,
  previewOptions,
  packNpmOptions,
  projectOptions,
};

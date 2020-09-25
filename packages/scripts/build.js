// import { projectOptions, uploadOptions, packNpmOptions } from "./config";
const ci = require("miniprogram-ci");
const config = require("../config");

const project = new ci.Project(config.projectOptions);
//上传方法
async function runUpload() {
  try {
    // const warning = await ci.packNpm(project, config.packNpmOptions);
    //上传
    await ci.upload({
      project,
      ...config.uploadOptions,
    });
  } catch (error) {
    console.error(error)
    throw '上传体验版异常：'
  }
  console.log("上传成功");
}
runUpload();



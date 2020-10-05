// import { projectOptions, uploadOptions, packNpmOptions } from "./config";
const ci = require("miniprogram-ci");
const config = require("../config");

const project = new ci.Project(config.projectOptions);
//预览方法
async function runPreview() {
  try {
    // const warning = await ci.packNpm(project, config.packNpmOptions);
    //预览
    await ci.preview({
      project,
      ...config.previewOptions,
    })
  } catch (e) {
    console.error(e)
    throw '生成开发版异常:'
  }
  console.log("预览成功");
}
runPreview();

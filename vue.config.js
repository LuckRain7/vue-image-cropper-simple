/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-11 23:09:02
 */

const env = process.env.NODE_ENV;
let config;

if (env === "development") {
  config = {};
} else if (env === "production") {
  config = {
    outputDir: "dist", //打包地址
    publicPath: "/vue-image-cropper-simple/dist/" // 部署应用包时的基本 URL
  };
}

module.exports = config;

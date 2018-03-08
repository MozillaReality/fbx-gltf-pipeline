const path = require("path");
const convert = require("../src/index");

const srcFile = path.join(__dirname, "assets", "Bot_SkinnedWithAnimation.fbx");
const components = path.join(__dirname, "assets", "components.json");

convert(srcFile, { components }).then(() => {
  console.log("done");
}).catch((err) => {
  throw err;
});

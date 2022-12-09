const fs = require("fs");

export const createJson = async (pathName: string, source: any) => {
  const toJSON = JSON.stringify(source);
  fs.writeFile(`src/json/${pathName}`, toJSON, (err: any) => {
    if (err) throw err;
    if (!err) {
      console.log("JSONファイルを生成しました");
    }
  });
  return;
};
// const dupliCheck = async (pathName: string) => {
//   try {
//     fs.statSync(pathName);
//     return true;
//   } catch (err: any) {
//     //パスが存在しない場合エラーを返す
//     if (err.code === "ENOENT") return false;
//   }
// };

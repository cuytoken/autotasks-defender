var fs = require("fs");
var axios = require("axios");

async function getAbiIntoPathFile(smartContractAddress, scanApiKey, path) {
  // var url = `https://api-moonbase.moonscan.io/api?module=contract&action=getabi&address=${smartContractAddress}&apikey=${scanApiKey}`;
  var url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${smartContractAddress}&apikey=${scanApiKey}`;
  console.log(url);
  var payload = {
    method: "get",
    url,
    timeout: 4000,
  };
  var { data } = await axios(payload);
  var { status, message, result } = data;
  if (!(status == "1")) throw new Error("Status not OK");
  fs.writeFileSync(path, `module.exports = ${result}`, "utf-8");
  console.log(`ABI saved into path: ${path}`);
}
var apiScan = process.env.MOONBASESCAN_API_KEY_RAND;

module.exports = {
  getAbiIntoPathFile,
  apiScan,
};

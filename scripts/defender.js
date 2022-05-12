require("dotenv").config();
require("./warning");
var { retrieveInfoFromId } = require("./mapping");
var { getAbiIntoPathFile } = require("../utils");

const { AutotaskClient } = require("defender-autotask-client");
const client = new AutotaskClient({
  apiKey: process.env.API_KEY_DEFENDER,
  apiSecret: process.env.API_SECRET_DEFENDER,
});

// Required
// var apiScan = ""
var apiScan = "";

async function main() {
  if (process.argv.length <= 2) {
    process.emitWarning("NOTENOUGHARGS");
    return;
  }

  var args = process.argv[2];
  if (!args.includes("=") && args != "getlist") {
    process.emitWarning("KEYNOTPASSED");
    return;
  }
  var [command, info] = args.split("=");

  if (info == null || info == "") {
    process.emitWarning("VALUEOFKEYEMPTY");
    return;
  }

  switch (command) {
    case "update":
      await client.updateCodeFromFolder(
        info,
        retrieveInfoFromId(info).pathToFolderCode
      );
      break;
    case "get":
      console.log(await client.get(info));
      break;

    case "getabi":
      if (apiScan == null || apiScan == "") {
        process.emitWarning("SCANKEYEMPTY");
        return;
      }

      if (process.argv.length <= 3) {
        process.emitWarning("PATHISMISSING");
        return;
      }
      var args = process.argv[3];
      var [command, path] = args.split("=");
      await getAbiIntoPathFile(info, apiScan, path);
      break;

    default:
      process.emitWarning("UKNOKWNCOMMAND");
      break;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

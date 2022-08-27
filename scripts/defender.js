require("dotenv").config();
require("./warning");
var { retrieveInfoFromId } = require("./mapping");
var { getAbiIntoPathFile } = require("../utils");
const { AutotaskClient } = require("defender-autotask-client");

// !!!!IMPORTANT!!!! Set account 1 or 2 first before deploying this script
var account2 = false;

var key_defender, secret_defender;
if (account2) {
  key_defender = process.env.API_KEY_DEFENDER_2;
  secret_defender = process.env.API_SECRET_DEFENDER_2;
} else {
  key_defender = process.env.API_KEY_DEFENDER;
  secret_defender = process.env.API_SECRET_DEFENDER;
}
const client = new AutotaskClient({
  apiKey: key_defender,
  apiSecret: secret_defender,
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

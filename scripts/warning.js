process.on("warning", (warning) => {
  switch (warning.message) {
    case "NOTENOUGHARGS":
      console.warn("Pass either 'update', 'getlist'");
      break;

    case "KEYNOTPASSED":
      console.warn("Key not passed properly");
      break;

    case "UKNOKWNCOMMAND":
      console.warn("Command not recognized");
      break;

    case "VALUEOFKEYEMPTY":
      console.warn("Value of key pair should not be empty");
      break;

    case "SCANKEYEMPTY":
      console.warn("A scan key is required not to be empty");
      break;

    case "PATHISMISSING":
      console.warn("A path file must be passed to write the sc's ABI");
      break;

    default:
      break;
  }
});

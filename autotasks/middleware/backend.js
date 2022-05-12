require("dotenv").config();
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers");

var axios = require("axios");
var { ethers } = require("ethers");
var { encodeSignatureAndParams, encodeSignature } = require("encoding-payload");
var { Relayer } = require("defender-relay-client");
var ABI = require("./abi/middlewareAbiRinkeby");
var vrAbi = require("./abi/vaultReserveAbi");
var ADDRESS_MIDDLEWARE = "0x22ddb775e6c852d847BfD6991005b97dE1c653d7";
var vrAddress = "0x7a2CFd2304c86eb9C12A65954F25edA2b737C31B";

const credentials = {
  apiKey: process.env.RELAYER_API_KEY_RINKEBY,
  apiSecret: process.env.RELAYER_SECRET_KEY_RINKEBY,
};
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, {
  speed: "fast",
});

var functionToExecute, params;
var gasLimit = { gasLimit: 3000000 };

const contract = new ethers.Contract(ADDRESS_MIDDLEWARE, ABI, signer);
const vrContract = new ethers.Contract(vrAddress, vrAbi, signer);

function addNewFunction() {
  /**
   * Let's say we want to add a new function from Vault Reserve at:
   * Proxy -          0x7a2CFd2304c86eb9C12A65954F25edA2b737C31B
   * Implementation - 0x9262c5D76F59F8492c901078d005912496B3791a
   *
   * The function we want to add is 'transfer'. We need the following params:
   */
  /**
   * params: [
   *  _functionName,
   *  _functionSignature,
   *  _address,
   *  _limitCallsPerFrameTime,
   *  _frameTimeCalls,
   *  _frameTimeFunds,
   *  _limitFundsPerFrameTime
   * ];
   */
  functionToExecute = "addNewTrackingForFunction";
  params = [
    "transfer",
    "transfer(address,uint256)",
    "0x7a2CFd2304c86eb9C12A65954F25edA2b737C31B",
    15,
    30,
    30,
    ethers.utils.parseUnits("10", 18),
  ];
}

function updateTreshold() {
  /**
   * If we wish to update any treshold of a function, we need to choose a _statyType to update and then use the encoded function signature
   * Note: Use a library for encoding
   */
  functionToExecute = "updateTrackingThresholdForFunction";
  /**
   * _statType: "limitCallsPerFrameTime" | "limitFundsPerFrameTime";
   * params: [_functionId, _statType, _newAmount]
   * _functionId is the Encoded function
   */
  params = [
    encodeSignature("transfer(address,uint256)"),
    "limitCallsPerFrameTime",
    10000,
  ];
}

function forwardCallToProxy() {
  /**
   * params: [amount, bytes];
   * Note: in nodeJS, 'bytes' would be represented as 'string'
   */

  functionToExecute = "forwardCallToProxy";
  var amount = 1000000;
  params = [
    amount,
    encodeSignatureAndParams(
      "transfer(address,uint256)",
      ["address", "uint256"],
      ["0x6BE0692ae8b0Fa22921E85A0E05710840F072fd0", String(amount)]
    ),
    gasLimit,
  ];
}

async function transfer() {
  var tx = await vrContract.transfer(
    "0x27Df06e363eCCeeFce950D7A4f1d04F144a6E712",
    1,
    gasLimit
  );
  await tx.wait();
  console.log(tx.hash);
}

async function viewStat() {
  var {
    functionName,
    functionSignature,
    functionId,
    contractAddress,
    isTracked,
    lastTimeCalled,
    limitCallsPerFrameTime,
    totalAmoutOfCalls,
    frameTimeCalls,
    frameTimeFunds,
    limitFundsPerFrameTime,
    totalFundsTransferred,
  } = await contract.retrieveStat("transfer(address,uint256)", gasLimit);
  console.log("functionName", functionName);
  console.log("functionSignature", functionSignature);
  console.log("functionId", functionId);
  console.log("contractAddress", contractAddress);
  console.log("isTracked", isTracked);
  console.log("lastTimeCalled", lastTimeCalled.toString());
  console.log("limitCallsPerFrameTime", limitCallsPerFrameTime.toString());
  console.log("totalAmoutOfCalls", totalAmoutOfCalls.toString());
  console.log("frameTimeCalls", frameTimeCalls.toString());
  console.log("frameTimeFunds", frameTimeFunds.toString());
  console.log("limitFundsPerFrameTime", limitFundsPerFrameTime.toString());
  console.log("totalFundsTransferred", totalFundsTransferred.toString());
}

async function main() {
  /**
   * Uncomment individually to perform different operations
   */

  // await addNewFunction();
  // await updateTreshold();
  await forwardCallToProxy();

  // var tx = await contract[functionToExecute](...params);
  console.log("hash", tx.hash);

  // await transfer();
  // await viewStat();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

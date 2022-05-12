/**
 * Smart Contract Functions:
 * forwardCallToProxy(uint256,bytes)
 * addNewTrackingForFunction(string,string,address,uint256,uint256,uint256,uint256)
 */
var axios = require("axios");
var { ethers } = require("ethers");
var { encodeSignatureAndParams, encodeSignature } = require("encoding-payload");
/**
 * Typings from Middleware Smart Contract
 */
declare type functionList = "forwardCallToProxy" | "addNewTrackingForFunction" | "updateTrackingThresholdForFunction";

interface IForwardCallToProxy {
  smartContractFunction: functionList;
  // params: [amount, bytes];
  params: [number, string];
}

interface IAddNewTrackingForFunction {
  smartContractFunction: functionList;
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
  params: [string, string, string, number, number, number, number];
}

declare type _statType = "limitCallsPerFrameTime" | "limitFundsPerFrameTime";

interface IUpdateTrackingTresholdFunction {
  smartContractFunction: functionList;
  /**
   * params: [_functionId, _statType, _newAmount]
   */
  params: [string, _statType, number]
}


/**
 * Preparing the data for callin Webhook
 */
var webHookEndPoint =
  "https://api.defender.openzeppelin.com/autotasks/86d6b907-c546-4b0d-95b2-3811bdf4531b/runs/webhook/f7b9d5b6-d7a8-4ae1-852f-631c378f4709/UA5bWCndrsYFcw8943HoEQ";

var dataForwar: IForwardCallToProxy;
dataForwar = {
  smartContractFunction: "forwardCallToProxy",
  params: [10, encodeSignatureAndParams("transfer(address,uint256)", ["address", "uint256"], ["0xd2e95f1011899Bd65608229678a1cE815b3dC8C3", "1000000000000000000"])]
};

var dataAddNew: IAddNewTrackingForFunction;
dataAddNew = {
  smartContractFunction: "addNewTrackingForFunction",
  params: [
    "transfer", // * _functionName, 
    "transfer(address,uint256)", // * _functionSignature,
    "0xdC4Cf2D2CbBB0218929F0E15400Fd45362B1794F", // * _address,
    15, // * _limitCallsPerFrameTime,
    30, // * _frameTimeCalls,
    30, // * _frameTimeFunds,
    ethers.utils.parseUnits("10", 18), // * _limitFundsPerFrameTime
  ]
};

dataAddNew = {
  smartContractFunction: "addNewTrackingForFunction",
  params: [
    "moveFundsToAggregator", // * _functionName, 
    "moveFundsToAggregator(uint256)", // * _functionSignature,
    "0xdC4Cf2D2CbBB0218929F0E15400Fd45362B1794F", // * _address,
    15, // * _limitCallsPerFrameTime,
    30, // * _frameTimeCalls,
    30, // * _frameTimeFunds,
    ethers.utils.parseUnits("10", 18), // * _limitFundsPerFrameTime
  ]
};

var dataUpdaTracking: IUpdateTrackingTresholdFunction;
dataUpdaTracking = {
  smartContractFunction: "updateTrackingThresholdForFunction",
  params: [encodeSignature("moveFundsToAggregator(uint256)"), "limitCallsPerFrameTime", 15]
}

/**
 * Making the fetch webhook
 * Autotask: 86d6b907-c546-4b0d-95b2-3811bdf4531b
 * Name: [DEV] Middleware Interaction code
 */

axios({
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify(dataUpdaTracking),
  url: webHookEndPoint
})
  .then((result: any) => console.log(result))
  .catch((error: any) => console.log("error", error));

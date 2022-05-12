// Default Dependancies
import { ethers } from "ethers";
import { Relayer } from "defender-relay-client";
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelaySigner, DefenderRelayProvider } from "defender-relay-client/lib/ethers";

import ABI from "./abi/middlewareAbi";

interface IParamsForwardCallToProxy {
  amount: number;
  bytes: string;
}
interface IParamsAddNewTrackingForFunction {
  _functionName: string;
  _functionSignature: string;
  _address: string;
  _limitCallsPerFrameTime: number;
  _frameTimeCalls: number;
  _frameTimeFunds: number;
  _limitFundsPerFrameTime: number;
}

var AUTOTASK_DEV_MIDDLEWARE_ID = "86d6b907-c546-4b0d-95b2-3811bdf4531b";
var middlewareSCAddress = "0xD15b1609A190816C0626A3a5192205536AE22Ce3"

declare type functionCallsType = "forwardCallToProxy" | "addNewTrackingForFunction";

// Autotask Implementation
export async function handler(event: RelayerParams) {
  const relayer = new Relayer(event);
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" });

  const {
    body,
  } = event.request;

  const { smartContractFunction, params }: { smartContractFunction: functionCallsType, params: any } = body;

  const contract = new ethers.Contract(middlewareSCAddress, ABI, signer);

  var tx = await contract[smartContractFunction](...params);
  return tx;
};

// To run locally (this code will not be executed in Autotasks)
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
}
if (require.main === module) {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => { console.error(error); process.exit(1); });
}

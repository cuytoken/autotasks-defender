import axios from "axios";
import { Buffer } from "buffer";
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelaySigner, DefenderRelayProvider } from "defender-relay-client/lib/ethers";

var { Relayer } = require("defender-relay-client");
var { ethers } = require("ethers");

import tatacuyAbi from "./abi/tatacuyAbi";
import { domain, value, types } from "./data"

var tatacuyAddress = "0x5571780676d7D3C9498ac5Ae89089e3168923D5D";


export async function handler(data: any) {
    // validate secrte

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var {
        context,
        guineaPig,
        wallet,
        likelihood,
        pachaOwner,
        pachaUuid,
        signature,
    } = data.request.body;
    var values = { ...value, guineaPig, wallet, likelihood, context }
    var recoveredAddress = ethers.utils.verifyTypedData(
        domain,
        types,
        values,
        signature
    );

    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) return false;

    // validate with Ludik's backend
    // use 'recoveredAddress'
    var tatacuyContract = new ethers.Contract(tatacuyAddress, tatacuyAbi, signer);
    await tatacuyContract.connect(signer).tryMyLuckTatacuy(
        wallet,
        pachaOwner,
        pachaUuid,
        likelihood
    )
};

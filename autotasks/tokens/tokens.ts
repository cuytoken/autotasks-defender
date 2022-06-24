import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";

var { ethers, utils } = require("ethers");
var axios = require("axios");

import pcuyAbi from "./abi/pcuyAbi";

import { pcuyAddress } from "../scAddresses";

export async function handler(data: any) {
    var { queryParameters } = data.request;
    var { wallet } = queryParameters;

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var pcuyContract = new ethers.Contract(pcuyAddress, pcuyAbi, signer);
    try {
        var tx = await pcuyContract
            .connect(signer)
            .test_mint(wallet, utils.parseEther("100000"));
        await tx.wait(1);
    } catch (error) {
        return error;
    }
    return "Tokens send";
}

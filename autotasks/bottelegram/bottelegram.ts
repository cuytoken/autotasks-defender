import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
var { ethers } = require("ethers");
var axios = require("axios");

import { pcuyAddress } from "../scAddresses";

var pcuyAbi = [
    "function test_mint(address _account, uint256 _amount)",
];

export async function handler(data: any) {
    // validate secret
    var { TELEGRAM_API_KEY } = data.secrets;

    var { chatId, from, wallet } = data.request.body;

    var TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_KEY}`;

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var pcuyContract = new ethers.Contract(pcuyAddress, pcuyAbi, signer);
    var tx = await pcuyContract
        .connect(signer)
        .test_mint(wallet, "5325000000000000000000");
    // var res = await tx.wait(1);

    console.log(
        "======================================================================"
    );
    // console.log("RES", res);

    // responde back to telegram
    axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `¡${from}, lo recibirás en breve!`,
    });

    return true;
}

import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
var { ethers } = require("ethers");
var axios = require("axios");

import { busdAddress } from "../scAddresses";

var busdAbi = ["function mint(address to, uint256 amount) external"];

export async function handler(data: any) {
    // validate secret
    var { TELEGRAM_API_KEY } = data.secrets;

    var { chatId, from, wallet } = data.request.body;

    var TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_KEY}`;

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var busdContract = new ethers.Contract(busdAddress, busdAbi, signer);
    var tx = await busdContract
        .connect(signer)
        .mint(wallet, "500000000000000000000");
    var res = await tx.wait(1);

    console.log(
        "======================================================================"
    );
    console.log("RES", res);

    // responde back to telegram
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `${from}, depositado`,
    });

    return true;
}

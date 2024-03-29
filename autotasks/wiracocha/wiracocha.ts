import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
var { ethers } = require("ethers");
var axios = require("axios");

import wiracochaAbi from "./abi/wiracochaAbi";
import { domain, value, types, IValue } from "./data";

import { wiracochaAddress } from "../scAddresses";

export async function handler(data: any) {
    // validate secret
    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var {
        context,
        guineaPig,
        wallet,
        pachaUuid,
        samiPoints,
        wiracochaUuid,
        signature,
        timeStampFront,
    } = data.request.body;
    var values: IValue = {
        ...value,
        guineaPig,
        wallet,
        pachaUuid,
        samiPoints,
        context,
    };
    var recoveredAddress = ethers.utils.verifyTypedData(
        domain,
        types,
        values,
        signature
    );

    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) return false;
    console.log("wallet", recoveredAddress);
    // validate with Ludik's backend
    /**
     *  data to send:
     *  - timestamp
     *  - wallet address
     *
     *  validate at backend:
     *  - that user has initiated the transaction
     *  - that timestamp of transaction is within 15 seconds
     *
     *  should return:
     *  - bool
     *  - sami points
     */

    // var ip = "http://3.80.7.117:3000";
    var ip = "https://alpha-bk.pachacuy.io";
    var url = `${ip}/wiracocha/reward-participations/${recoveredAddress.toLowerCase()}/wallet/${timeStampFront}/timestamp/${guineaPig}/cuyTokenId`;

    var res = await axios(url);
    var { id: _idFromFront, isOn, samiPoints: _samiPoints } = res.data;

    console.log(_idFromFront, isOn, _samiPoints);

    if (samiPoints != _samiPoints) return false;
    if (!isOn) return false;

    var wiracochaContract = new ethers.Contract(
        wiracochaAddress,
        wiracochaAbi,
        signer
    );
    var tx = await wiracochaContract
        .connect(signer)
        .exchangeSamiToPcuy(wallet, samiPoints, _idFromFront, wiracochaUuid);
    return await tx.wait();
}

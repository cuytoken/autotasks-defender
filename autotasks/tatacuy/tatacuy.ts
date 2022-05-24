import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";

var { ethers } = require("ethers");

import tatacuyAbi from "./abi/tatacuyAbi";
import { domain, value, types } from "./data";

import { tatacuyAddress } from "../scAddresses";

export async function handler(data: RelayerParams) {
    // validate secret

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

    var values = { ...value, guineaPig, wallet, likelihood, context };
    var recoveredAddress = ethers.utils.verifyTypedData(
        domain,
        types,
        values,
        signature
    );

    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) return false;

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
     *
     */

    var payload = {
        wallet: recoveredAddress
    };
    var postDataPachacuy = {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    // var {} = await axios(url, postDataPachacuy);


    // use 'recoveredAddress'
    var _idFromFront = 1000;
    var tatacuyContract = new ethers.Contract(tatacuyAddress, tatacuyAbi, signer);
    var tx = await tatacuyContract
        .connect(signer)
        .tryMyLuckTatacuy(wallet, pachaOwner, pachaUuid, likelihood, _idFromFront);
    return await tx.wait(1);
}

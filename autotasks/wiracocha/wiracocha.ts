import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
var { ethers } = require("ethers");

import wiracochaAbi from "./abi/wiracochaAbi";
import { domain, value, types, IValue } from "./data";

import { wiracochaAddress } from "../scAddresses";

export async function handler(data: RelayerParams) {
    // validate secret

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var {
        context,
        guineaPig,
        wallet,
        pachaUuid,
        samiPoints,
        pachaOwner,
        signature,
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
    var postDataWiracocha = {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    // var {} = await axios(url, postDataWiracocha);

    var wiracochaContract = new ethers.Contract(
        wiracochaAddress,
        wiracochaAbi,
        signer
    );
    var tx = await wiracochaContract
        .connect(signer)
        .exchangeSamiToPcuy(wallet, pachaOwner, pachaUuid, samiPoints);
    return await tx.wait();
}

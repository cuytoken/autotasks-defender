import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelaySigner, DefenderRelayProvider } from "defender-relay-client/lib/ethers";
var { ethers } = require("ethers");

import wiracochaAbi from "./abi/wiracochaAbi";
import { domain, value, types, IValue } from "./data"

import { wiracochaAddress } from "../scAddresses";

export async function handler(data: RelayerParams) {
    // validate secret

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    amountPcuy
    var {
        context,
        guineaPig,
        wallet,
        pachaUuid,
        samiPoints,
        amountPcuy,
        pachaOwner,
        rateSamiPointsToPcuy,
        signature,
    } = data.request.body;
    var values: IValue = { ...value, guineaPig, wallet, pachaUuid, samiPoints, amountPcuy, context }
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
    var wiracochaContract = new ethers.Contract(wiracochaAddress, wiracochaAbi, signer);
    await wiracochaContract.connect(signer).exchangeSamiToPcuy(
        wallet,
        pachaOwner,
        pachaUuid,
        samiPoints,
        amountPcuy,
        rateSamiPointsToPcuy
    )
    return true;
};

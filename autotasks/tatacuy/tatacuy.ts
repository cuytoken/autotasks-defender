import { RelayerParams } from "defender-relay-client/lib/relayer";
import {
    DefenderRelaySigner,
    DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";

var { ethers } = require("ethers");
var axios = require("axios");

import tatacuyAbi from "./abi/tatacuyAbi";
import { domain, value, types } from "./data";

import { tatacuyAddress } from "../scAddresses";

/**
 * @notice Response from Guineapig validation
 * @param id: Id needed from front to finish transaction
 * @param isOn: Indicates whether a guinea pig has initiated a try my luck game at Tatacuy
 * @param probability: Chances of winning at tatacuy (1-100). Must be converted to range 1 to 10 (inclusive)
 */
interface IGuineaPigValidationRes {
    id: number;
    isOn: boolean;
    probability: number;
}

export async function handler(data: any) {
    // validate secret

    var provider = new DefenderRelayProvider(data);
    var signer = new DefenderRelaySigner(data, provider, { speed: "fast" });

    var {
        context,
        guineaPig,
        wallet,
        likelihood,
        tatacuyUuid,
        signature,
        timeStampFront,
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
    var ip = "http://3.80.7.117:3000";
    var url = `${ip}/tatacuy/gift-participations/${recoveredAddress.toLowerCase()}/wallet/${timeStampFront}/timestamp/${guineaPig}/cuyTokenId`;

    var res = await axios(url);
    var {
        id: _idFromFront,
        isOn,
        probability,
    }: IGuineaPigValidationRes = res.data;
    console.log("FRONT", _idFromFront, isOn, probability);
    if (!isOn) return false;

    var tatacuyContract = new ethers.Contract(tatacuyAddress, tatacuyAbi, signer);
    var tx = await tatacuyContract
        .connect(signer)
        .tryMyLuckTatacuy(wallet, likelihood, _idFromFront, tatacuyUuid);
    return await tx.wait(1);
}

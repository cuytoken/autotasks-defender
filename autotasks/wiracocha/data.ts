import { wiracochaAddress } from "../scAddresses";

export var domain = {
    name: "Wiracocha",
    version: "alpha",
    chainId: "97",
    verifyingContract: wiracochaAddress,
};

// The named list of all type definitions
export var types = {
    TatacuyGame: [
        { name: "context", type: "string" },
        { name: "guineaPig", type: "string" },
        { name: "wallet", type: "address" },
        { name: "pachaUuid", type: "string" },
        { name: "samiPoints", type: "string" },
        { name: "amountPcuy", type: "string" },
    ],
};


// The data to sign
export interface IValue {
    context: string;
    guineaPig: string;
    wallet: string;
    pachaUuid: string;
    samiPoints: string;
    amountPcuy: string;
}

export var value: IValue = {
    context: "Exchanging Sami Points to PCUYs",
    guineaPig: "",
    wallet: "",
    pachaUuid: "",
    samiPoints: "",
    amountPcuy: "",
};
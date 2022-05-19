import { tatacuyAddress } from "../scAddresses";

export var domain = {
    name: "Tatacuy Game",
    version: "alpha",
    chainId: "97",
    verifyingContract: tatacuyAddress,
};

// The named list of all type definitions
export var types = {
    TatacuyGame: [
        { name: "context", type: "string" },
        { name: "guineaPig", type: "string" },
        { name: "wallet", type: "address" },
        { name: "likelihood", type: "string" },
    ],
};

// The data to sign
export var value = {
    context: "Winning Sami Points at Tatacuy",
    guineaPig: "",
    wallet: "",
    likelihood: "",
};

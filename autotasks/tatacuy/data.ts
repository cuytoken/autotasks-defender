export var domain = {
    name: "Tatacuy Game",
    version: "alpha",
    chainId: "97",
    verifyingContract: "0x5571780676d7D3C9498ac5Ae89089e3168923D5D",
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

var onlyEvents = [
  {
    type: "event",
    signature: "CloseVaultBeforeYielding(uint256,address[])",
    args: ["3423", [Array]],
    params: { _vaultId: "3423", participants: [Array] },
  },
  {
    type: "event",
    signature: "ParticipantDeposit(uint256,address,uint256,uint256,address[])",
    args: [
      "32432",
      "0x8FE69d5F75c77FbAD7e045ede444b853f8916812",
      "3423",
      "32423",
      [Array],
    ],
    params: {
      _vaultId: "32432",
      _participant: "0x8FE69d5F75c77FbAD7e045ede444b853f8916812",
      _amount: "3423",
      _twaAmount: "32423",
      participants: [Array],
    },
  },
  {
    type: "event",
    signature: "RewardsDistributed(uint256,uint256,address[],uint256[])",
    args: ["254252", "234324", [Array], [Array]],
    params: {
      _vaultId: "254252",
      _yield: "234324",
      _winners: [Array],
      _prizes: [Array],
    },
  },
  {
    type: "event",
    signature:
      "RewardsSinglyDistributed(uint256,uint256,address,address[],uint256)",
    args: [
      "432432",
      "32432",
      "0x8FE69d5F75c77FbAD7e045ede444b853f8916812",
      [Array],
      "1234324",
    ],
    params: {
      _vaultId: "432432",
      _yield: "32432",
      _winner: "0x8FE69d5F75c77FbAD7e045ede444b853f8916812",
      participants: [Array],
      _vaultBalance: "1234324",
    },
  },
  {
    type: "event",
    signature: "StartYielding(uint256,uint256,bool,address[])",
    args: ["32423", "34543", true, [Array]],
    params: {
      _vaultId: "32423",
      _duration: "34543",
      _forceStart: true,
      participants: [Array],
    },
  },
];

const { RAND_API_KEY } = data.secrets;
var date = +new Date();
var hashedDate = date + RAND_API_KEY;
var encodedKey = Buffer.from(hashedDate, "utf-8").toString("base64");

var url = "https://rand-backend-dev.azurewebsites.net/contracts/log-event";
var onlyEvents = payload[0].matchReasons.filter((e) => e.type === "event");
var addressSc = payload[0].matchedAddresses;
var addressSc = "0xD15b1609A190816C0626A3a5192205536AE22Ce3";
var encodedKey = "MTY0OTQ1NDEzNTQ2MTY3NDU5MjEzODY0";
var eventsWithBody = onlyEvents.map((e) => {
  let signature = e.signature;
  var body = {
    name: signature.substring(0, signature.indexOf("(")),
    properties: {
      address: addressSc,
      params: {
        ...e.params,
      },
    },
  };

  return () =>
    axios.post(url, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        "APP-ID": encodedKey,
      },
    });
});

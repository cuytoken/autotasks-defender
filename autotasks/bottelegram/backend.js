require("dotenv").config();
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers");

var axios = require("axios");
var { ethers, utils } = require("ethers");
var pe = utils.parseEther;

var pcuyAddress = "0x26813E464DA80707B7F24bf19e08Bf876F0f3388";
var pcuyAbi = ["function test_mint(address _account, uint256 _amount)"];

const credentials = {
  apiKey: process.env.RLYR_TLGRM_API_KEY,
  apiSecret: process.env.RLYR_TLGRM_SECRET_KEY,
};
const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, {
  speed: "fast",
});

var gasLimit = { gasLimit: 3000000 };

var pcuyC = new ethers.Contract(pcuyAddress, pcuyAbi, signer);

var wallet = "0x8aF2D1227F67F56712C5c561675818f3f232a66a";
var iface = new ethers.utils.Interface([
  "event HasReceivedPcuy(address account, bool hasReceived, uint256 balance)",
]);
var topic = iface.getEventTopic("HasReceivedPcuy");

async function defender() {
  var tx = await pcuyC.connect(signer).test_mint(wallet, pe("5375"), gasLimit);
  var res = await tx.wait();

  var data;
  for (var ev of res.events) {
    if (ev.topics.includes(topic)) {
      data = ev.data;
    }
  }
  console.log("data data", data);
  var [account, hasReceived, balance] = utils.defaultAbiCoder.decode(
    ["address", "bool", "uint256"],
    data
  );

  var maticBalance = utils.parseEther("0.025");
  if (hasReceived) {
  } else {
  }

  var bal = (await provider.getBalance(wallet)).toString();
  if (bal == 0) {
    await signer.sendTransaction({
      to: wallet,
      value: maticBalance,
    });
  }
}

defender()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

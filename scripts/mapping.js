var AUTOTASK_DEV_MIDDLEWARE_ID = "86d6b907-c546-4b0d-95b2-3811bdf4531b";
var AUTOTASK_TATACUY_ID = "3da214c4-a2e1-407b-8f83-7227ff917f0e";
var AUTOTASK_WIRACOCHA_ID = "a6363d6c-5cba-4534-9f6d-e1f49616f6a8";
var AUTOTASK_BOT_TELEGRAM = "020a63ba-29e2-4354-a5d3-6d7904fef760";

var mapping = {
  [AUTOTASK_DEV_MIDDLEWARE_ID]: {
    pathToFolderCode: "./dist/middleware",
    address: "0xD15b1609A190816C0626A3a5192205536AE22Ce3", // proxy address SC
  },
  [AUTOTASK_TATACUY_ID]: {
    pathToFolderCode: "./dist/tatacuy",
  },
  [AUTOTASK_WIRACOCHA_ID]: {
    pathToFolderCode: "./dist/wiracocha",
  },
  [AUTOTASK_BOT_TELEGRAM]: {
    pathToFolderCode: "./dist/bottelegram",
  },
};

function retrieveInfoFromId(id) {
  return mapping[id];
}

module.exports = {
  retrieveInfoFromId,
};

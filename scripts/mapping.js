var AUTOTASK_DEV_MIDDLEWARE_ID = "86d6b907-c546-4b0d-95b2-3811bdf4531b";
var AUTOTASK_TATACUY_ID = "3da214c4-a2e1-407b-8f83-7227ff917f0e";

var mapping = {
  [AUTOTASK_DEV_MIDDLEWARE_ID]: {
    pathToFolderCode: "./dist/middleware",
    address: "0xD15b1609A190816C0626A3a5192205536AE22Ce3", // proxy address SC
  },
  [AUTOTASK_TATACUY_ID]: {
    pathToFolderCode: "./dist/tatacuy",
  },
};

function retrieveInfoFromId(id) {
  return mapping[id];
}

module.exports = {
  retrieveInfoFromId,
};

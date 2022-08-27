// Polygon
// alpha 4 dev
var AUTOTASK_TATACUY_ID_POLYGON_ALPHA_4_DEV =
  "13d87921-0d7b-4f14-b010-403a3214ecd6";
var AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_4_DEV =
  "0da33549-014d-485d-8976-c659a3b5d871";
var AUTOTASK_SEND_PCUY_TOKENS_ALPHA_4_DEV =
  "b69539b6-acb9-4ecc-97de-519232278ed6";

// alpha 4
var AUTOTASK_TATACUY_ID_POLYGON_ALPHA_4 =
  "0fcaca78-3e3a-469d-a5d2-2ab00a10d264";
var AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_4 =
  "be1e1aee-cae2-43c1-8f62-7458f2eedfa9";

var mapping = {
  [AUTOTASK_TATACUY_ID_POLYGON_ALPHA_4_DEV]: {
    pathToFolderCode: "./dist/tatacuy",
  },
  [AUTOTASK_TATACUY_ID_POLYGON_ALPHA_4]: {
    pathToFolderCode: "./dist/tatacuy",
  },
  [AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_4_DEV]: {
    pathToFolderCode: "./dist/wiracocha",
  },
  [AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_4]: {
    pathToFolderCode: "./dist/wiracocha",
  },
  [AUTOTASK_SEND_PCUY_TOKENS_ALPHA_4_DEV]: {
    pathToFolderCode: "./dist/tokens",
  },
};

function retrieveInfoFromId(id) {
  return mapping[id];
}

module.exports = {
  retrieveInfoFromId,
};
